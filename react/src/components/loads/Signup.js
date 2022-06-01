  
import React, { Component } from 'react';

class Signup extends Component {
    render() {
        return (
            <html>
                <head>
                    <title> 유하! </title>
                </head>
                
                <body>

                    <form>
                        <label> 이름: <input type="text" id="SignupNameForm" /></label>
                        <br></br>
                        <label> ID: <input type="text" id="SignupIdForm" /></label>
                        <br></br>
                        <label> PW: <input type ="password" id="SignupPasswordForm" /></label>
                        <br></br>
                        <button id="signupButton">Signup</button>
                    </form>
                    
                </body>
                
            </html>
        );
    }
}

  export default Signup;