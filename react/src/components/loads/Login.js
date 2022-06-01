
import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <html>

                <body>
        
                    <form>
                        <label> ID: <input type="text" id="LoginIdForm" /></label>
                        <br></br>
                        <label> PW: <input type ="password" id="LoginPasswordForm" /></label>
                        <br></br>
                        <button id="loginButton">Login</button>
                    </form>
                    
                </body>
                
            </html>
        );
    }
}

  export default Login;