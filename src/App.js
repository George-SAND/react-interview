import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

import { Movies } from './features/movies/Movies';

import CategoriesBar from './components/CategoriesBar';
import PaginationBar from './components/PaginationBar';

function App() {
  return (
    <div className="App">
      <header>
        <h2 className='p-3'>Movies</h2>
      </header>
      <div>
        <CategoriesBar />
        <Movies />
        <PaginationBar />
      </div>
    </div>
  );
}

export default App;