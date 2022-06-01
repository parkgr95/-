import React, { Component } from 'react';
import Header from '../layout/Header';

class Search extends Component {
    constructor(props) {
		super(props);
		this.state = {
            value: '',

		};
		
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCrawling = this.handleCrawling.bind(this);

	}
    

	handleChange(event){
		this.setState({value: event.target.value});
	}
	
	handleSubmit(event) {

        event.preventDefault();
        this.props.history.push('/selectchapter'+'/'+this.state.value)
   

    }

    // callApi = () => {

    //     fetch('http://127.0.0.1:8000/api/crawling/' + this.state.value)
          
    //     .then(res => res.json())

    // }

    handleCrawling(event) {

        //this.callApi();



    }

    render() {
      
        return (
            <html>
                <Header></Header>
                <header>
                    <h1 id= "servicename">트위치 하이라이트 추출</h1>
                    <h4 id= "servicedsc"> 원하는 트위치 생방송 영상의 하이라이트를 추출해보세요! </h4>
                </header>

                <form action="/selectchapter" method="POST" onSubmit={this.handleSubmit}>
                    <input type="text" name="url" id="urlform" placeholder="원하는 트위치 영상의 id를 입력하세요" value={this.state.value} onChange={this.handleChange}/>
                    <button type ="submit" id="submit" onClick={this.handleCrawling}> 검색 </button>
                </form>
               
                <div id="searchdsc">
                    <br></br>
                    <h6> 원하는 영상의 url이 https://www.twitch.tv/videos/803793497 인 경우 </h6>
                    <h6> 803793497 을 입력해주세요 </h6>
                </div>
            </html>
        );
    }
}

  export default Search;