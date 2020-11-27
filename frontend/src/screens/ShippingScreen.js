import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode, country }))
        history.push('/payment')

    }
    return (
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            type="text"
            name="address"
            label="Address "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            autoComplete="shipping address"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            type="text"
            value={city}
            fullWidth
            onChange={(e) => setCity(e.target.value)}
            autoComplete="shipping address-"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="postalCode"
            name="postal code"
            value={postalCode}
            label="Zip / Postal code"
            onChange={(e) => setPostalCode(e.target.value)}
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="country"
            type="text"
            value={country}
            name="country"
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
      </Grid>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Continue
          </Button>
      </form>
    </React.Fragment>
    )
}

export default ShippingScreen
