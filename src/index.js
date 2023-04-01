import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import App from './App';
import AllProducts from './pages/AllProducts';
import Home from './pages/Home';
import ProductsDetail from './pages/ProductDetail';
import NewProduct from './pages/NewProduct';
import MyCart from './pages/MyCart';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound/>,
    children: [
      {index: true, path: '/', element: <Home/>},
      {path: '/products', element: <AllProducts/>},
      {path: '/products/new', element: <NewProduct/>},
      {path: '/products/:id', element: <ProductsDetail/>},
      {path: '/carts', element: <MyCart/>}
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

