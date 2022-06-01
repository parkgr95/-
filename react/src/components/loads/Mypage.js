import React, { Component } from 'react';
import Header from '../layout/Header';
class Mypage extends Component {

    state={
        boards:[
            {
                brdNo:1,
                thumbnail: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQx6vI8jn2SosGlwruGX7TFDECxc05aGXRNKw&usqp=CAU" alt="1"></img>,
                brdtitle: "일요일 입니다",
                brddate: new Date()
            },
            {
                brdNo:2,
                thumbnail: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkdYquv9WY9oB70TU4K_g6FB2deWBmqrCTZg&usqp=CAU" alt="2"></img>,
                brdtitle: "방송킴",
                brddate: new Date()
            }

        ]
    }
    render() {
        const { boards } = this.state;
        const list = boards.map(function(row){
            return row.brdNo + row.brdtitle;
        });

        return (
            <html>
                <Header></Header>
                
                <body>
                    <div id="MyInfo"> 
                        <h3> 내 정보 </h3>
                        <br></br>
                        <h3 id="MyId"> 아이디 : ict2020</h3>
                        <h3 id="MyName"> 이름: 수비즈 </h3>
                    </div>

                    <div id="MyAnalysis">
                        <h3> 분석기록  </h3>
                        <table border="3">
                            <tbody>
                                <tr align="center">
                                    <td> No. </td>
                                    <td> Thumbnail. </td>
                                    <td> Title. </td>
                                    <td> Date </td>
        
                                </tr>
                                {
                                    boards.map(row => 
                                        (<BoardItem key={row.brdno} row={row} />)
                                    )
                                }
                            </tbody>
                        </table> 
                    </div>

                </body>               
            </html>
        );
    }
}

class BoardItem extends React.Component { 
    render() { 
        return( 
            <tr> 
                <td width="50">{this.props.row.brdNo}</td> 
                <td width="200">{this.props.row.thumbnail}</td> 
                <td width="300">{this.props.row.brdtitle}</td> 
                <td width="150">{this.props.row.brddate.toLocaleDateString('ko-KR')}</td> 
            </tr> 
        ); 
    } 
}
        



  export default Mypage;
  