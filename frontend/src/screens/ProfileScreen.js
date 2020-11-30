import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from '../components/Loader'
import Success from '../components/Success'
import Message from '../components/Message'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration:'none',
        color:'white'
    }
  }));

const ProfileScreen = ({location, history}) => {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders,error:errorOrders, orders} = orderListMy

    
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords not matching')
        } else {
            dispatch(updateUserProfile({id:user._id, name, email, password}))
        }
        
        
    }
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user.name ||success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                
                setName(user.name)
                setEmail(user.email)
            }
        }

    },[dispatch,history,userInfo,user, success])

  return (
    <Grid container spacing={3}>
        <Grid item md={3}>
            <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Your Profile
            </Typography>
            
            {error && <Message error={error}/>}
            {success && <Success success={"Profile Updated"}/>}
            {loading && <Loader/>}
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
                value={email}
                label="Email Address"
                autoComplete="email"
                id="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={confirmPassword}
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Update Profile
            </Button>
            </form>
        </div>
        </Container>
        </Grid>
        <Grid className={classes.paper} item md={9}>
            <Avatar className={classes.avatar}>
            <ShoppingBasketIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Your Orders
            </Typography>
            {loadingOrders ? <Loader/> : errorOrders ? <Message error={errorOrders}/> : (
                <TableContainer component={Paper} >
                    {console.log(orders)}
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >Date</TableCell>
                            <TableCell >Total</TableCell>
                            <TableCell >Paid</TableCell>
                            <TableCell >Delivered</TableCell>
                            <TableCell >Details</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell >{order.createdAt}</TableCell>
                                    <TableCell >{order.totalPrice}</TableCell>
                                    <TableCell >{order.isPaid ? (order.paymentResult.update_time.substring(0,10)) : <p>Not paid</p>} </TableCell>
                                    <TableCell >{order.isDelivered ? order.deliveredAt.substring(0,10) : <p>Not Delivered</p>} </TableCell>
                                    <TableCell><Link className={classes.link} to={`/order/${order._id}`}><Button variant="contained" color="primary">Details</Button></Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                </TableContainer>
            )}
        </Grid>
    </Grid>
  );
}

export default ProfileScreen
