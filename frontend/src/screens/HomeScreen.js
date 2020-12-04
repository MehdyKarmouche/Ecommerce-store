import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//import products from '../products'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paper from '@material-ui/core/Paper';
import {listProducts} from '../actions/productActions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'0px',
  },
  container: {
    marginTop:'50px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  background: {
    width:"100%",
    height:"800px",
    WebkitFilter:"blur(0px)"
  },
  centeredText:{
    fontSize:"50px",
    color:"yellow",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
  
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
        <Paper  elevation={0}>
          <img className={classes.background} src="/images/back2.jpg" alt="background"/>
          <div className={classes.centeredText}>The world's best Products</div>
        </Paper>
        <Container className={classes.container}>
          {loading ? 
            <Loader/>
          : error ? <Message/>
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
