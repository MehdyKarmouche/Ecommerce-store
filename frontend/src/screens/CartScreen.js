import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
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
  image : {
      height:"50px",
      width:"50px"
  },
  button : {
    width:"100%"
  },
  price : {
      marginLeft:"25px"
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
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }


  return (
    <React.Fragment>
    <main className={classes.layout}>
    <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
        <Grid>
          <ListItem className={classes.listItem} key={item.product}>
                <Grid item md={6}>
                    <ListItemText primary={item.name}  />
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
                 <Grid item md={2}>
                    <Typography className={classes.price} variant="body2">${item.price}</Typography>
                </Grid>
                <Grid item md={2}>
                    <Button onClick = {() => removeFromCartHanlder(item.product)}><DeleteIcon color="primary"/></Button>
                </Grid>
          </ListItem>
          </Grid>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total items" />
          <Typography variant="subtitle1" className={classes.total}>
          You have ({cartItems.reduce((acc,item)=> acc + item.qty, 0)}) items
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total price" />
          <Typography variant="subtitle1" className={classes.total}>
            ${cartItems.reduce((acc,item)=> acc + item.qty * item.price, 0).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Button disabled={cartItems.length === 0} onClick={checkoutHandler} variant="contained" color="primary" className={classes.button}>Proceed to checkout</Button>
     </Paper>
     
     </main>
    </React.Fragment>
  );
}
export default CartScreen