import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import Map from './Map';
import GraphPage from './GraphPage';

const routing = (
  <BrowserRouter>
    <Routes>
      {/* <Route exact path='/' element={App} /> */}
      <Route path='/' element={<App />} exact />
      <Route path='/mapPage' element={<Map />} exact />
      <Route path='/graphPage' element={<GraphPage />} exact />
      {/* <Route path='/graphPage' element={GraphPage} />
      <Route path='/mapPage' element={Map} /> */}
    </Routes>
    {/* <Switch> */}

    {/* </Switch> */}
  </BrowserRouter>
);

ReactDOM.render(
  routing,
  // <React.StrictMode>
  // <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
