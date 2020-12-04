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
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import { createMuiTheme, MuiThemeProvider, ThemeProvider,makeStyles } from '@material-ui/core/styles';
import {blueGrey, deepPurple,grey, teal} from '@material-ui/core/colors'



const theme = createMuiTheme({
  palette: {
    primary:{
      main: blueGrey[900]
    },
    secondary:{
      main:deepPurple[600]
    }
  }
})

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor:'#263238',
  }
}));

function App() {
  const classes = useStyles();
  return (
    
    <main>
    <Router>
      <Header/>
        
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
          <Route path='/admin/userlist' component={UserListScreen}/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
          <Route path='/admin/productlist' component={ProductListScreen}/>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
          <Route path='/admin/orderlist' component={OrderListScreen}/>
          <Route path='/' component={HomeScreen} exact/>
          </Container>
        
      <Footer/>
    </Router>
    </main>
    
  );
}

export default App;
