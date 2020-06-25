import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import './App.scss';

function App() {
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () =>{
    setToggle(!toggle);
  }
  
  const auth = useCallback(async () => {
    await getCategories();
  }, [])

  useEffect(() => {
    auth()
  }, [auth]);
  
  return (
    <div className="grid-container">
      <div className="menu-icon">
        <FontAwesomeIcon icon={faBars} onClick={()=>toggleMenu()}/>
      </div>
      <header className="header">
        <div className="header-icon">Icon</div>
        <div className="header-text">Spotify v2</div>
      </header>
      <aside className={`sidebar ${toggle ? 'active' : ''}`}>
        <div className="sidebar-close">
          <FontAwesomeIcon icon={faTimes} onClick={()=>toggleMenu()}/>
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
        <div className="overview-container">
          <div className="overview-card">
            <div className="overview-icon">Overview</div>
            <div className="overview-text">Card</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
