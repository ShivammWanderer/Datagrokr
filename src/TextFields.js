import React from 'react';
import ReactDOM from 'react-dom';


class TextField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorText: null, 
            placeholder: props.placeholder, 
        }
    }
    render(){
        return (
            <div>
                <input type = "text" onAbort ></input>
            </div>
        );
    }
}