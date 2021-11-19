import axios from 'axios';
import { Component } from 'react';
import './ChallengeSearch.css';

class ChallengeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeName: "",
          challenge:[]
        }
    }

    onClickButton = async () => {
        console.log("버튼 클릭");
        console.log(this.state.challengeName);
        const response = await axios.get("http://localhost:5001/challengeSearch",
        {
          headers:{},
          params : { name : this.state.challengeName }
        })

        this.setState({
          challenge: response.data.rows
      })

        var arr = response.data.rows;
        for (var i = 0; i < arr.length; i++) {
          console.log(arr[i]);
      }  
      console.log(this.state.challenge)
        
    }



    onKeyPress = (e) =>{
      if(e.key == 'Enter'){
        this.onClickButton();
      }
    }

    onChangeChallenge = (e) => {
        this.setState({
            challengeName: e.target.value
        })
        
    }

    renderResult = () => {
      console.log(this.state.challenge[0])
      
      for (var step = 0; step < this.state.challenge.length; step++) {
        return(
          <div>{this.state.challenge[step].name}</div>
        );
      }
    }

    render() {

        return (
          <>
            <div className="ChallengeSearch">
                챌린지 검색 페이지
                  <input
                    placeholder = "챌린지 검색"
                    type="text"
                    onKeyPress = {this.onKeyPress}
                    onChange={(e) => { this.onChangeChallenge(e) }} />
                <button onClick={() => { this.onClickButton() }}>검색하기</button>
                {this.renderResult()}
            </div>
            </>
        );
    }
}

export default ChallengeSearch;