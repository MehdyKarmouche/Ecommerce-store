import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../components/Loader'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Message from '../components/Message'
import Success from '../components/Success'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import {getOrderDetails} from '../actions/orderActions'

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

const OrderScreen = ({match}) => {
    const classes = useStyles();
    const orderId = match.params.id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails
    
    if(!loading)
        order.itemsPrice = order.orderItems.reduce((acc,item)=> acc + item.price* item.qty, 0)

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch,orderId, match])

    return loading ? <Loader/> : error ? <Message error={error}/> : (
        <main className={classes.layout}>
            <h1>Order</h1>
            <p><strong>Name:</strong>{order.user.name}</p>
            <strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
        <Paper className={classes.paper}>
        <Grid container spacing = {3}>
            <Grid item xs={12} md={8}>
                <Typography variant="h5"><strong>Address</strong></Typography>
                    <p>{order.shippingAddress.address},{order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}, {' '}
                    {order.shippingAddress.country}
                    </p>
                
                <Typography variant="h5"><strong>Payment Method</strong></Typography>
                    <p>{order.paymentMethod}
                    </p>
                    {order.isPaid ? <Success/> : <p>Not paid yet</p>}
                <Typography variant="h5"><strong>Order Items</strong></Typography>
                    <List>
                        {order.orderItems.map((item,index) => (
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
                                <Grid item xs={12} md={6}>${order.itemsPrice}</Grid>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid container spacing ={0}>
                                <Grid item xs={12} md={6}>Shipping price:</Grid>
                                <Grid item xs={12} md={6}>${order.shippingPrice}</Grid>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid container spacing ={0}>
                                <Grid item xs={12} md={6}>Tax price:</Grid>
                                <Grid item xs={12} md={6}>${order.taxPrice}</Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container spacing ={0}>
                                <Grid item xs={12} md={6}>Total price:</Grid>
                                <Grid item xs={12} md={6}>${order.totalPrice}</Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            {error && <Message error={error}/>}
                        </ListItem>
                    </List>
                </Card>
                
            </Grid>
            
        </Grid>
        </Paper>
        </main>
    )
}

export default OrderScreen
