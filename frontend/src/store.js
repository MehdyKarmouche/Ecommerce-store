import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import{ composeWithDevtools} from 'redux-devtools-extension'

const reducer = combineReducers({})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevtools(applyMiddleware(...middleware)))


export default  store;