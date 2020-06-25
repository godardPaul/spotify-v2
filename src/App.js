import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { getCategories } from './services/auth';

function App() {

  const auth = useCallback(async () => {
    await getCategories();
  }, [])

  useEffect(() => {
    auth()
  }, [auth]);

  return (
    <div className="App">
    </div>
  );
}

export default App;
