import React, { Component } from "react";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './Header.css';
class Header extends Component {
    render() {
        // logo to be rendered inside the header
        let logoToRender = null;
        if (this.props.showLogo) {
            logoToRender = (
                <div className="logo-title-container">
                    e-Rythu Bazaar
                </div>
            );
        }
        return (
            
                <div className="header-main-container">
                    <div className="header-logo-container">{logoToRender}</div>

                </div>

            

        );
    }
}

export default Header;