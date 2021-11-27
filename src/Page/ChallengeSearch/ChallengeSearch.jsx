import axios from 'axios';
import { Component } from 'react';
import { SearchResultCard } from '../../Components/Card/Card';
import TopBar from '../../Components/Bar/Bar';
import icon_close from '../../res/img/icon-close.svg';
import Data from '../../Data';
import './ChallengeSearch.css';
import CryptoJS from 'crypto-js';
import { PopUp } from '../../Components/Popup/Popup';

class ChallengeSearch extends Component {
  constructor(props) {
    super(props);
    const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem('searchData'), 'search key');
    let searchData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    this.state = {
      challengeData: searchData,
      isSearchApplyPopUpOpen: false,
    }
  }

  userData = Data.getUserData();

  applyChallenge = async (index) => {
    try {
      let response = await axios(
        {
          method: 'post',
          url: 'http://localhost:5001/groupMember/inviteApplyMember',
          headers: {
          },
          params: {
            master_realid: this.userData.realId,
            group_id: this.state.challengeData[index].group_id
          },
        }
      );
      console.log(response);
      if (response.data.code == 0) {
        this.setState({
          isSearchApplyPopUpOpen: true
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  searchApplyPopupClose = () => {
    this.setState({
      isSearchApplyPopUpOpen: false
    })
    window.location.href = "/Main";
  }

  render() {
    return (
      <>
        <div className="ResultPage">
          <TopBar />
          <div className="ChallengeResult">
            <h1>검색결과</h1>
            {
              this.state.challengeData.length != 0 ?
                <div>
                  {
                    this.state.challengeData.map((current, index) => {
                      return (
                        <SearchResultCard
                          key={current.index}
                          title={current.name}
                          description={current.description}
                          img={current.image}
                          startDate={current.startDate}
                          endDate={current.endDate}
                          memberCount={current.member_count}
                          badge={current.badge}
                          searchApplyClicked={() => { this.applyChallenge(index) }}
                        />
                      )
                    })
                  }
                </div>
                :
                <div>일치하는 검색 결과가 없습니다.</div>
            }
          </div>
          <PopUp
            isOpen={this.state.isSearchApplyPopUpOpen}
            width={500}
            height={200}
          >
            <div className="SearchApplyPopUp">
              <img className="SearchApplyCloseBt" src={icon_close} onClick={() => { this.searchApplyPopupClose() }} />
              <h1>해당 챌린지가 신청되었습니다!</h1>
            </div>
          </PopUp>
        </div>
      </>
    );
  }
}

export default ChallengeSearch;