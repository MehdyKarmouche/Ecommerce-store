import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    link: {
      textDecoration:"none",
      color:"black"
    }
    
  }));

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    const classes = useStyles();
    return (
      <Stepper className={classes.stepper}>
        <Step>
          {step1 ? (
            
              <StepLabel active={true}><Link to="/login" className={classes.link}>Sign in</Link></StepLabel>
            
          ): (
            <StepLabel disabled>Sign in</StepLabel>
          )}
        </Step> 

        <Step>
          {step2 ? (
            
              <StepLabel active={true}><Link to="/shipping" className={classes.link}>Shipping</Link></StepLabel>
            
          ): (
            <StepLabel disabled>Shipping</StepLabel>
          )}
        </Step> 

        <Step>
          {step3 ? (
            
              <StepLabel active={true}><Link to="/payment" className={classes.link}>Payment</Link></StepLabel>
            
          ): (
            <StepLabel disabled>Payment</StepLabel>
          )}
        </Step> 

        <Step>
          {step4 ? (
            
              <StepLabel active={true}><Link to="/placeorder" className={classes.link}>Place Order</Link></StepLabel>
            
          ): (
            <StepLabel disabled>Place Order</StepLabel>
          )}
        </Step>  
      </Stepper>
    )
}

export default CheckoutSteps
