import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Container from '@material-ui/core/Container';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'


function App() {
  return (
    <Router>
      <Header/>
        <main>
          <Container>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route exact path='/' component={HomeScreen}/>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
