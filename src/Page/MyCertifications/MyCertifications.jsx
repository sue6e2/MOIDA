import { Component } from "react";
import TopBar from "../../Components/Bar/Bar";
import Data from "../../Data";
import axios from "axios";
import './MyCertifications.css';
import { MyCertificationCard } from "../../Components/Card/Card";

class MyCertificationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myCertificationData: [],
            certificatedData: 0
        }

        if (this.state.myCertificationData.length == 0) {
            this.getMyCertificationData();
        }
    }
    userData = Data.getUserData();
    challengeData = Data.getChallengeData();

    getMyCertificationData = async () => {
        try {
            let response = await axios.get("/challengeMain/mine",
                {
                    headers: {
                    },
                    params: { group_id: this.challengeData.group_id, user_realid: this.userData.realId }

                }
            );
            console.log(response);
            if (response.data.code == 0) {
                this.setState({
                    myCertificationData: response.data.rows
                })
                this.countCertification();
            }
        } catch (error) {
            console.log(error);
        }
    }

    goBackToChallenge = () => {
        location.href = "/Challenge/" + this.challengeData.name;
    }

    countCertification = () => {
        let count = 0;
        const data = this.state.myCertificationData
        for (let i = 0; i < data.length; i++) {
            if (data[i].validation === '0') {
                count++;
            }
        }
        this.setState({
            certificatedData: count
        })
    }


    render() {
        return (
            <div className="MyCertificationsPage">
                <TopBar />
                <div className="MyCertificationsContent">
                    <div className="InfoSection">
                        <h1>{this.challengeData.name}</h1>
                        <button onClick={() => { this.goBackToChallenge() }} className="GoBackToChallenge" >챌린지로</button>
                    </div>
                    <div className="RateSection">
                        <div className="MyChallengeRateGraph">
                            <span style={{ width: `${Math.floor(this.challengeData.my_rate)}%` }} ><p>{Math.floor(this.challengeData.my_rate) + "%"}</p></span>
                        </div>
                    </div>
                    <div className="ChallengeCountSection">
                        <p>전체 챌린지 : {this.state.myCertificationData.length}회   |   인증된 챌린지 : {this.state.certificatedData}회</p>
                    </div>
                    <div className="MyCertificationsSection">
                        {
                            this.state.myCertificationData.map((current, index) => {
                                return (
                                    <MyCertificationCard
                                        img={current.photo}
                                        title={current.title}
                                        description={current.description}
                                        date={current.date}
                                        lineHeight={1}
                                        validation={current.validation}
                                        blameCount={current.blame_count}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCertificationsPage;