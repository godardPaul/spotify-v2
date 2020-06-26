import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes, faSpinner, faHeart } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import { getCategories } from './services/api';
import Pagination from './components/Pagination/index';
import { setLikesInStorage, isLiked, getLikesFromStorage } from './services/storage';

const spotifyIcon = require('./assets/images/iconfinder_spotify_132840.png');

function App() {
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // SEARCH BAR
  const [searchTerm, setSearchTerm] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // LIKES
  const [likedItems, setLikedItems] = useState(getLikesFromStorage() || []);

  // PAGINATION
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleMenu = () =>{
    setToggle(!toggle);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();

      if (!data || !data.categories) {
        return;
      }

      if (data.categories.items.length > 0) {
        setCategories(data.categories.items);
        setFilteredCategories(data.categories.items);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories()

  }, [fetchCategories]);


  // RECHERCHE
  useEffect(() => {
    setCurrentPage(1);
    const filteredCategories = categories.filter(category => category.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
    setFilteredCategories(filteredCategories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginate = (number) =>{
    setCurrentPage(number);
  }

  // LIKE
  const handleLikeItem = (category) => {
    const newLikedItems = [...likedItems];
    const currentCategory = newLikedItems.filter(like => like.id === category.id);
    if (currentCategory.length > 0) {
      const index = newLikedItems.indexOf(currentCategory[0]);
      if (index !== -1) {
        newLikedItems.splice(index, 1);
      }
    } else {
      newLikedItems.push(category);
    }
    setLikedItems(newLikedItems);
    setLikesInStorage(newLikedItems);
  }

  // SIZE
  const handleChangeSize = (e) => {
    const value = e.currentTarget.value;
    setItemPerPage(parseInt(value));
  }

  // Liked items view
  const handleShowCategories = () => {
    setFilteredCategories(categories);
    setCurrentPage(1);
  }

  const handleShowLikedItem = () => {
    const likedInStorage = getLikesFromStorage();
    setFilteredCategories(likedInStorage);
    setCurrentPage(1);
  }

  return (
    <div className="grid-container">
      <div className="menu-icon">
        <FontAwesomeIcon icon={faBars} onClick={()=> toggleMenu()} />
      </div>
      <header className="header">
        <img src={spotifyIcon} alt="spotify-icon" className="header-icon"/>
        <div className="header-text">Spotify v2</div>
      </header>
      <aside className={`sidebar ${toggle ? 'active' : ''}`}>
        <div className="sidebar-close">
          <FontAwesomeIcon icon={faTimes} onClick={()=> toggleMenu()} />
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-item" onClick={handleShowCategories}>Toutes les catégories</li>
          <hr className="separator-center-50" />
          <li className="sidebar-item" onClick={handleShowLikedItem}>Catégories likées</li>
        </ul>
      </aside>
      <main>
        <div className="search-bar-container">
          <input
            type="text"
            id="search-bar"
            placeholder="Search . . ."
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
          <select className="size-select" name="size" id="size-select" onChange={handleChangeSize}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
          </select>

        </div>
        {isLoading && <FontAwesomeIcon className="spinner" icon={faSpinner} />}
        {!isLoading && (
          <div className="overview-container">
            {currentItems.length === 0 && (
              <p>Pas de catégories</p>
            )}
            {currentItems && currentItems.map((category) => (
              <div
                key={category.id}
                className="overview-card"
                style={{ backgroundImage: `url(${category.icons[0].url})` }}
                onClick={() => handleLikeItem(category)}
              >
                <div className="overview-label-category">{category.name}</div>
                <div className="overview-like-category">
                  <FontAwesomeIcon className={`like-icon ${isLiked(category) ? 'active' : ''}`} icon={faHeart} />
                </div>
              </div>
            ))}
        </div>
        )}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredCategories.length}
          paginate={handlePaginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}

export default App;
