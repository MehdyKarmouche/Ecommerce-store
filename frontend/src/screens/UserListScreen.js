import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {listUsers, deleteUser} from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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

const UserListScreen = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete


    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
        else {
            dispatch(listUsers())
            history.push('/')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
    }
    return (
        <>
         
         {loading ? <Loader/> : error ? <Message error={error}/> : !userInfo ? <Message error={"You have to be an Admin to access this resource"}/> : (
             <TableContainer className={classes.container}>
                 <h1>Users</h1>
                 <TableHead>
                     <TableRow>
                         <TableCell>ID</TableCell>
                         <TableCell>NAME</TableCell>
                         <TableCell>EMAIL</TableCell>
                         <TableCell>Admin</TableCell>
                         <TableCell>EDIT</TableCell>
                         <TableCell>DELETE</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {users.map(user => (
                         <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                            <TableCell>{user.isAdmin ? (<p>Admin</p>) : (<p>Not admin</p>)}</TableCell>
                            <TableCell>
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <Button  ><EditIcon color="secondary"/></Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained"  onClick={()=>deleteHandler(user._id)} variant="danger"><DeleteIcon color="secondary"/></Button>
                            </TableCell>
                         </TableRow>
                     ))}
                 </TableBody>
             </TableContainer>
         ) }   
        </>
    )
}

export default UserListScreen
