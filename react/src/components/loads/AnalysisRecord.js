import React, { Component } from 'react';
import Header from '../layout/Header';

class AnalysisRecord extends Component {
    constructor(props) {
		super(props);
		this.state = {
            records:[],
            streamers:[],
            selected:"all",
            value:"",
            changed:0
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event){
        this.setState({selected: event.target.value});
        this.callApi1();
        this.setState({changed: this.state.changed + 1 });
    }
    handleClick2(event){
        this.setState({value: event.target.value});

    }


	handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('/selectchapter'+'/'+this.state.value)
    }

    
    callApi1 = () => {

        fetch('http://127.0.0.1:8000/api/analysis/'+this.state.selected)
        

        .then(res => res.json())

        .then(json => this.setState({
            records: json,
        }));
        
    }

    
    componentDidMount() {

        this.callApi1();
        // this.callApi2();
    

    }

    render() {

        const recordlist = this.state.records.map((keyword) => (
            <tr> 
                <td>
                    <form action="/selectchapter" method="POST" onSubmit={this.handleSubmit}>
                        <button type ="submit" class = "streamerButton" onClick={this.handleClick2} value={keyword.video_url} > {keyword.title} </button>
                    </form>
                </td>
              
                <td><button class = "streamerButton" onClick={this.handleClick} value={keyword.name}>{keyword.name}</button></td>
                <td>{keyword.date}</td>
            </tr> 
        ))

        return (
            <html>
                <Header></Header>
                
                <body>
                    <div id="MyAnalysis">
                        <h4> 분석 기록 </h4><br></br>
                        <h6> 제목을 클릭하면 해당 기록의 분석 결과를 확인할 수 있습니다.</h6>
                        <h6> 스트리머를 "더블"클릭하면 해당 스크리머의 기록만 모아볼 수 있습니다.</h6><br></br>
                        <table id="recordtable" border="2">
                            <tbody>
                                <tr align="center">
                                    <td width="400" height="50"> Title. </td>
                                    <td width="150"> Stramer. </td>
                                    <td width="150"> Date </td>
        
                                </tr>
                                {recordlist}
                            </tbody>
                        </table> 
                        <button id="loginButton" onClick={this.handleClick} value="all">전체보기</button>
                    </div>
                    
                </body>               
            </html>
        );
    }
}
   



export default AnalysisRecord;
  