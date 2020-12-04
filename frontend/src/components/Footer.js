import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link to='/' color="inherit">
          UrbanExploration.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '50vh',
      alignItems:'center'
    },
    footer: {
      marginTop: 'auto',
    },
  }));


const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <CssBaseline />
        
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </footer>
      </div>
    )
}

export default Footer
