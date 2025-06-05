import React from "react";
import ReactDOM from "react-dom/client"; // Updated import path
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import store from './app/store'
import { Provider } from "react-redux";
// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); // Correctly use createRoot
root.render(
      <BrowserRouter>
         <Provider store = {store}>
             <App />
          </Provider>
      </BrowserRouter> 
 );