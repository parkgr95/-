import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import Statistics from '../Statistics';
import Header from '../../layout/Header';
class AudioFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: [],
        }
    }
  
    callApi = () => {

        fetch('http://127.0.0.1:8000/api' + this.props.match.url)
          
        .then(res => res.json())

        .then(json => this.setState({
            audio: json,
            
        }));

        
    }

    componentDidMount() {
    
        this.callApi();
    
    }
    
    render() {

        const { audio } = this.state;
        const x=[];
        const y=[];
        for (var i in audio){
            x.push(audio[i].time)
            console.log(audio)
            console.log(i)
        }
        for (var i in audio){
            y.push(audio[i].decibel)
        }

        return (
            <html> 
            
                <body>
                    
                    <div id="audioFlowChart">
                        <h3> 시간대별 오디오 데시벨 분석 차트입니다.</h3>
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

  export default AudioFlow;