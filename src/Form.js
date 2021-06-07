import React from 'react';
import './ContactForm.css';

class InputElement extends React.Component {
    render() {
        return <div className="input-element">
            <input type={this.props.type} className={this.props.className} placeholder={this.props.placeholder} id={this.props.id} />
            <br></br>
            <span className="error-text">{this.props.errorText == null ? '' : this.props.errorText}</span>
        </div>
    }
}

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNameErrorText: null,
            lastNameErrorText: null,
            emailErrorText: null,
            passwordErrorText: null,
            cpasswordErrorText: null,
            mobileErrorText: null
        }
    }

    validateForm = () => {
        var data = {}
        data.firstName = document.getElementById('firstName').value;
        data.lastName = document.getElementById('lastName').value;
        data.email = document.getElementById('email').value;
        data.password = document.getElementById('password').value;
        data.mobile = document.getElementById('mobile').value;
        data.cpassword = document.getElementById('cpassword').value;
        data.storageType = document.getElementById('storageType').value;
        if (!this.stringValidator(data.firstName))
            return this.setState({
                firstNameErrorText: 'Invalid details',
                lastNameErrorText: null, mobileErrorText: null, passwordErrorText: null, cpasswordErrorText: null, emailErrorText: null
            })
        if (!this.stringValidator(data.lastName))
            return this.setState({
                firstNameErrorText: null,
                lastNameErrorText: 'Invalid details', mobileErrorText: null, passwordErrorText: null, cpasswordErrorText: null, emailErrorText: null
            })
        if (!this.stringValidator(data.email) || !this.validateEmail(data.email))
            return this.setState({
                firstNameErrorText: null,
                lastNameErrorText: null, mobileErrorText: null, passwordErrorText: null, cpasswordErrorText: null, emailErrorText: 'Invalid details'
            })
        if (!this.stringValidator(data.password) || !this.validatePassword(data.password))
            return this.setState({
                firstNameErrorText: null,
                lastNameErrorText: null, mobileErrorText: null, passwordErrorText: 'Invalid details', cpasswordErrorText: null, emailErrorText: null
            })
        if (!this.stringValidator(data.mobile) || !this.validateMobile(data.mobile))
            return this.setState({
                firstNameErrorText: null,
                lastNameErrorText: null, mobileErrorText: 'Invalid details', passwordErrorText: null, cpasswordErrorText: null, emailErrorText: null
            })
        if (!this.stringValidator(data.cpassword) || data.password!==data.cpassword)
            return this.setState({
                firstNameErrorText: null,
                lastNameErrorText: null, mobileErrorText: null, passwordErrorText: null, cpasswordErrorText: 'Passwords do not match', emailErrorText: null
            })
        this.saveDetails(data);
    }

    saveDetails = (data)=>{
        var http = new XMLHttpRequest();
        http.open('post', '/contact/save');
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(this.queryBuilder(data));
        http.onloadend= (ev)=>{
            if(http.status === 200)
                alert("Details Saved Successfully");
            else alert(http.responseText);
        }
    }

    queryBuilder = (data)=>{
        var str = "";
        for(var key in data){
            str+= "&" + key + "=" + data[key]
        }
        return str.substr(1);
    }

    stringValidator = (str) => {
        return (str != null && str.trim().length > 0 && !str.includes('|'))
    }

    validateMobile = (mobile)=>{
        if(mobile.trim().length !== 10) return false;
        if(isNaN(mobile)) return false;
        return true;
    }

    validatePassword = (password)=>{
        if(password.trim().length < 5 || password.trim().length > 256)
            return false;
        return true;
    }

    validateEmail = (email)=>{
        var a = email.lastIndexOf("@");
        var b = email.lastIndexOf(".");
        if(b-a <=1)
            return false;
        if(a === 0) return false;
        if(b >= email.length-1)
            return false;
        return true;
    }

    render() {
        return (
            <div className="form">
                <div className="heading">
                    Personal Details
                </div>
                <InputElement className="input-box" placeholder="First Name" type="text" id="firstName" errorText={this.state.firstNameErrorText} />
                <InputElement className="input-box" placeholder="Last Name" type="text" id="lastName" errorText={this.state.lastNameErrorText} />
                <InputElement className="input-box" placeholder="Your Email" type="email" id="email" errorText={this.state.emailErrorText} />
                <InputElement className="input-box" placeholder="Mobile Number" type="text" id="mobile" errorText={this.state.mobileErrorText} />
                <InputElement className="input-box" placeholder="Choose a Password" type="password" id="password" errorText={this.state.passwordErrorText} />
                <InputElement className="input-box" placeholder="Confirm Password" type="text" id="cpassword" errorText={this.state.cpasswordErrorText} />
                <div className="heading">
                    Choose Storage Medium
                </div>
                <select id = "storageType">
                    <option value="local">
                        Local File
                    </option>
                    <option value="database">
                        Database
                    </option>
                </select>
                <button onClick={this.validateForm}>
                    Submit
                </button>
            </div>
        );
    }
}




export default ContactForm;