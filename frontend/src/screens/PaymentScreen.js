import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


const PaymentScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart
    
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const classes = useStyles();

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')

    }
    return (
        <React.Fragment>
          <main className={classes.layout}>
          <Paper className={classes.paper}>
        <CheckoutSteps step1 step2 step3 />
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value="paymentMethod">
                <FormControlLabel checked value="PayPal" control={<Radio />} label="PayPal or credit card"
                 onChange={(e) => savePaymentMethod(e.target.value)} />
                <FormControlLabel disabled value="Stripe" control={<Radio />} label="Stripe" />
            </RadioGroup>
        </FormControl>
        </Grid>
        
      </Grid>
      <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            Continue
          </Button>
      </form>
      </Paper>
      </main>
    </React.Fragment>
    )
}

export default PaymentScreen
