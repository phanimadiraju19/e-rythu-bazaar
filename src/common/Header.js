import React, { Component } from "react";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './Header.css';
import * as Utils from "../common/Utils";
import * as UtilsUI from "../common/UtilsUI";
import * as Constants from "../common/Constants";
//import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import accountCircle from '../assets/icon/accountCircle.svg';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
//import SearchIcon from "@material-ui/icons/Search";

//import FastFoodIcon from '@material-ui/icons/Fastfood';
//import SearchIcon from '@material-ui/icons/Search';
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// custom styles for upload modal
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

// inline styles for Material-UI components
const styles = {
    searchInput: {
        width: "80%"
    },
    uploadIcon: {
        paddingLeft: 10
    },
    profileIconButton: {
        padding: 0
    }
};

/**
 * Functional component for displaying Tab components
 * @param props properties passed by parent component to child component
 */
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

/**
 * Class component for the header
 * @class Header
 * @extends {Component}
 */
class Header extends Component {

    constructor() {
        super();

        this.openModalHandler = this.openModalHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.tabChangeHandler = this.tabChangeHandler.bind(this);
        this.inputContactnoChangeHandler = this.inputContactnoChangeHandler.bind(this);
        this.inputLoginPasswordChangeHandler = this.inputLoginPasswordChangeHandler.bind(this);
        this.loginSignedupCustomer = this.loginSignedupCustomer.bind(this);
        this.inputFirstNameChangeHandler = this.inputFirstNameChangeHandler.bind(this);
        this.inputLastNameChangeHandler = this.inputLastNameChangeHandler.bind(this);
        this.inputRegisterPasswordChangeHandler = this.inputRegisterPasswordChangeHandler.bind(this);
        this.inputContactChangeHandler = this.inputContactChangeHandler.bind(this);
        this.signupNewCustomer = this.signupNewCustomer.bind(this);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
        this.openUserProfileHandler = this.openUserProfileHandler.bind(this);
        this.inputRoleChangeHandler = this.inputRoleChangeHandler.bind(this);
        this.selectImageForUpload = this.selectImageForUpload.bind(this);

    }
    state = {
        loginFormUserValues: {
            // object containing values entered by the user in the text fields of the login form
            contactno: "",
            loginPassword: ""
        },
        loginFormValidationClassNames: {
            // object containing the classnames for the validation messages displayed below the text fields of the login form
            contactno: Constants.DisplayClassname.DISPLAY_NONE,
            loginPassword: Constants.DisplayClassname.DISPLAY_NONE
        },
        loginErrorMsg: "", // error message displayed for wrong credentials in the login form 
        signupFormUserValues: {
            firstname: "",
            lastname: "",
            contact: "",
            registerPassword: "",
            role: ""
        },
        signupFormValidationClassNames: {
            // object containing the classnames for the validation messages displayed below the text fields of the signup form
            contact: Constants.DisplayClassname.DISPLAY_NONE,
            firstname: Constants.DisplayClassname.DISPLAY_NONE,
            registerPassword: Constants.DisplayClassname.DISPLAY_NONE,
            role: Constants.DisplayClassname.DISPLAY_NONE
        },
        uploadImageFormValues: {
            // object containing values filled by the user in the upload image modal
            imageFile: {}, // image file containing the new image selected by the user from the system
            imagePreviewUrl: "", // preview URL the new image file selected by the user from the system
            description: "", // description for the new image to be uploaded
            quantityAvailable: "", // quantity for the new image/item to be uploaded
            pricePerUnit: "",//price of the item per unit 
            expiryDate: ""//expiry date of the item uploaded
        },
        uploadImageFormValidationClassnames: {
            // object containing validation classnames for the form fields inside the upload image modal
            image: Constants.DisplayClassname.DISPLAY_NONE,
            description: Constants.DisplayClassname.DISPLAY_NONE,
            quantityAvailable: Constants.DisplayClassname.DISPLAY_NONE,
            pricePerUnit: Constants.DisplayClassname.DISPLAY_NONE,
            expiryDate: Constants.DisplayClassname.DISPLAY_NONE

        },
        modalIsOpen: false,//login modal state is closed
        value: 0,//Initial value for tab container is set to '0'
        signupSuccess: false,//signup status is false
        loginSnackBarIsOpen: false,
        registerSnackBarIsOpen: false,
        showUserProfileDropDown: false, // boolean value indicating if the user profile dropdown is open; TRUE for open and FALSE for closed
        loggedIn: sessionStorage.getItem("access-token") == null ? false : true,//Logged in status is null if there is no accesstoken in sessionstorage
    };

