import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {listProducts, deleteProduct} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    
  }));

const ProductListScreen = ({history, match}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin



    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }
        else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        //Delete product dispqatch
        dispatch(deleteProduct(id))
    }

    const createProductHandler = () => {
        //
    }
    return (
        <>
         <h1>Users</h1>
         <Button onClick={createProductHandler} variant="contained" color="secondary">Add Product </Button>
         {loadingDelete && <Loader/>}
         {errorDelete && <Message error={errorDelete}/>}
         {loading ? <Loader/> : error ? <Message error={error}/> : !userInfo ? <Message error={"You have to be an Admin to access this resource"}/> : (
             <TableContainer className={classes.container}>
                 <TableHead>
                     <TableRow>
                         <TableCell>ID</TableCell>
                         <TableCell>NAME</TableCell>
                         <TableCell>PRICE</TableCell>
                         <TableCell>CATEGORY</TableCell>
                         <TableCell>BRAND</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {products.map(product => (
                         <TableRow key={product._id}>
                            <TableCell>{product._id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="contained" color="secondary">Edit</Button>
                                </Link>
                                <Button onClick={()=>deleteHandler(product._id)} variant="danger">Del</Button>
                            </TableCell>
                         </TableRow>
                     ))}
                 </TableBody>
             </TableContainer>
         ) }   
        </>
    )
}

export default ProductListScreen
