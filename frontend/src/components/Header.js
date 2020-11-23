import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {logout} from '../actions/userActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color:'white',
    textDecoration:'none'
  }
}));



const Header = () => {
    const classes = useStyles();
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const logoutHandler = () => {
      closeMenuHandler()
      dispatch(logout())
    }

    const openMenuHandler = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const closeMenuHandler = () => {
      setAnchorEl(null)
    }
    
    return (
        <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.link} to ='/'>
                    E-Commerce
                </Link>
              </Typography>
              {userInfo ? (<>
                <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={openMenuHandler}>
                  {userInfo.name}<ArrowDropDownIcon/>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={closeMenuHandler}
                >
                  <MenuItem onClick={closeMenuHandler}>Profile</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </>)
              :<Button color="inherit">
              <Link className={classes.link} to ='/login'>
                Sign in
              </Link>
            </Button>
            }
              <Button color="inherit">
                <Link className={classes.link} to ='/cart'>
                  Cart
                </Link>
              </Button>
              </Toolbar>
          </AppBar>
        </div>
    )
}

export default Header