    /**
    * Event handler called when the login button inside the header is clicked to open the login and signup modal
    * @memberof Header
    */
    openModalHandler = () => { this.setState({ modalIsOpen: true }); }

    /**
    * Event handler called when the user clicks outside the modal or intends to close the modal 
    * @memberof Header
    */
    closeModalHandler = () => { this.setState({ modalIsOpen: false }); }

    /**
    * Event handler called when the user tries to navigate to different tabs
    * @memberof Header
    */
    tabChangeHandler = (event, value) => { this.setState({ value }); }

    /**
    * Event handler called when the contactno text field is changed by the user in Login form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputContactnoChangeHandler = event => {
        let currentLoginFormValues = { ...this.state.loginFormUserValues };
        currentLoginFormValues.contactno = event.target.value;
        this.setState({ loginFormUserValues: currentLoginFormValues });
    };

    /**
    * Event handler called when the password text field is changed by the user in Login form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputLoginPasswordChangeHandler = event => {
        let currentLoginFormValues = { ...this.state.loginFormUserValues };
        currentLoginFormValues.loginPassword = event.target.value;
        this.setState({ loginFormUserValues: currentLoginFormValues });
    };

    /**
   * Event handler called when the firstname text field is changed by the user in Signup form
   * @param event defualt parameter for onChange
   * @memberof Header (Login/Signup modal)
   */
    inputFirstNameChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.firstname = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the lastname text field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputLastNameChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.lastname = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the role field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputRoleChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.role = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the password text field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputRegisterPasswordChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.registerPassword = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the contact text field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputContactChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.contact = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
   * Event handler called when an image of item  is selected by a user to be uploaded
   * @param event default parameter on which the event handler is called
   * @memberof Header
   */
    selectImageForUpload = event => {
        event.preventDefault();

        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            const currentUploadImageFormValues = {
                ...this.state.uploadImageFormValues
            };
            currentUploadImageFormValues.imageFile = file;
            currentUploadImageFormValues.imagePreviewUrl = reader.result;
            this.setState({
                uploadImageFormValues: currentUploadImageFormValues
            });
        };

