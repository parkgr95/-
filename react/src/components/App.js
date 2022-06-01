import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './layout/Header';
import Login from "./loads/Login";
import Signup from "./loads/Signup";
import Search from "./loads/Search";
import Mypage from "./loads/Mypage";
import SelectChpater from "./loads/SelectChapter";
import HighlightResult from "./loads/HighlightResult";
import Statistics from "./loads/Statistics";

import AnalysisRecord from './loads/AnalysisRecord';

class App extends Component{
    render(){
        return (
            <html>

                <body>
                    <Router>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Search} />
                                <Route exact path="/search" component={Search} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/signup" component={Signup} />
                                <Route exact path="/selectchapter/:value" component={SelectChpater} />
                                <Route exact path="/mypage" component={Mypage} />
                                <Route exact path="/highlightresult/:value/:chapter" component={HighlightResult} />
                                <Route exact path="/statistics/:value" component={Statistics} />
                                <Route exact path="/analysis" component={AnalysisRecord} />
                           
                            </Switch>
                        </div>
                    </Router>
  
    
                </body>
            </html>

    
        )
    }
}


export default App;