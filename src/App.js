import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import { getCategories } from './services/auth';
import Pagination from './components/Pagination/index';

const spotifyIcon = require('./assets/images/spotifyicon.png');

function App() {
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories()

  }, [fetchCategories]);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItem = categories.slice(indexOfFirstItem, indexOfLastItem);

const handlePaginate = (number) =>{
  setCurrentPage(number);
}

  return (
    <div className="grid-container">
      <div className="menu-icon">
        <FontAwesomeIcon icon={faBars} onClick={()=>toggleMenu()} />
      </div>
      <header className="header">
        <img src={spotifyIcon} alt="spotify-icon" className="header-icon"/>
        <div className="header-text">Spotify v2</div>
      </header>
      <aside className={`sidebar ${toggle ? 'active' : ''}`}>
        <div className="sidebar-close">
          <FontAwesomeIcon icon={faTimes} onClick={()=>toggleMenu()} />
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-item">Titres lickés</li>
          <li className="sidebar-item">Récemment écoutés</li>
          <hr></hr>
          <li className="sidebar-item">Catégories</li>
        </ul>
      </aside>
      <main>
        <div className="search-bar-container">
          <input type="text" id="search-bar" placeholder="Search . . ."></input>
        </div>
        {isLoading && <FontAwesomeIcon className="spinner" icon={faSpinner} />}
        {!isLoading && (
          <div className="overview-container">
            {categories.length === 0 && (
              <p>Pas de catégories</p>
            )}
            {console.log(categories)}
            {currentItem && currentItem.map((category) => (
              <div key={category.id} className="overview-card" style={{ backgroundImage: `url(${category.icons[0].url})` }}>
                <div className="overview-label-category">{category.name}</div>
              </div>
            ))}
        </div>
        )}
        <Pagination itemsPerPage={itemsPerPage} totalItems={categories.length} paginate={handlePaginate} />
      </main>
    </div>
  );
}

export default App;
