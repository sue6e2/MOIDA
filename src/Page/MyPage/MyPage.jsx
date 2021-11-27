import React, { Component } from 'react';
import TopBar from '../../Components/Bar/Bar';
import './MyPage.css';
import { ChallengeCard, MyChallengeCard } from '../../Components/Card/Card';
import axios from 'axios';
import Data from '../../Data';
import DefaultProfileImg from '../../Components/DefaultProfileImg/DefaultProfileImg';
import preview_Image from '../../res/img/no-image.jpg'
import icon_camera from '../../res/img/icon-camera.svg';
import icon_close from '../../res/img/icon-close.svg';
import icon_plus from '../../res/img/icon-plus.svg';
import icon_next from '../../res/img/icon-next.png';
import icon_previous from '../../res/img/icon-previous.png';
import CryptoJS from 'crypto-js';

class MyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isOpenPopup: false,
          myDataBeforeProcessing: [],
          popularityDataBeforeProcessing: [],
          myChallengeData: [],
          hide: true,
          newChallengeVisibility: 0,
          newChallengeName: "",
          newChallengeDescription: "",
          file: null,
          fileName: '',
          newChallengeBadge: '',
          newChallengeStartDate: '',
          newChallengeEndDate: '',
          isBadgeValidate: false,
          popularityData: [],
          myChallengePageNum: 1,
          myChallengeTotalPageNum: 1,
          isMyPageHandlerOn: true,
          popularityPageNum: 1,
          popularityTotalPageNum: 1,
          isPopularityHandlerOn: true
        }

        if (this.state.myDataBeforeProcessing.length == 0) {
          this.getChallengeData();
      }
    }

    
    userData = Data.getUserData();

    getChallengeData = async () => {
        let temp = [];
        try {
            let response = await axios.get("http://localhost:5001/myGroupList",
                {
                    headers: {
                    },
                    params: { account_id: this.userData.realId }

                }
            );
            console.log(response);
            if (response.data.rows.length != 0) {
                for (let i = 0; i < response.data.rows.length; i++) {
                    temp.push(response.data.rows[i]);
                }
                this.setState({
                    myDataBeforeProcessing: temp,
                    myChallengeTotalPageNum: Math.ceil(response.data.rows.length / 3),
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    readImage(input) {
      if (input.files && input.files[0]) {

          const reader = new FileReader()
          reader.onload = e => {
              const previewImage = document.getElementById("preview-Image");
              previewImage.src = e.target.result
          }
          reader.readAsDataURL(input.files[0])
      }
  }

  componentDidUpdate() {
    let resetNum = (this.state.myChallengePageNum - 1) * 4;
    let p_resetNum = (this.state.popularityPageNum - 1) * 4;
    if (this.state.isMyPageHandlerOn && this.state.myDataBeforeProcessing != 0) {
        let temp = [];
        if (this.state.myChallengeTotalPageNum == this.state.myChallengePageNum && this.state.myDataBeforeProcessing.length % 4 != 0) {
            for (let i = resetNum; i < resetNum + (this.state.myDataBeforeProcessing.length % 4); i++) {
                temp.push(this.state.myDataBeforeProcessing[i]);
            }
            this.setState({
                isMyPageHandlerOn: false,
                myChallengeData: temp
            })
        } else {
            for (let i = resetNum; i < resetNum + 4; i++) {
                if (this.state.myDataBeforeProcessing[i] == null) {
                    continue;
                }
                temp.push(this.state.myDataBeforeProcessing[i]);
            }
            this.setState({
                isMyPageHandlerOn: false,
                myChallengeData: temp
            })
        }
    } else if (this.state.isPopularityHandlerOn && this.state.popularityDataBeforeProcessing != 0) {
        let temp = [];
        if (this.state.popularityTotalPageNum == this.state.popularityPageNum && this.state.popularityDataBeforeProcessing.length % 4 != 0) {
            for (let i = p_resetNum; i < p_resetNum + (this.state.popularityDataBeforeProcessing.length % 4); i++) {
                temp.push(this.state.popularityDataBeforeProcessing[i]);
            }
            this.setState({
                isPopularityHandlerOn: false,
                popularityData: temp
            })
        } else {
            for (let i = p_resetNum; i < p_resetNum + 4; i++) {
                if (this.state.popularityDataBeforeProcessing[i] == null) {
                    continue;
                }
                temp.push(this.state.popularityDataBeforeProcessing[i]);
            }
            this.setState({
                isPopularityHandlerOn: false,
                popularityData: temp
            })
        }
    }
}


    render() {

      const userData = Data.getUserData();
        return (
            <div className="MyPage">
                <TopBar />
                <div className ="MyPageSection">
                <div>
                  <h1>내정보</h1>
                  <DefaultProfileImg
                    className ="DefaultPRofileImg"
                    id={userData.realId}
                    name={userData.accountName}
                    width={56}
                    height={56}
                    margin={"0"}
                    textMargin={"0"}
                    lineHeight={2.7}
                />
                </div>
                <div>
                  <div className="MyChallenge">
                    <h1>챌린지 모아보기</h1>
                    <div style={{ height: "45px", margin: "0 0 10px 0" }}>
                    </div>
                    {
                        this.state.myDataBeforeProcessing.length != 0 ?
                            <div style={{ display: "flex" }}>
                                {
                                    this.state.myChallengeData.map((current, index) => {
                                        return (
                                            <MyChallengeCard
                                                key={index}
                                                cardClicked={() => { this.myChallengeCardHandler(index) }}
                                                name={current.name}
                                                memberCount={current.member_count}
                                                image={current.image}
                                                startDate={current.startDate}
                                                endDate={current.endDate}
                                                myRate={current.my_rate}
                                            />
                                        )
                                    })
                                }
                            </div>
                            :
                            <div style={{ height: "285.69px" }}></div>
                    }
                </div>
                </div>
                </div>
            </div >
        );
    }
}

export default MyPage;