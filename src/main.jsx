import React from 'react'
import { createBrowserHistory } from "history";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App history={history}/>
  </React.StrictMode>,
)
