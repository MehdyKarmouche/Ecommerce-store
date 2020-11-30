import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import{ composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer} from './reducers/userReducers'
import {userRegisterReducer} from './reducers/userReducers'
import {userDetailsReducer} from './reducers/userReducers'
import {userUpdateProfileReducer} from './reducers/userReducers'
import {orderCreateReducer } from './reducers/orderReducers'
import {orderDetailsReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
})
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart : { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage},
    userLogin : {userInfo:userInfoFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default  store;