import React, { useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Rating from '../components/Rating'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Loader from '../components/Loader'
import Message from '../components/Message'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles(() => ({
    
    link: {
      color:'white',
      textDecoration:'none'
    },
    button: {
        marginTop:'20px',
        marginBottom:'20px',
    },
    image: {
        maxWidth:'100%'
    },
    title: {
        fontWeight:'bold'
    },
    cartButton: {
        justifyContent:'center'
    }
  }));

const ProductScreen = ({match, history}) => {
    
    const classes = useStyles();
    const [qty,setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    
      useEffect(() => {
        dispatch(listProductDetails(match.params.id))
      },[dispatch, match])

      const handleChangeQuantity = (event) => {
        setQty(event.target.value);
      };
      const addToCartHanlder = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
      }

    return (
        <>
            

            <Container>
            <Link className={classes.link} to='/'>
                <Button className={classes.button} variant="contained" color="secondary">
                    Back
                </Button>
            </Link>
            {loading ? <Loader />
            : error ? <Message error={error}/>
            :(
                <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper elevation={0}  className={classes.paper}>
                        <img className={classes.image} src={product.image} alt={product.name}/>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <List>
                        <ListItem>
                            <Typography className={classes.title} variant="h5" color="textSecondary" component={'span'}>
                                {product.name}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h6" color="textSecondary" component={'span'}>
                                Price: {product.price}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography  color="textSecondary" component={'span'}>
                                {product.description}
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={3}>
                <Card variant="outlined" className={classes.root}>
                <List>
                    <CardContent>
                    <ListItem>
                        <Typography variant="h5" color="textSecondary"  component="h2" >
                            <strong>Price:</strong> {product.price}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h5" color="textSecondary" component="h2" >
                            <strong>Status:</strong> {product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}
                        </Typography>
                    </ListItem>
                    <ListItem>
                    {product.countInStock > 0 && (
                        
                            <TextField 
                            id="standard-select-currency"
                            select
                            value={qty}
                            onChange={handleChangeQuantity}
                            helperText="Select quantity">
                                {
                                    [...Array(product.countInStock).keys()].map((x)=>(
                                        <MenuItem key={x+1} value={x+1}>
                                            {x+1}
                                        </MenuItem>
                                    ))
                                }
                                
                            </TextField>
                            )}
                        </ListItem>
                    </CardContent>
                <CardActions className={classes.cartButton}>
                    <Button onClick={addToCartHanlder} color="secondary" variant="contained" size="medium" disabled={product.countInStock===0}>ADD TO CART</Button>
                </CardActions>
                </List>
                </Card>
                </Grid>
        
            </Grid>
            )
            }
            
        </Container>
        </>
    )
}

export default ProductScreen
