import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

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
    const logoutHandler = () => {
      console.log("implement me !")
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
                <Button color="inherit">Profile</Button>
                <Button onClick={logoutHandler} color="inherit">Logout</Button>
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
