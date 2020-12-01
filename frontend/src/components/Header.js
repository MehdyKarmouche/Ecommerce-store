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
  },
  linkNav: {
    textDecoration:'none',
    color:'black'
  }
}));



const Header = () => {
    const classes = useStyles();
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const logoutHandler = () => {
      closeMenuHandler()
      dispatch(logout())
    }

    const openMenuHandler = (event) => {
      setAnchorEl(event.currentTarget)
    }
    const openMenuHandler2 = (event) => {
      setAnchorEl2(event.currentTarget)
    }

    const closeMenuHandler = () => {
      setAnchorEl(null)
    }

    const closeMenuHandler2 = () => {
      setAnchorEl2(null)
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
                  <Link className={classes.linkNav} to ='/profile'><MenuItem onClick={closeMenuHandler}>Profile</MenuItem></Link>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </>)
              :<Button color="inherit">
              <Link className={classes.link} to ='/login'>
                Sign in
              </Link>
            </Button>
            }
            {userInfo && userInfo.isAdmin && (
              <>
              <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={openMenuHandler2}>
                Admin<ArrowDropDownIcon/>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={closeMenuHandler2}
              >
                <Link className={classes.linkNav} to ='/admin/userlist'><MenuItem onClick={closeMenuHandler2}>Users</MenuItem></Link>
                <Link className={classes.linkNav} to ='/admin/productlist'><MenuItem onClick={closeMenuHandler2}>Products</MenuItem></Link>
                <Link className={classes.linkNav} to ='/admin/orderlist'><MenuItem onClick={closeMenuHandler2}>Orders</MenuItem></Link>
              </Menu>
            </>
            )}
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
