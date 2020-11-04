import React from 'react'
import products from '../products'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Product from '../components/Product'

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
    return (
    <div className={classes.root}>
        <Container>
        <Grid  container spacing={3}>
            {products.map((product)=> (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
        </Container>
    </div>
    )
}

export default HomeScreen
