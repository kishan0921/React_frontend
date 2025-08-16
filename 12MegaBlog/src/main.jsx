import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// step 1: chalo provider le akr aate h
import { Provider } from 'react-redux'
// step 2: store bhi laagega
import store from "./store/store.js"
// step 3- App ko wrap kr do provider ke ander 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
     <App />
    </Provider>
  </StrictMode>,
)
