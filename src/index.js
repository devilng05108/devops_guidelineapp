import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css';
// import App from './App';
import WestrumQS from './pages/WestrumQS';
import DoraQS from './pages/DoraQS';
import SVTable from './pages/SVTable';
import SVCulturalTable from './pages/SVCulturalTable';
import SVDoraTable from './pages/SVDoraTable';


const router = createHashRouter([
  {
    path: '/',
    element: <WestrumQS />,
  },
  {
    path: 'dora',
    element: <DoraQS />,
  },
  {
    path: 'table',
    element: <SVTable />,
  },
  {
    path: 'culturaltable',
    element: <SVCulturalTable />,
  },
  {
    path: 'doratable',
    element: <SVDoraTable />,
  },
]);
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <WestrumQS />,
//   },
//   {
//     path: 'dora',
//     element: <DoraQS />,
//   },
//   {
//     path: 'table',
//     element: <SVTable/>,
//   },
//   {
//     path: 'culturaltable',
//     element: <SVCulturalTable/>,
//   },
//   {
//     path: 'doratable',
//     element: <SVDoraTable/>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// ReactDOM.render(
//   <BrowserRouter>
//     <App/>
//   </BrowserRouter>
// ,document.getElementById('root'));


