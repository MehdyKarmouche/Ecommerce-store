import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails, updateProduct} from '../actions/productActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      textDecoration:"none"
    }
  }));

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const classes = useStyles();
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate
    
    useEffect(() => {
            if(successUpdate){
              dispatch({type:PRODUCT_UPDATE_RESET})
              history.push('/admin/productlist')
            } else {
              if(!product.name || product._id !==productId){
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setPrice(product.price)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
            }
            

    },[dispatch, history, productId, product, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateProduct({
         _id: productId,
         name,
         price,
         image,
         brand,
         category,
         description,
         countInStock
       }))
    }

  return (
      <>
      <Link className={classes.link} to="/admin/productlist"><Button variant="contained" color="secondary">Back</Button></Link>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ShoppingBasketIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message error={errorUpdate}/>}
        {loading ? <Loader/> : error ? <Message error={error}/> : (
            <form onSubmit={submitHandler} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={name}
              label="name"
              id="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={price}
              label="price"
              id="price"
              type="number"
              autoFocus
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={image}
              label="image"
              type="text"
              id="email"
              autoFocus
              onChange={(e) => setImage(e.target.value)}
            />
            {uploading && <Loader/>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={brand}
              label="brand"
              id="brand"
              type="text"
              autoFocus
              onChange={(e) => setBrand(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={countInStock}
              label="countInStock"
              id="countInStock"
              type="number"
              autoFocus
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={category}
              label="category"
              id="category"
              type="text"
              autoFocus
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={description}
              label="description"
              id="description"
              type="text"
              autoFocus
              onChange={(e) => setDescription (e.target.value)}
            />
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Edit
            </Button>
          </form>
        )}
      </div>
    </Container>
    </>
  );
}

export default ProductEditScreen
