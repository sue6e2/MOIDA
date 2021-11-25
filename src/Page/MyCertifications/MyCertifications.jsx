import { Component } from "react";
import TopBar from "../../Components/Bar/Bar";
import Data from "../../Data";
import axios from "axios";

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

    render() {
        return (
            <div className="MyCertificationsPage">
                <TopBar />
                <div className="MyCertificationsContent">
                    <p>개인 인증내역</p>
                </div>
            </div>
        )
    }
}

export default MyCertificationsPage;