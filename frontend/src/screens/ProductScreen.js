import React from 'react'
import {Link} from 'react-router-dom'
import products from '../products'
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

const ProductScreen = ({match}) => {
    const classes = useStyles();
    const product = products.find(p => p._id === match.params.id)

    return (
        <>
            <Button className={classes.button} variant="contained" color="primary">
                <Link className={classes.link} to='/'>
                Back
                </Link>
            </Button>
            <Container>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper elevation={0}  className={classes.paper}>
                        <img className={classes.image} src={product.image} alt={product.name}/>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.title} variant="h5" color="textSecondary" component={'span'}>
                        {product.name}
                    </Typography>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    <Typography variant="h6" color="textSecondary" component={'span'}>Price: {product.price}</Typography>
                    <Typography> </Typography>
                    <Typography variant="p" color="textSecondary" component={'span'}>{product.description}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Card variant="outlined" className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" color="textSecondary" component="h2" >
                            <strong>Price: {product.price}</strong>
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="h2" >
                            <strong>Status: {product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}</strong>
                        </Typography>
                    </CardContent>
                <CardActions className={classes.cartButton}>
                    <Button color="primary" variant="contained" size="medium">ADD TO CART</Button>
                </CardActions>
                </Card>
                </Grid>
        
            </Grid>
        </Container>
        </>
    )
}

export default ProductScreen
