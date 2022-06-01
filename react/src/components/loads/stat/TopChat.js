import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class TopChat extends Component {
    constructor(props) {
		super(props);
		this.state = {
            topChat:[],
            timeline:'0h0m0s',
        };
        this.handleChange = this.handleChange.bind(this);
        this.shiftTimeline = this.shiftTimeline.bind(this);
    }

    callApi = () => {

        fetch('http://127.0.0.1:8000/api' + this.props.match.url)
          
        .then(res => res.json())

        .then(json => this.setState({
            topChat: json,          
        }));  
    }

    handleChange(event){
        this.setState({value: this.props.match.params.value});
    }

    shiftTimeline(event){
        this.setState({timeline: event.target.value});

    }

    componentDidMount() {
    
        this.callApi();
    
    }

    render() {
        const { topChat } = this.state;
        console.log(this.state.timeline);
        const video_start_time = parseInt(this.state.timeline/3600)+"h"+parseInt(this.state.timeline%3600/60)+"m"+this.state.timeline%60+"s"
        console.log(video_start_time);
        const wordlist = topChat.map((keyword) => (
            <tr> 
                <td>{keyword.rank}</td> 
                <td>{keyword.word}</td> 
                <td>{keyword.count}</td> 
                <td><button class="ViewButton" value={keyword.appearance_time1} onClick= {this.shiftTimeline}> {parseInt(keyword.appearance_time1/3600)}:{parseInt(keyword.appearance_time1%3600/60)}:{keyword.appearance_time1%60} </button></td>
                <td><button class="ViewButton" value={keyword.appearance_time2} onClick= {this.shiftTimeline}> {parseInt(keyword.appearance_time2/3600)}:{parseInt(keyword.appearance_time2%3600/60)}:{keyword.appearance_time2%60} </button></td>
                <td><button class="ViewButton" value={keyword.appearance_time3} onClick= {this.shiftTimeline}> {parseInt(keyword.appearance_time3/3600)}:{parseInt(keyword.appearance_time3%3600/60)}:{keyword.appearance_time3%60} </button></td>
                <td><button class="ViewButton" value={keyword.appearance_time4} onClick= {this.shiftTimeline}> {parseInt(keyword.appearance_time4/3600)}:{parseInt(keyword.appearance_time4%3600/60)}:{keyword.appearance_time4%60} </button></td>
                <td><button class="ViewButton" value={keyword.appearance_time5} onClick= {this.shiftTimeline}> {parseInt(keyword.appearance_time5/3600)}:{parseInt(keyword.appearance_time5%3600/60)}:{keyword.appearance_time5%60} </button></td>
                {/* <td>{parseInt(keyword.appearance_time1/3600)}:{parseInt(keyword.appearance_time1%3600/60)}:{keyword.appearance_time1%60}</td> 
                <td>{parseInt(keyword.appearance_time2/3600)}:{parseInt(keyword.appearance_time2%3600/60)}:{keyword.appearance_time2%60}</td> 
                <td>{parseInt(keyword.appearance_time3/3600)}:{parseInt(keyword.appearance_time3%3600/60)}:{keyword.appearance_time3%60}</td> 
                <td>{parseInt(keyword.appearance_time4/3600)}:{parseInt(keyword.appearance_time4%3600/60)}:{keyword.appearance_time4%60}</td> 
                <td>{parseInt(keyword.appearance_time5/3600)}:{parseInt(keyword.appearance_time5%3600/60)}:{keyword.appearance_time5%60}</td>  */}
            </tr> 
        ))

        const {params} = this.props.match;
        var v_url= this.props.match.url;
        v_url=v_url.replace("/topChart/","")
        console.log(v_url);
        console.log(this.props);
        return (
            <html>         
                <body>
        
                    <div id="twitchVideo">
                        <iframe src={`https://player.twitch.tv/?video=${v_url}&parent=127.0.0.1&time=${video_start_time}`}
                        allowfullscreen="true" 
                        scrolling="no" 
                        height="378" 
                        width="620"
                        ></iframe>
                    </div> 
                    <div id="keywordChart">
                        <h3> 등장 빈도가 가장 높은 단어 5개를 보여줍니다!</h3>        
                        {/* <h6> time을 클릭하면 영상이 해당 구간으로 이동하여 재생됩니다.</h6> */}
                        <br></br>
                        <div class="keytable">
                            <table border="1">
                                <tbody>
                                    <tr align ="center">
                                        <td width="50"> rank </td>
                                        <td width="200"> keyword </td>
                                        <td width="120"> count </td>
                                        <td width="150"> time1 </td>
                                        <td width="150"> time2 </td>
                                        <td width="150"> time3 </td>
                                        <td width="150"> time4 </td>
                                        <td width="150"> time5 </td>
            
                                    </tr>
                                    {wordlist}
                                </tbody>
                            </table>
                        </div>               
                              
                    </div>
                    
                </body>
                
            </html>
        );
    }
}

  export default TopChat;