        reader.readAsDataURL(file);
    };


    /**
     * Event handler called when the description input field is changed inside the upload image/item modal
     * @param event default parameter on which the event handler is called
     * @memberof Header
     */
    changeDescriptionHandlerInUploadImageModal = event => {
        let currentUploadImageFormValues = { ...this.state.uploadImageFormValues };
        currentUploadImageFormValues.description = event.target.value;
        this.setState({
            uploadImageFormValues: currentUploadImageFormValues
        });
    };

    /**
     * Event handler called when the quantity available input field is changed inside the upload image modal
     * @param event default parameter on which the event handler is called
     * @memberof Header
     */
    changeQuantityAvailableHandlerInUploadImageModal = event => {
        let currentUploadImageFormValues = { ...this.state.uploadImageFormValues };
        currentUploadImageFormValues.quantityAvailable = event.target.value;
        this.setState({
            uploadImageFormValues: currentUploadImageFormValues
        });
    };

    /**
     * Event handler called when the price per unit  input field is changed inside the upload image modal
     * @param event default parameter on which the event handler is called
     * @memberof Header
     */
    changePricePerUnitHandlerInUploadImageModal = event => {
        let currentUploadImageFormValues = { ...this.state.uploadImageFormValues };
        currentUploadImageFormValues.pricePerUnit = event.target.value;
        this.setState({
            uploadImageFormValues: currentUploadImageFormValues
        });
    };

    /**
     * Event handler called when the expiry date   input field is changed inside the upload image modal
     * @param event default parameter on which the event handler is called
     * @memberof Header
     */
    changeExpiryDateHandlerInUploadImageModal = event => {
        let currentUploadImageFormValues = { ...this.state.uploadImageFormValues };
        currentUploadImageFormValues.expiryDate = event.target.value;
        this.setState({
            uploadImageFormValues: currentUploadImageFormValues
        });
    };


    /**
     * Event handler called when the upload button inside the header is clicked to open the upload image modal
     * @memberof Header
     */
    openUploadImageModal = () => {
        this.setState({
            isUploadModalOpen: true
        });
    };

    /**
     * Event handler called to close upload image modal
     * @memberof Header
     */
    closeUploadImageModal = () => {
        let newUploadImageModalFormValues = { ...this.state.uploadImageFormValues };
        Utils.assignEmptyStringToAllKeysInObj(newUploadImageModalFormValues);
        const currentUploadImageFormValidationClassnames = {
            ...this.uploadImageFormValidationClassnames
        };

        currentUploadImageFormValidationClassnames.image =
            Constants.DisplayClassname.DISPLAY_NONE;
        currentUploadImageFormValidationClassnames.description =
            Constants.DisplayClassname.DISPLAY_NONE;
        currentUploadImageFormValidationClassnames.quantityAvailable =
            Constants.DisplayClassname.DISPLAY_NONE;
        currentUploadImageFormValidationClassnames.pricePerUnit =
            Constants.DisplayClassname.DISPLAY_NONE;
        currentUploadImageFormValidationClassnames.expiryDate =
            Constants.DisplayClassname.DISPLAY_NONE;

        this.setState({
            isUploadModalOpen: false,
            uploadImageFormValues: newUploadImageModalFormValues,
            uploadImageFormValidationClassnames: currentUploadImageFormValidationClassnames
        });
    };



    /**
     * Event handler called when the 'Upload' button inside the upload image/item modal is clicked
     * @memberof Header
     */
    uploadClickHandlerInUploadModal = () => {
        // finding the class names for the desciption ,qty,price,exp date validation messages - to be displayed or not
        const image_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.uploadImageFormValues.imagePreviewUrl,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        const description_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.uploadImageFormValues.description,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        const quantity_available_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.uploadImageFormValues.quantityAvailable,
            Constants.ValueTypeEnum.FORM_FIELD
        );

        const price_per_unit_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.uploadImageFormValues.pricePerUnit,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        const expiry_date_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.uploadImageFormValues.expiryDate,
            Constants.ValueTypeEnum.FORM_FIELD
        );


        // setting the class names for the desciption and hashtags validation messages - to be displayed or not
        let currentUploadImageFormValidationClassnames = {
            ...this.state.uploadImageFormValidationClassnames
        };
        currentUploadImageFormValidationClassnames.image = image_validation_classname;
        currentUploadImageFormValidationClassnames.description = description_validation_classname;
        currentUploadImageFormValidationClassnames.quantityAvailable = quantity_available_validation_classname;
        currentUploadImageFormValidationClassnames.pricePerUnit = price_per_unit_validation_classname;
        currentUploadImageFormValidationClassnames.expiryDate = expiry_date_validation_classname;

        if (
            Utils.isAnyValueOfObjectUndefinedOrNullOrEmpty(
                this.state.uploadImageFormValues
            )
        ) {
            this.setState({
                uploadImageFormValidationClassnames: currentUploadImageFormValidationClassnames
            });
        } else {
            const imageDetails = {

                id: Math.floor(new Date().getTime() / 1000),
                item_name: this.state.uploadImageFormValues.description,
                photo_URL: this.state.uploadImageFormValues.imagePreviewUrl,
                price: this.state.uploadImageFormValues.pricePerUnit,
                quantity: this.state.uploadImageFormValues.quantityAvailable,
                expdate: this.state.uploadImageFormValues.expiryDate

            };

            this.props.uploadNewImage(imageDetails);
            console.log(this.state.uploadImageFormValues);
            console.log(imageDetails);
            console.log(imageDetails.photo_URL);
            this.closeUploadImageModal();
        }
    };


    /**
   * Event handler called when the user clicks on the login button in Login modal
   * @param event defualt parameter for onClick
   * @memberof Header (Login modal)
   */
    loginSignedupCustomer = () => {

        // clearing the error message; based on the validation of user input values
        this.setState({
            loginErrorMsg: ""
        });

        // finding the class names for the contactno and password validation messages - to be displayed or not
        let contactno_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.loginFormUserValues.contactno,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let loginPassword_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.loginFormUserValues.loginPassword,
            Constants.ValueTypeEnum.FORM_FIELD
        );

        // setting the class names for the contactno and password validation messages - to be displayed or not
        let currentLoginFormValidationClassNames = {
            ...this.state.loginFormValidationClassNames
        };
        currentLoginFormValidationClassNames.contactno = contactno_validation_classname;
        currentLoginFormValidationClassNames.loginPassword = loginPassword_validation_classname;
        this.setState({
            loginFormValidationClassNames: currentLoginFormValidationClassNames,
        });



        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhrLogin.status === 200 || xhrLogin.status === 201) {
                    sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                    sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));


                    that.setState({
                        loggedIn: true,
                        loginSnackBarIsOpen: true,

                    });

                    that.closeModalHandler();

                }
            }
        });

        xhrLogin.open("POST", "http://localhost:8080/api/customer/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginFormUserValues.contactno + ":" + this.state.loginFormUserValues.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);


    };

    /**
   * Event handler called when the user clicks on the signup button in Signup modal
   * @param event defualt parameter for onClick
   * @memberof Header (Signup modal)
   */
    signupNewCustomer = () => {

        // clearing the error message; based on the validation of user input values
        this.setState({
            signupErrorMsg: "",

        });

        // finding the class names for the contactno,email, firstname and password validation messages - to be displayed or not
        let contact_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.contact,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let role_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.role,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let firstname_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.firstname,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let registerPassword_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.registerPassword,
            Constants.ValueTypeEnum.FORM_FIELD
        );

        // setting the class names for the contactno,role, firstname and password validation messages - to be displayed or not
        let currentSignupFormValidationClassNames = { ...this.state.signupFormValidationClassNames };
        currentSignupFormValidationClassNames.contact = contact_validation_classname;
        currentSignupFormValidationClassNames.role = role_validation_classname;
        currentSignupFormValidationClassNames.firstname = firstname_validation_classname;
        currentSignupFormValidationClassNames.registerPassword = registerPassword_validation_classname;

        this.setState({
            signupFormValidationClassNames: currentSignupFormValidationClassNames,

        });

        let dataSignup = JSON.stringify({
            "contact_number": this.state.signupFormUserValues.contact,
            "role": this.state.signupFormUserValues.role,
            "first_name": this.state.signupFormUserValues.firstname,
            "last_name": this.state.signupFormUserValues.lastname,
            "password": this.state.signupFormUserValues.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhrSignup.status === 200 || xhrSignup.status === 201) {
                    that.setState({
                        signupSuccess: true,
                        registerSnackBarIsOpen: true
                    });
                }

            }
        });

        xhrSignup.open("POST", "http://localhost:8080/api/customer/signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);

    };


    loginSnackBarCloseHandler = (e) => {
        this.setState({ loginSnackBarIsOpen: false });
    }
    registerSnackBarCloseHandler = (e) => {
        this.setState({ registerSnackBarIsOpen: false });
    }


    /**
      * Event handler called when the profile icon inside the header is clicked to toggle the user profile dropdown
      * @memberof Header
      */
    openUserProfileHandler = () => {
        this.setState({
            showUserProfileDropDown: !this.state.showUserProfileDropDown
        });
    };

    /**
     * Event handler called when the logout menu item is clicked inside the user profile dropdown to log a user out of the application
     * @memberof Header
     */
    logoutClickHandler = () => {
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("user-details");
        this.props.history.push({
            pathname: "/"
        });
    };


    /**
  * Function called when the component is rendered
  * @memberof Header
  */
    render() {
        const { classes } = this.props;

        // logo to be rendered inside the header
        let logoToRender = null;
        if (this.props.showLogo) {
            logoToRender = (
                <div className="logo-title-container">
                    e-Rythu Bazaar
                </div>
            );
        }



        //login button and modal component  to be rendered inside the header
        let loginButtonModalToRender = null;
        if (this.props.showLoginModal) {
            loginButtonModalToRender = (
                <div className="header-login-btn-container">
                    <Button variant="contained" color="default" onClick={this.openModalHandler} >
                        <img src={accountCircle} className="accountCircle-logo" alt="accountCircle" />Login</Button>
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Login"
                        onRequestClose={this.closeModalHandler}
                        style={customStyles}
                    >
                        <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>

                            <Tab label="Signup" />
                            <Tab label="Login" />
                        </Tabs>

                        {this.state.value === 1 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="contactno">Contact No</InputLabel>
                                    <Input id="contactno" type="text" contactno={this.state.contactno} onChange={this.inputContactnoChangeHandler} />
                                    <FormHelperText className={this.state.loginFormValidationClassNames.contactno}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                    <FormHelperText className={this.state.loginFormValidationClassNames.loginPassword}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.loginSignedupCustomer}>LOGIN</Button>

                            </TabContainer>
                        }

                        {this.state.value === 0 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.firstname}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl >
                                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                    <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                    <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.contact}>
                                        <span className="red">required</span>
                                    </FormHelperText>

                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                    <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.registerPassword}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="role">Role</InputLabel>
                                    <Input id="role" type="text" role={this.state.role} onChange={this.inputRoleChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.role}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.signupNewCustomer}>SIGNUP</Button>
                            </TabContainer>
                        }
                    </Modal>
                </div>
            );
        }

        
        // upload button to be rendered inside the header
        let uploadButtonToRender = null;
        if (this.props.showUpload) {
            uploadButtonToRender = (
                <div className="header-upload-btn-container">
                    <Button
                        className="button"
                        variant="contained"
                        color="primary"
                        onClick={this.openUploadImageModal}
                    >
                        Upload
            <CloudUploadIcon className={classes.uploadIcon} />
                    </Button>

                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.isUploadModalOpen}
                        contentLabel="Login"
                        onRequestClose={this.closeUploadImageModal}
                        style={customStyles}
                    >
                        <Typography variant="headline" component="h2">
                            UPLOAD
            </Typography>
                        <br />
                        <br />

                        <div>
                            <input
                                required
                                type="file"
                                accept="image/*"
                                onChange={this.selectImageForUpload}
                            />
                            <div
                                className={this.state.uploadImageFormValidationClassnames.image}
                            >
                                <span className="error-msg">required</span>
                                <br />
                                <br />
                            </div>
                            {!Utils.isUndefinedOrNullOrEmpty(
                                this.state.uploadImageFormValues.imagePreviewUrl
                            ) ? (
                                    <div className="image-preview-container">
                                        <img
                                            alt="Preview"
                                            className="image-preview"
                                            src={this.state.uploadImageFormValues.imagePreviewUrl}
                                        />
                                    </div>
                                ) : null}
                        </div>

                        <FormControl required>
                            <InputLabel htmlFor="imageDescription">Description</InputLabel>
                            <Input
                                id="imageDescription"
                                type="text"
                                value={this.state.uploadImageFormValues.description}
                                onChange={this.changeDescriptionHandlerInUploadImageModal}
                            />
                            <FormHelperText
                                className={
                                    this.state.uploadImageFormValidationClassnames.description
                                }
                            >
                                <span className="error-msg">required</span>
                            </FormHelperText>
                        </FormControl>


                        <br />
                        <FormControl required>
                            <InputLabel htmlFor="price">Price per unit</InputLabel>
                            <Input
                                id="price"
                                type="text"
                                value={this.state.uploadImageFormValues.pricePerUnit}
                                onChange={this.changePricePerUnitHandlerInUploadImageModal}
                            />
                            <FormHelperText
                                className={
                                    this.state.uploadImageFormValidationClassnames.pricePerUnit
                                }
                            >
                                <span className="error-msg">required</span>
                            </FormHelperText>
                        </FormControl>

                        <br />
                        <FormControl required>
                            <InputLabel htmlFor="quantity">Quantity Available</InputLabel>
                            <Input
                                id="quantity"
                                type="text"
                                value={this.state.uploadImageFormValues.quantityAvailable}
                                onChange={this.changeQuantityAvailableHandlerInUploadImageModal}
                            />
                            <FormHelperText
                                className={
                                    this.state.uploadImageFormValidationClassnames.quantityAvailable
                                }
                            >
                                <span className="error-msg">required</span>
                            </FormHelperText>
                        </FormControl>

                        <br />
                        <FormControl required>
                            <InputLabel htmlFor="expirydate">Expiry Date</InputLabel>
                            <Input
                                id="expirydate"
                                type="text"
                                value={this.state.uploadImageFormValues.expiryDate}
                                onChange={this.changeExpiryDateHandlerInUploadImageModal}
                            />
                            <FormHelperText
                                className={
                                    this.state.uploadImageFormValidationClassnames.expiryDate
                                }
                            >
                                <span className="error-msg">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <Button
                            className="button"
                            variant="contained"
                            color="secondary"
                            onClick={this.uploadClickHandlerInUploadModal}
                        >
                            Upload
            </Button>
                    </Modal>
                </div>
            );
        }

        

        //loginsnackbar component to be rendered upon successful login
        let loginSnackBarToRender = null;
        if (this.state.loginSnackBarIsOpen) {
            loginSnackBarToRender = (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    open={this.state.loginSnackBarIsOpen}
                    autoHideDuration={3000}
                    onClose={this.loginSnackBarCloseHandler}
                    ContentProps={{ 'aria-describedby': 'message-id', }}
                    message={<span id="message-id">Logged in successfully!</span>}
                />
            );
        }

        //registersnackbar component to be rendered upon successful signup
        let registerSnackBarToRender = null;
        if (this.state.registerSnackBarIsOpen) {
            registerSnackBarToRender = (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    open={this.state.registerSnackBarIsOpen}
                    autoHideDuration={3000}
                    onClose={this.registerSnackBarCloseHandler}
                    ContentProps={{ 'aria-describedby': 'message-id', }}
                    message={<span id="message-id">Registered successfully! Please login now!</span>}
                />
            );
        }

        return (

            <div className="header-main-container">
                <div className="header-logo-container">{logoToRender}</div>
                {uploadButtonToRender}
                {loginButtonModalToRender}
                {loginSnackBarToRender}
                {registerSnackBarToRender}
            </div>


        );

    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);


