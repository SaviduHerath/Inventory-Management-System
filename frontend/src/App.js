import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import ItemAdd from './component/Item/ItemAdd';
import DisplayItem from './component/DisplayItem/DisplayItem';
import UpdateItem from './component/UpdateItem/UpdateItem';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addItem" element={<ItemAdd />} />
        <Route path="/displayItem" element={<DisplayItem />} />
        <Route path="/updateItem/:id" element={<UpdateItem />} />
      </Routes>

    </div>
  );
}

export default App;
