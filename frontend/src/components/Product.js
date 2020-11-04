import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from './Rating'


const useStyles = makeStyles((theme)=> ({
    root: {
        maxWidth: 350
    },
    media: {
      height: 140,
    },
  }));

const Product = ({product}) => {
    const classes = useStyles();
    return (

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              <Rating
              value ={product.rating}
              text={`${product.numReviews} reviews`}/>
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    )
}


export default Product
