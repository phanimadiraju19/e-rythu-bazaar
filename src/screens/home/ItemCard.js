import React from "react";
import './ItemCard.css';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from '@material-ui/core/styles';
import 'font-awesome/css/font-awesome.min.css';


/**
 * Functional component for displaying an restaurant card
 * @param props properties passed by parent component to child component
 */

const useStyles = makeStyles({
    card:{
        boxShadow:20,
        width:350,     
    },
    media: {
        width:350,
      height: 150
    },
  });
  
const ItemCard = function (props) {
    const item = props.item;
    const classes = useStyles();


  return (
    <Card className={classes.card} >
    <CardActionArea>
    <CardMedia 
        className={classes.media}
        image={item.photo_URL}
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {item.item_name}
        </Typography>
        <br/>
        <Typography gutterBottom variant="body1" color="textSecondary" component="p">
            Expiry Date : {item.expdate}
        </Typography>
        <br /><br />
        <div id="last-row">
        <Typography gutterBottom variant="body1" color="textSecondary" component="p">
            Qty available(in kg's): {item.quantity}
        </Typography>
            <Typography gutterBottom variant="body1" color="textSecondary" component="p" id="right-avg-price">
            <i className="fa fa-inr" aria-hidden="true"></i> {item.price}  per kg
              </Typography>
        </div>
    </CardContent>
    </CardActionArea>
</Card>
  );
}

export default ItemCard;


