import React, { Component } from 'react';
import Header from '../layout/Header';

class HighlightResult extends Component {
    constructor(props) {
		super(props);
		this.state = {
            result: [],
            TwitchData:[],
            downloadState: false,
            highlight:[],
            timeline:'0h0m0s',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.shiftTimeline = this.shiftTimeline.bind(this);
    }

    handleChange(event){
        this.setState({value: this.props.match.params.value});
    }
    
    handleSubmit(event) {

        event.preventDefault();
    
        this.props.history.push('/statistics'+'/'+this.props.match.params.value)
    }

    shiftTimeline(event){
        this.setState({timeline: event.target.value});

    }
    callApi1 = () => {

        fetch('http://127.0.0.1:8000/api/selectchapter/' + this.props.match.params.value)
        

        .then(res => res.json())

        .then(json => this.setState({
            TwitchData: json,
        }));
        
    }

    callApi2 = () => {

        fetch('http://127.0.0.1:8000/api/highlight/' + this.props.match.params.value +'/'+this.props.match.params.chapter)
        

        .then(res => res.json())

        .then(json => this.setState({
            highlight: json,
        }));
        
    }

    callApi3 = () => {

        fetch('http://127.0.0.1:8000/api/selectchapter/' + this.props.match.params.value)
        

        .then(res => res.json())

        .then(json => this.setState({
            TwitchData: json,
        }));
        
    }

    componentDidMount() {
        // setInterval(()=> {
        //     this.callApi1();
        //     console.log("@@@");
        //     console.log(this.state.TwitchData);
        //     console.log(this.state.TwitchData[0].downloadState);
        // },5000);
   

        this.callApi2();

        this.callApi3();

    }
    render() {

        const {params} = this.props.match;
        const { highlight } = this.state;

        const video_start_time = parseInt(this.state.timeline/3600)+"h"+parseInt(this.state.timeline%3600/60)+"m"+this.state.timeline%60+"s"
  
        const highlightlist = highlight.map((keyword) => (
            <tr> 
                <td>{parseInt(keyword.start_time/3600)}:{parseInt(keyword.start_time%3600/60)}:{keyword.start_time%60}</td>
                <td>{parseInt(keyword.end_time/3600)}:{parseInt(keyword.end_time%3600/60)}:{keyword.end_time%60}</td>
                <td><button class="viewButton" value={keyword.start_time} onClick= {this.shiftTimeline}> 보기 </button></td>
            </tr> 
        ))

        return (
            <html>
                <Header></Header> 
                <div id="twitchVideo">
                    <iframe src={`https://player.twitch.tv/?video=${params.value}&parent=127.0.0.1&time=${video_start_time}&autoplay=false`}
                    allowfullscreen="true" 
                    scrolling="no" 
                    height="378" 
                    width="620"
                    time="0h50m1s"

                    ></iframe>
                </div>  
                
                <div id="highlightResult">
                    <h3> 하이라이트 추출 결과  </h3>
                    <h5 id="highlightdsc"> 보기 버튼을 클릭하면 해당 하이라이트 구간의 타임라인으로 이동합니다!</h5>
                    <br></br>

                </div>
                <div id="highlightTable">
                    <h5> 잠시 기다리시면 결과가 출력됩니다.</h5>
                    <table border="1">
                        <tbody>
                            <tr align ="center">

                                <td width="200"> 시작시간 </td>
                                <td width="200"> 종료시간 </td>
                                <td width="80"> 타임라인 이동 </td>
                                

                            </tr>
                            {highlightlist}
                        </tbody>
                    </table>
  
                </div>
      
                <div>
                    <form action="/statistics" method="POST" onSubmit={this.handleSubmit}>
                        
                        <button class="ChapterButton" onClick={this.handleChange}> 통계 확인 </button>
                    </form>
                </div>
            </html>
        );
    }
}


export default HighlightResult;