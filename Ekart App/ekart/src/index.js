import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//importing router
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Product from './Components/Product';
import ProductGrid from './Components/ProductGrid';
import Nav from './Components/Nav';
import Login from './Components/Login';
import RegisterUser from './Components/Register';
import Cart from './Components/Cart';
import UserProvider from './Components/UserContext';
import UpdateUser from './Components/UpdateUser';

const router = (
  
  <Router>
      <UserProvider>
        <Nav/>
        <Route exact path='/' component={ProductGrid} />
        <Route path='/Product/:prodId' component={Product} />
        <Route path='/login' component={Login} />
        <Route path='/RegisterUser' component={RegisterUser}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/updateuser' component={UpdateUser}/>
      </UserProvider>
      
    
    
  </Router>
)

ReactDOM.render(
    router,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
