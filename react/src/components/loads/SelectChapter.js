import React, { Component } from 'react';
import Header from '../layout/Header';


class SelectChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TwitchData: [],
            TwitchChapter: [],
            value:'',
            selectedChapter:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({selectedChapter: event.target.value});
    }
    
    handleSubmit(event) {

        event.preventDefault();
    
        this.props.history.push('/highlightresult'+'/'+this.props.match.params.value+'/'+this.state.selectedChapter)
    }


    callApi1 = () => {

        fetch('http://127.0.0.1:8000/api' + this.props.match.url)
        

        .then(res => res.json())

        .then(json => this.setState({
            TwitchData: json,
        }));
        
    }

    callApi2 = () => {

        fetch('http://127.0.0.1:8000/api/chapter' + this.props.match.url)
        
        .then(res => res.json())

        .then(json => this.setState({
            TwitchChapter: json,
            
        }));
        
    }

    callApi3 = () => {

        fetch('http://127.0.0.1:8000/api/downloading' + this.props.match.url)
        

        .then(res => res.json())

        
    }
    componentDidMount() {
        // setTimeout(function() { 
        //     this.callApi1();
        //     this.callApi2();

        // }.bind(this), 3000)
        this.callApi1();

        this.callApi2();

        this.callApi3();

    }


    render() {

        const {params} = this.props.match;
        //cosole.log(this.props.match);
        
        var Chapter = this.state.TwitchChapter;
        var Data = this.state.TwitchData;

        const x=[];
        const y=[];
        for (var i in Data){
            x.push(Data[i].title)
            y.push(Data[i].name)
        }

        const list=[];
        for (var i in Chapter){
        
            list.push(Chapter[i].chaptername)
        }


        const chapterList = list.map(
            
            (name, index) => (<button key={index} class="ChapterButton" value= {name} onClick={this.handleChange} > {name} </button>)
        )
        
        return (
            <html>
                <Header></Header>
              
                <div id="twitchVideo">
                    <iframe src={`https://player.twitch.tv/?video=${params.value}&parent=127.0.0.1&&autoplay=false`}
                    allowfullscreen="true" 
                    scrolling="no" 
                    height="378" 
                    width="620"
                    ></iframe>
                </div>
                <div id="videoInfo">
                    <table id="twitchVideoInfo">
                        <thead>
                            <tr>
                                <th width="300">Title</th>
                                <th width="180">Streamer</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {x}
                                </td>
                                <td>
                                    {y}
                                </td>
                            </tr>
                        </tbody>
                    </table>
          
                </div>

                <div id="chapter">
                    
                    <form action="/highlightresult" method="POST" onSubmit={this.handleSubmit}>
                    
                        {chapterList}
                    </form>
                    
         
                </div>

            </html>
        );
    }
}

  export default SelectChapter;