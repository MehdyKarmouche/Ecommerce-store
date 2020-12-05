import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckoutSteps from '../components/CheckoutSteps'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import {createOrder} from '../actions/orderActions'

const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    image: {
        height:'25px',
        width:'30px'
    },
    link: {
        textDecoration:'none',
        color: 'black'
    }
   
  }));

const PlaceOrderScreen = ({history}) => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    cart.itemsPrice = cart.cartItems.reduce((acc,item)=> acc + item.price* item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 20
    cart.taxPrice = Number((0.10 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history,success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }
    return (
        <main className={classes.layout}>
        <Paper className={classes.paper}>
        <CheckoutSteps step1 step2 step3 step4/>
        <Grid container spacing = {3}>
            <Grid item xs={12} md={8}>
                <Typography variant="h5"><strong>Address</strong></Typography>
                    <p>{cart.shippingAddress.address},{cart.shippingAddress.city}{' '}
                    {cart.shippingAddress.postalCode}, {' '}
                    {cart.shippingAddress.country}
                    </p>
                
                <Typography variant="h5"><strong>Payment Method</strong></Typography>
                    <p>{cart.paymentMethod}
                    </p>
                <Typography variant="h5"><strong>Order Items</strong></Typography>
                    <List>
                        {cart.cartItems.map((item,index) => (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={1}>
                                    <img alt={item.name} className={classes.image} src={item.image}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Link className={classes.link} to={`/product/${item.product}`}>{item.name}</Link>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    {item.qty} x ${item.price} = ${item.qty*item.price}
                                </Grid>
                            </Grid>
                        ))}
                    </List>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined">
                    <List>
                        <ListItem>
                            <Typography variant="h5">Order Summary</Typography>
                        </ListItem>
                        <ListItem>
                            <Grid container spacing ={0}>
                                <Grid item xs={12} md={6}>Items price:</Grid>
                                <Grid item xs={12} md={6}>${cart.itemsPrice}</Grid>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid container spacing ={0}>
                                <Grid item xs={12} md={6}>Shipping price:</Grid>
                                <Grid item xs={12} md={6}>${cart.shippingPrice}</Grid>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid container spacing ={0}>
                                <Grid item xs={12} md={6}>Tax price:</Grid>
                                <Grid item xs={12} md={6}>${cart.taxPrice}</Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container spacing ={0}>
                                <Grid item xs={12} md={6}>Total price:</Grid>
                                <Grid item xs={12} md={6}>${cart.totalPrice}</Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            {error && <Message error={error}/>}
                        </ListItem>
                        <ListItem>
                            <Button fullWidth variant="contained"
                             color="secondary"
                             disabled={cart.cartItems.length === 0}
                            onClick={placeOrderHandler}>Order</Button>
                        </ListItem>
                    </List>
                </Card>
                
            </Grid>
            
        </Grid>
        </Paper>
        </main>
    )
}

export default PlaceOrderScreen
