import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ChatFlow from "./stat/ChatFlow"
import AudioFlow from "./stat/AudioFlow"
import Sentiment from "./stat/Sentiment"
import TopChat from "./stat/TopChat"
import Header from '../layout/Header';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
        };


    }

    componentDidMount() {
    
        this.setState({value: this.props.value});
    
    }

    render() {

        
        return (
            <html>
                <Header></Header>
                <body>
                    <div id="stat">
                    <h4 id="statcdsc"> 확인할 통계를 선택하세요!</h4>
                        <Router>
                            <ul id="statList">
                                <Link to={`/topChart/${this.props.match.params.value}`}>
                                <button class="ChapterButton" >Top 5 Chat</button>
                                </Link>
                                <Link to={`/chatFlow/${this.props.match.params.value}`} >
                                <button class="ChapterButton">Chat Flow</button>
                                </Link>
                                <Link to={`/audioFlow/${this.props.match.params.value}`} >
                                <button class="ChapterButton">Audio Flow</button>
                                </Link>
                                <Link to={`/sentiment/${this.props.match.params.value}`} >
                                <button class="ChapterButton">Sentiment Analysis</button>
                                </Link>
                            </ul>
                         
                            <main>
                                <Switch>
                                <Route path={`/topChart/${this.props.match.params.value}`} component={TopChat} />
                                <Route path={`/chatFlow/${this.props.match.params.value}`} component={ChatFlow} />
                                <Route path={`/audioFlow/${this.props.match.params.value}`} component={AudioFlow} />
                                <Route path={`/sentiment/${this.props.match.params.value}`} component={Sentiment} />
                                </Switch>
                            </main>
                        </Router>
                    </div>
                    
                </body>
                
            </html>
        );
    }
}

  export default Statistics;