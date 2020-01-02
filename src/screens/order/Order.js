import React,{Component} from "react";
import Header from "../../common/Header";
import "./Order.css";
import categoryData from "../../common/CategoryData";
import Divider from '@material-ui/core/Divider';
import 'font-awesome/css/font-awesome.min.css';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
import Remove from '@material-ui/icons/Remove';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class Order extends Component{

    constructor(){
        super(); 
        this.state ={
            open: false,
            vertical: 'top',
            horizontal: 'center',
            restaurantData: '',
            address: '',
            categories: [],
            cartItems: [],
            totalCartItemsValue: 0.0,
            totalCartItems: 0,
            
        }
    }

    addMenuItemClickHandler = (item) => {
        let newCartItems = this.state.cartItems;
        let itemAlreadyAdded = false;
        if (newCartItems != null) {
            for (var i = 0; i < newCartItems.length; i++) {
                if (newCartItems[i].id === item.id) {
                    item.quantity = item.quantity + 1;
                    item.totalPrice = item.quantity * item.price;
                    itemAlreadyAdded = true;
                    break;
                }
            }
        }
        if (!itemAlreadyAdded) {
            item.quantity = 1;
            item.totalPrice = item.quantity * item.price;
            newCartItems.push(item);
            
        }
        this.setState({ cartItems: newCartItems, open: true});
         if(item.quantity > 1){
             this.setState({cartNotificationMessage:'Item quantity increased by 1!'})
         }else{
             this.setState({ cartNotificationMessage: 'Item added to cart!'})
         }
        this.updateTotalCartItemsValue(true, item.price, item.quantity);
        
    };
    
    updateTotalCartItemsValue(isAdded, price, quantity) {
        let newTotalCartItemsValue = this.state.totalCartItemsValue;
        if (isAdded) {
            newTotalCartItemsValue = newTotalCartItemsValue + price;
            
        } else {
            newTotalCartItemsValue = newTotalCartItemsValue - price;
            
        }
        
        if(isAdded && quantity >= 1){
            this.setState({totalCartItems: this.state.totalCartItems + 1});
        }else{
            this.setState({totalCartItems: this.state.totalCartItems - 1});
        }
       this.setState({ totalCartItemsValue: newTotalCartItemsValue });
    }
    
    
    addCartItemClickHandler = (item) => {
        item.quantity = item.quantity + 1;
        item.totalPrice = item.quantity * item.price;
        this.setState({ open: true, cartNotificationMessage: 'Item quantity increased by 1!' });
        this.updateTotalCartItemsValue(true, item.price, item.quantity);
        
    };
    
    removeCartItemClickHandler = (item) => {
        let removeCartItems = this.state.cartItems;
        for (var i = 0; i < removeCartItems.length; i++) {
            if (removeCartItems[i].id === item.id) {
                if (item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                    item.totalPrice = item.quantity * item.price;
                } else {
                    removeCartItems.splice(i, 1);
                    item.totalPrice = 0;
                }
            }
        }
        this.setState({ cartItems: removeCartItems, open: true, cartNotificationMessage: 'Item quantity decreased by 1!' });
        this.updateTotalCartItemsValue(false, item.price, item.quantity);
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    
    onClickCheckoutButton = state => () => {
        if(this.state.totalCartItems === 0 ){
            this.setState({open: true, cartNotificationMessage: "Please add an item to your cart!"})
            return;
        }
        if (sessionStorage.getItem("access-token") === null) {
            this.setState({open: true, cartNotificationMessage:  "Please login first!"})
            return;
        }
    
        this.props.history.push({
            pathname: "/checkout",
            cartItems: this.state.cartItems,
            totalCartItemsValue: this.state.totalCartItemsValue
        })
    };

    render(){
        return(
            <div>
                <div>
            <Header 
            showLogo={true}
            history={this.props.history}
            showLoginModal={true}
            enableMyAccount={true}
            />
            </div>
            <div className="order-menu-items">
                    <div className="menu-items">
                        {categoryData.map(category =>(
                            <div key={"categories"+ category.id}>
                              <h3 className="CategoryName">{category.category_name}</h3>
                              <Divider />
                             <br />
                             {category.item_list.map(item => (
                                 <div className="Category-items" key={"item"+item.id}>
                                    <div  className="item">
         
                                    <span>&nbsp;&nbsp;&nbsp; {item.item_name}</span> 
                                    </div>  
                                    <div className="item-price">
                                    <i className="fa fa-inr" aria-hidden="true"></i>
                                      <span> {item.price} </span>
                                    </div>
                                    <div className="item-add">
                                      <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => this.addMenuItemClickHandler(item)}>
                                        <Add/>
                                        </IconButton>
                                    </div> 
                                 </div>
                             ))}
                            </div>
                        ))}
                    </div>
                    <div className="my-cart">
                       <Card className="card">
                          <CardContent>
                            <div>
                             <Typography gutterBottom variant="h6" component="h4">
                                 <Badge badgeContent={this.state.totalCartItems} color="primary" className="badge" >
                                   <ShoppingCart/>
                                 </Badge>
                                 <span style={{marginLeft:'20px'}}>My Cart</span>
                             </Typography>
                            </div>
                            {this.state.cartItems.map(item => (
                                <div className="Category-items" key={"item"+ item.id}>
                                    <div  className="item added-item">
                                     
                                     
                                    <span>&nbsp;&nbsp;&nbsp; {item.item_name}</span> 
                                    </div>
                                    <div className="added-item">
                                   <span>
                                        <IconButton  
                                               key="close"
                                               aria-label="Close"
                                               color="inherit" 
                                               onClick={() => this.removeCartItemClickHandler(item)}>
                                             <Remove/>
                                        </IconButton>
                                     </span>
                                    <span>{item.quantity}</span>
                                    <span >
                                       <IconButton 
                                              key="close"
                                              aria-label="close"
                                              color="inherit"
                                              onClick={() => this.addCartItemClickHandler(item)}>
                                                  <Add/>
                                              </IconButton>
                                    </span> </div>
                                    <span> 
                                    <i className="fa fa-inr" aria-hidden="true"></i> {(item.totalPrice).toFixed(2)}</span> 
                                 </div>
                            ))}
                            <br/>
                            <div>
                                <span  className="item-total">TOTAL AMOUNT</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="item-rupee"><i className="fa fa-inr" aria-hidden="true"></i>  {(this.state.totalCartItemsValue).toFixed(2)}</span>
                            </div>
                            <br/>
                            <Button className="cart-button"  variant="contained" color="primary"
                             onClick={this.onClickCheckoutButton()}>
                              CHECKOUT
                            </Button>
                            <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        
                                        open={this.state.open}
                                        autoHideDuration={3000}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.cartNotificationMessage}</span>}

                                        action={[
                                            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                                              <CloseIcon  />
                                            </IconButton>,
                                          ]}
                                    />
                          </CardContent>    
                       </Card>    
                    </div>               
                </div>
            
            </div>
            
        );
    }
}
export default Order;