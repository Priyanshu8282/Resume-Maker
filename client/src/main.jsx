import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Component/Auth/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
