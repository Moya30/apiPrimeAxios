import React from 'react'
import ReactDOM from 'react-dom/client'
import {App}  from './App';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";     
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <App />
  </React.StrictMode>
)
