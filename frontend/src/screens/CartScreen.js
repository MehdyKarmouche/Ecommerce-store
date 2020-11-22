import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {addToCart} from '../actions/cartActions'
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root : {
        flexGrow:1
    },
    image : {
       height:"80px"
   }
  }));


const CartScreen = ({match, location, history}) => {
    const classes = useStyles()
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state =>  state.cart)
    const {cartItems} = cart

    useEffect(()=> {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty])

    const removeFromCartHanlder = (id) => {

    }

    const emptyCart = "Your cart is empty"
    return (
        <Container className={classes.root}>
            <Grid  className={classes.root}>
                <h1>Shopping Cart</h1>
                <Grid item md={8}>
                    {cartItems.length === 0 ? <Message error={emptyCart}/> : (
                        <Container>
                            {cartItems.map((item) => (
                                <Grid container spacing={0}>
                                    <Grid item md={2}>
                                        <img className={classes.image} src={item.image} alt={item.name}/>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Grid>
                                    <Grid item md={2}>
                                        ${item.price}
                                    </Grid>
                                    <Grid item md={2}>
                                        <TextField 
                                            id="standard-select-currency"
                                            select
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
                                            helperText="Select quantity">
                                            {
                                                [...Array(item.countInStock).keys()].map((x)=>(
                                                <MenuItem key={x+1} value={x+1}>
                                                    {x+1}
                                                </MenuItem>
                                                ))
                                            }
                                    
                                        </TextField>
                                    </Grid>
                                    <Grid item>
                                            <Button varaint="primary" onClick = {() => removeFromCartHanlder(item.product)}>Remove</Button>
                                    </Grid>
                                </Grid>
                    ))}
                        </Container>
                    )}
                </Grid>
                <Grid item md={4}>
                    <Card variant="outlined">
                        <List>
                            <CardContent>
                                <ListItem>
                                    <Typography>
                                        Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty, 0)})
                                        items
                                    </Typography>
                                </ListItem>
                            </CardContent>
                        </List>
                    </Card>
                </Grid>
                
            </Grid>
        </Container>
    )
}

export default CartScreen
