import React, { Component } from 'react';
import TopBar from '../../Components/Bar/Bar';
import './MyPage.css';
import { MyChallengeCard } from '../../Components/Card/Card';
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
            myBadgeData: [],
            myChallengeData: []
        }

        this.getMyData();
    }

    userData = Data.getUserData();

    getMyData = async (index) => {
        try {
            let response = await axios(
                {
                    method: 'get',
                    url: 'http://localhost:5001/mypage',
                    headers: {
                    },
                    params: {
                        user_realid: this.userData.realId,
                    },
                }
            );
            if (response.data.code == 0) {
                this.setState({
                    myBadgeData: response.data.rows[0],
                    myChallengeData: response.data.rows[1]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const userData = Data.getUserData();
        return (
            <div className="MyPage">
                <TopBar />
                <div className="MyPageSection">
                    <div className="MyPageSection1">
                        <div className="MyInfo">
                            <h1>내정보</h1>
                            <div style={{ width: "102px", margin: "auto" }}>
                                <DefaultProfileImg
                                    className="DefaultPRofileImg"
                                    id={userData.realId}
                                    name={userData.accountName}
                                    width={102}
                                    height={102}
                                    margin={"0"}
                                    textMargin={"0"}
                                    lineHeight={3.1}
                                    fontSize={35}
                                />
                            </div>
                            <p className="NameLabel">이름</p>
                            <p className="Name">{userData.accountName}</p>
                            <div style={{ paddingTop: "20px" }}>
                                <h1>칭호 모아보기</h1>
                                {
                                    this.state.myBadgeData.map((current, index) => {
                                        return (
                                            <div style={{ display: "flex" }}>
                                                <p className="GroupName">{current.group_name}</p>
                                                <p className="BadgeName">&lt; {current.badge_name} &gt;</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="MyChallenge" style={{ marginLeft: "20px", width: "1300px" }}>
                        <h1>챌린지 모아보기</h1>
                        <div style={{ float: "left" }}>
                            {
                                this.state.myChallengeData.map((current, index) => {
                                    return (
                                        <div style={{ float: "left", margin: "10px 20px 0px 20px" }}>
                                            <MyChallengeCard
                                                key={index}
                                                name={current.name}
                                                image={current.image}
                                                startDate={current.startDate}
                                                endDate={current.endDate}
                                                myRate={current.my_rate}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default MyPage;