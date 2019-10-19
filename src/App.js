import React from 'react';
import "./app.css";

import GeneralHeader from "./components/generalHeader";
import PersonProduct from  "./components/product-page/personProduct"

function App() {
  return (
    <div className="App">
        <GeneralHeader />
        <PersonProduct />
    </div>
  );
}

export default App;
