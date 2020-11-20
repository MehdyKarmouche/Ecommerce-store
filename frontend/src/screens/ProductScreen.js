import React, {useState, useEffect} from 'react'
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';



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
    const [product,setProduct] = useState({})
    const classes = useStyles();
    
    async function fetchProduct(){
        const res = await fetch(`http://localhost:5000/api/products/${match.params.id}`)
        res.json().then(res => setProduct(res))
      }
      useEffect(() => {
        fetchProduct()
      },[])

    return (
        <>
            <Link className={classes.link} to='/'>
                <Button className={classes.button} variant="contained" color="primary">
                    Back
                </Button>
            </Link>
            <Container>
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
                    </CardContent>
                <CardActions className={classes.cartButton}>
                    <Button color="primary" variant="contained" size="medium" disabled={product.countInStock===0}>ADD TO CART</Button>
                </CardActions>
                </List>
                </Card>
                </Grid>
        
            </Grid>
        </Container>
        </>
    )
}

export default ProductScreen
