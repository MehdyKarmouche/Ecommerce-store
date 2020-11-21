import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//import products from '../products'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/productActions'

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'50px'
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
}));

const HomeScreen = () => {
    const classes = useStyles();

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    
    useEffect(() => {
      dispatch(listProducts())
    },[dispatch])

    
    
    return (
    <div className={classes.root}>
        <Container>
          {loading ? 
            <Loader/>
          : error ? <h2>{error}</h2>
          :<Grid  container spacing={3}>
            {products.map((product)=> (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                    <Product product={product} />
                </Grid>
            ))} 
          </Grid>
          }
        </Container>
    </div>
    )
}

export default HomeScreen
