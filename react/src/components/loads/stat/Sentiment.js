import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import Statistics from '../Statistics';
class Sentiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentiments: [],
        }
    }
 
    callApi = () => {

        fetch('http://127.0.0.1:8000/api' + this.props.match.url)
          
        .then(res => res.json())

        .then(json => this.setState({
            sentiments: json,
        }));
    }

    componentDidMount() {
    
        this.callApi();
        console.log(this.props.match.url)
    }
    
    render() {
   
        const { sentiments } = this.state;
        var joy=0, sad=0, disappoint=0, surprise=0,teasing=0,neutral=0,questionmark=0;
        
        for (var i in sentiments){
            joy = joy + sentiments[i].joy
            sad = sad + sentiments[i].sad
            disappoint = disappoint + sentiments[i].disappoint
            surprise = surprise + sentiments[i].surprise
            teasing = teasing + sentiments[i].teasing
            neutral = neutral + sentiments[i].neutral
            questionmark = questionmark + sentiments[i].questionmark
        }
        const input = [joy,sad,disappoint,surprise,teasing,neutral,questionmark]


        //이거는 시간대별

        var time=[],joyl=[], sadl=[], disappointl=[], surprisel=[],teasingl=[],neutrall=[],questionmarkl=[];
        
        for (var i in sentiments){
            time.push(sentiments[i].time)
            joyl.push(sentiments[i].joy)
            sadl.push(sentiments[i].sad)
            disappointl.push(sentiments[i].disappoint)
            surprisel.push(sentiments[i].surprise)
            teasingl.push(sentiments[i].teasing)
            neutrall.push(sentiments[i].neutral)
            questionmarkl.push(sentiments[i].questionmark)
        }

        var trace1={x:time,y:joyl,name:'joy'};
        var trace2={x:time,y:sadl,name:'sad'};
        var trace3={x:time,y:disappointl,name:'disappoint'};
        var trace4={x:time,y:surprisel,name:'surprise'};
        var trace5={x:time,y:teasingl,name:'teasing'};
        var trace6={x:time,y:neutrall,name:'neutral'};
        var trace7={x:time,y:questionmarkl,name:'questionmark'};

    
        
        return (
            <html>         
                <body>
       
                    <div id="sentimentChart"> 
                        <h3> 시간대별 감정분석 결과 차트입니다.</h3>        
                        <h6> 그래프 확대, 축소가 가능하며 png 파일로 저장할 수 있습니다.</h6>
                        <h6> 원하는 감정만 선택해서 확인할 수 있습니다!</h6>
                        <Plot 
                            data={[   
                                    trace1,
                                    trace2,
                                    trace3,
                                    trace4,
                                    trace5,
                                    trace6,
                                    trace7,
                            ]}
                            graphDiv="graph"               
                        />
                        <h3> 영상 전체 감성분석 결과 차트입니다.</h3>
                        <Plot 
                            data={[
                                {
                                    values : input,
                                    labels:['joy','sad','disappoint','surprise','teasing','neutral','questionmark'],
                                    type: 'pie',       
                                },
                            ]}
                        />
                    </div>
            
                </body>
                
            </html>
        );
    }
}

  export default Sentiment;