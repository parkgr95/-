import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import Statistics from '../Statistics';
class ChatFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            value:'',
        };

    }
 


    callApi = () => {

        fetch('http://127.0.0.1:8000/api' + this.props.match.url)
          
        .then(res => res.json())

        .then(json => this.setState({
            chats: json,
        }));
    }

    componentDidMount() {
    
        this.callApi();

    }
    
    render() {

        const { chats } = this.state;
        const x=[];
        const y=[];
        for (var i in chats){
            x.push(chats[i].time)
        }
        
        for (var i in chats){
            y.push(chats[i].num_of_chat)
        }
        




        return (
            <html>         
                <body>
             
                    <div id="chatFlowChart">
                        <h3> 시간대별 채팅 빈도 차트입니다.</h3>
                        <h6> 그래프 확대, 축소가 가능하며 png 파일로 저장할 수 있습니다.</h6>
                        <Plot 
                            data={[
                                {
                                    x:x,
                                    y:y,
                                    type: 'scatter',
                                    mode : 'lines',
                                    marker: {color:'#01A9DB'},
                                },
        
                            ]}
                        />
                    </div>
                </body>
                
            </html>
        );
    }
}

  export default ChatFlow;