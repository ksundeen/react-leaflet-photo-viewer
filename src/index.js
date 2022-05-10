import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Copied from https://stackoverflow.com/questions/46793310/fetch-local-json-file-from-public-folder-reactjs
fetch('./data/familytrips.json')
.then((r) => r.json())
.then((data) =>{

  fetch("./data/car.png").then((pic) =>
    // .then((pic) => r.json())
    // .then((pic) =>
    {
      ReactDOM.render(
        <React.StrictMode>
          <App tripData={data} carIcon={pic.url} />,
        </React.StrictMode>,
        document.getElementById("root")
      );
    }
  );
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
