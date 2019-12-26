import React, {Component} from "react";
import Header from "../../common/Header";

class Home extends Component {
    render(){
        return(
            <div>
            <Header 
            showLogo={true}
            history={this.props.history}
            showLoginModal={true}
            enableMyAccount={true}
            />
            Home Page 
            </div>
        );
    }
}

export default Home;