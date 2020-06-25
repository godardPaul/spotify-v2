import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes, faSpinner, faHeart } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import { getCategories } from './services/auth';
import Pagination from './components/Pagination/index';

const spotifyIcon = require('./assets/images/spotifyicon.png');

function App() {
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const itemsPerPage = useRef(10);

  const toggleMenu = () =>{
    setToggle(!toggle);
  };

  const fetchCategories = useCallback(async () => {
    const data = await getCategories();
    setIsLoading(false);

    if (!data || !data.categories) {
      return;
    }

    if (data.categories.items.length > 0) {
      setCategories(data.categories.items);
      setFilteredCategories(data.categories.items);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories()

  }, [fetchCategories]);


  // RECHERCHE
  useEffect(() => {
    setCurrentPage(1);
    const filteredCategories = categories.filter(category => category.name.indexOf(searchTerm) > -1)
    setFilteredCategories(filteredCategories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage.current;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage.current;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginate = (number) =>{
    setCurrentPage(number);
  }

  // LIKE
  const handleLikeItem = (category) => {
    const index = likedItems.indexOf(category);
    const newLikedItems = [...likedItems];
    if (index !== -1) {
      newLikedItems.splice(index, 1);
    } else {
      newLikedItems.push(category);
    }
    setLikedItems(newLikedItems);
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
          <li className="sidebar-item">Catégories likées</li>
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
              >
                <div className="overview-label-category">{category.name}</div>
                <div className="overview-like-category" onClick={() => handleLikeItem(category)}>
                  <FontAwesomeIcon className={`like-icon ${likedItems.includes(category) ? 'active' : ''}`} icon={faHeart} />
                </div>
              </div>
            ))}
        </div>
        )}
        <Pagination
          itemsPerPage={itemsPerPage.current}
          totalItems={filteredCategories.length}
          paginate={handlePaginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}

export default App;
