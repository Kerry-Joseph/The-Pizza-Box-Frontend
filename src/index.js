import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

function setCookie(name, value) {
  document.cookie = name + "=" + value + ";path=/" 
}

const getCookie = (cookieName) => {
  let nameWithEquals = cookieName + "="
  let cookieArr = document.cookie.split(';') //splits each cookies into an array item
  let cookieValues = cookieArr.map(cookie => {
      if (cookie.charAt(0) == ' ') { //removes space at he start of each cookie
          cookie = cookie.substring(1)
      }
      if (cookie.indexOf(nameWithEquals) == 0) {
          return cookie.substring(nameWithEquals.length, cookie.length) //returns cookie value if name is in the argument
      } else {
          return ""    // returns empty string if cookie name is not in argument
      }
  })
  let filteredCookieArr = cookieValues.filter(value => value !== '') 

  return(filteredCookieArr.toString())
}

export const SetCookieContext = React.createContext(setCookie)
export const GetCookieContext = React.createContext(getCookie)
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SetCookieContext.Provider value={ setCookie }>
    <GetCookieContext.Provider value={ getCookie }>
      <Router>
        <App />
      </Router>
    </GetCookieContext.Provider>
    </SetCookieContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
