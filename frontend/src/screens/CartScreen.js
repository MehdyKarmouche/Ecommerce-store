import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {addToCart} from '../actions/cartActions'


const CartScreen = ({match, location, history}) => {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    useEffect(()=> {})
    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default CartScreen
