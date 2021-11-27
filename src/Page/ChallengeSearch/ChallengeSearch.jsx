import axios from 'axios';
import { Component } from 'react';
import { SearchResultCard } from '../../Components/Card/Card';
import TopBar from '../../Components/Bar/Bar';
import './ChallengeSearch.css';
import CryptoJS from 'crypto-js';

class ChallengeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          challengeName: "",
          challenge:[]
        }
    }

    getSearchData = () => {
      if (sessionStorage.getItem("searchData") != null) {
          const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem('searchData'), 'search key');
          let searchData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          console.log(searchData);
          return searchData
      }
      else {
          return null
      }
  }

    render() {
      let renderData = this.getSearchData();
        return (
          <>
            <div className="ResultPage">
              <TopBar />
              <div className="ChallengeResult">
                <h1>검색결과</h1>
                {
                  renderData.length != 0?
                  <div>
                  {
                    renderData.map((current, index) =>{
                      return(
                        <SearchResultCard
                        key = {current.index}
                        title = {current.name}
                        description = {current.description}
                        img = {current.image}
                        startDate={current.startDate}
                        endDate={current.endDate}
                        memberCount = {current.member_count}
                        badge = {current.badge}
                        />
                      )
                    })
                  }
                  </div>
                  :
                  <div>일치하는 검색 결과가 없습니다.</div>
                }
              </div>
                {/* {this.renderResult()} */}
            </div>
            </>
        );
    }
}

export default ChallengeSearch;