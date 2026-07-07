import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import ItemAdd from './component/Item/ItemAdd';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addItem" element={<ItemAdd />} />
      </Routes>

    </div>
  );
}

export default App;
