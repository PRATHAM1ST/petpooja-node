import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin/Admin";
import TableDetails from "./Admin/TableDetails";
import FoodItems from "./Admin/FoodItems";
import Container from "./Container";
import Bill from "./Admin/Bill";
import EditFood from "./Admin/EditFood";
import Cook from "./Cook/Cook";
import Manager from "./Manager/Manager";
import Ordertable from "./Manager/Ordertable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tabledetails/:tableId" element={<TableDetails />} />
        <Route path="/fooditems" element={<FoodItems />} />
        <Route path="/bill/:tableId" element={<Bill />} />
        <Route path="/editfood/:foodId" element={<EditFood />} />
        <Route path="/cook" element={<Cook />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/ordertable/:tableId" element={<Ordertable />} />
      </Routes>
    </div>
  );
}

export default App;