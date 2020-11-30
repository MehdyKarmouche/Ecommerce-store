import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Container from '@material-ui/core/Container';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'


function App() {
  return (
    <Router>
      <Header/>
        <main>
          <Container>
          
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/order/:id' component={OrderScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route path='/' component={HomeScreen} exact/>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
