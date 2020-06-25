import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import './App.scss';

// let toto = [{
//   nom: "GODARD",
//   prenom: "Paul"
// },{
//   nom: "GILLE",
//   prenom: "Florian"
// },{
//   nom: "MOLLET",
//   prenom: "Simon"
// }];
/* {toto.map((currentObject)=>(
          <div>
            {currentObject.nom}
          </div>
        ))} */

function App() {
  return (
    <div className="grid-container">
      <div class="menu-icon">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <header class="header">
        <div class="header-icon">Icon</div>
        <div class="header-text">Spotify v2</div>
      </header>
      <aside class="sidebar">
      <div class="sidebar-close">
      <FontAwesomeIcon icon={faBars} onclick="toggleMenu()"/>
      </div>
      <ul class="sidebar-list">
        <li class="sidebar-item">Item 1</li>
        <li class="sidebar-item">Item 2</li>
        <li class="sidebar-item">Item 3</li>
      </ul>
    </aside>
      <main>
        <div className="search-bar-container">
          <input type="text" id="search-bar" placeholder="Search . . ."></input>
        </div>
        <div className="overview-container">
          <div class="overview-card">
            <div class="overview-icon">Overview</div>
            <div class="overview-text">Card</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
