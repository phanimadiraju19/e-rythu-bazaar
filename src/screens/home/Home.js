import React, {Component} from "react";
import Header from "../../common/Header";
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ItemCard from './ItemCard';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import imageData from "../../common/ImageData";
import Button from "@material-ui/core/Button";
import  "./Home.css";

// inline styles for Material-UI components
const styles = theme => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
      
    },
      grow: {
          flexGrow: 1,
      },
      input: {
          display: 'none',
      },
      gridListMain: {
          transform: 'translateZ(0)',
          cursor: 'pointer',
          margin: "15px !important"
      },
  });

class Home extends Component {


    constructor() {
        super();
    
        this.uploadNewImage = this.uploadNewImage.bind(this);
        
      }
    
      state = {
        
        imageData: imageData, // array containing all the images posted by the currently logged-in user
        //imageData:[] array showing newly uploaded items..no data shown from previous uploads..or api call..
        
      };

    /**
   * Function to upload an image to the list of existing images
   * @param imagePost image post containing all the information about the image to be uploaded
   * @memberof Home
   */
  uploadNewImage = imagePost => {
    let imageData = [...this.state.imageData];
    imageData.unshift(imagePost);
    this.setState({
      imageData: imageData
    });
  };

  placeOrder =()=>{
    this.props.history.push({
      pathname: "/order"
    });
  }
    render(){

        const { classes } = this.props;
        return(
            <div>
            <Header 
            showLogo={true}
            history={this.props.history}
            showLoginModal={true}
            enableMyAccount={true}
            showUpload={true}
            uploadNewImage={this.uploadNewImage}
            />
            <div className="items-main-container">
            <GridList cellHeight ={400} className={classes.gridListMain} cols={4}>
              {this.state.imageData.map(item => (
                <GridListTile key={"item" + item.id}  >
                  <Grid container className={classes.root} >
                    <Grid item>
                      <ItemCard
                        item={item}
                      />
                    </Grid>
                  </Grid>
                </GridListTile>
              ))};
            </GridList>
          </div>
          <footer><Button variant="contained" color="primary" id="place-order-btn" onClick={this.placeOrder}>Click to place order </Button></footer>
          
            </div>
            
        );
    }
}


Home.propTypes = {
    classes: PropTypes.object.isRequired
  };
export default withStyles(styles)(Home);