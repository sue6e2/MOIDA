import axios from 'axios';
import { Component } from 'react';
import { SearchResultCard } from '../../Components/Card/Card';
import TopBar from '../../Components/Bar/Bar';
import './ChallengeSearch.css';

class ChallengeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeName: "",
          challenge:[]
        }

        if (this.state.challenge.length == 0) {
          this.renderResult();
      }
    }

    renderResult = async () => {
      try{
        let response = await axios.get("http://localhost:5001/challengeSearch",
          {
            headers: {
            },
            params: {name : this.state.challengeName}
            }
            );
        if(response.data.code == 0){
          this.setState({
            challenge : response.data.rows
          })
          console.log(challenge);
        }
      }catch(error){
        console.log(error);
      }
    }

    render() {

        return (
          <>
            <div className="ResultPage">
              <TopBar />
              <div className="ChallengeResult">
                <h1>검색결과</h1>
                <SearchResultCard />
              </div>
                {/* {this.renderResult()} */}
            </div>
            </>
        );
    }
}

export default ChallengeSearch;