import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUser} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'

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
    link:{
      textDecoration:"none"
    }
  }));

const UserEditScreen = ({match, history}) => {
    const userId = match.params.id
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate, success:successUpdate} = userUpdate

    
    useEffect(() => {
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }
        else {
            if(!user.name || user._id !==userId){
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    },[dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:userId, name, email, isAdmin}))
    }

  return (
      <>
      <Link className={classes.link} to="/admin/userlist"><Button variant="contained" color="secondary">Back</Button></Link>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit User
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
              value={email}
              label="Email Address"
              autoComplete="email"
              id="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox onChange={(e)=> setIsAdmin(e.target.checked)} checked={isAdmin} type="checkbox" color="secondary" />}
              label="isAdmin"

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

export default UserEditScreen
