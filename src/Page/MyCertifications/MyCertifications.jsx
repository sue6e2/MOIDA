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
            myCertificationData: []
        }

        if (this.state.myCertificationData.length == 0) {
            this.getMyCertificationData();
        }
    }
    userData = Data.getUserData();
    challengeData = Data.getChallengeData();

    getMyCertificationData = async () => {
        try {
            let response = await axios.get("http://localhost:5001/challengeMain/mine",
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
            }
        } catch (error) {
            console.log(error);
        }
    }

    goBackToChallenge = () => {
        location.href = "/Challenge/" + this.challengeData.name;
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

                    </div>
                    <div className="ChallengeCount">

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