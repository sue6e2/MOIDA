import { Component } from 'react';
import TopBar from '../../Components/Bar/Bar';
import './Challenge.css';
import Data from '../../Data';
import {PopUp} from '../../Components/Popup/Popup';
import icon_camera from '../../res/img/icon-camera.svg';
import icon_close from '../../res/img/icon-close.svg';
import preview_image from '../../res/img/no-image.jpg';
import axios from 'axios';
import { Chart } from 'chart.js';
import DoughnutChart from '../../Components/DoughnutChart/DoughnutChart';
import icon_member from '../../res/img/icon-memberCount.png';
import icon_description from '../../res/img/icon-description.png';
import icon_date from '../../res/img/icon-date.png';
import icon_badge from '../../res/img/icon-crown.png';

class ChallengePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmPopUpOpen: false,
            confirmTitle: "",
            confirmDescription: "",
            confirmDate: new Date(),
            file: null,
            fileName: "",
            cannotGetBadge: false,
            isBadgePopUpOpen: false,
            isLeavePopUpOpen: false,
            isDeletePopUpOpen: false
        }
        this.checkBadgeValidation();
    }
    userData = Data.getUserData();
    challengeData = Data.getChallengeData();

    endDate = new Date(this.challengeData.endDate);
    startDate = new Date(this.challengeData.startDate);
    gap = this.endDate.getTime() - this.startDate.getTime();
    result = Math.floor(this.gap / (1000 * 60 * 60 * 24));
    start = this.challengeData.startDate.toString();
    end = this.challengeData.endDate.toString();
    startDStr = this.start.substring(0, 10);
    endDStr = this.end.substring(0, 10);


    checkBadgeValidation = async () => {
        try {
            let response = await axios.get("http://localhost:5001/groupMember/validation2",
                {
                    headers: {
                    },
                    params: {
                        group_id: this.challengeData.group_id,
                        user_realid: this.userData.realId,
                    }

                }
            );
            console.log(response);
            if (response.data.rows[0].validation2 == 1) {
                this.setState({
                    cannotGetBadge: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    openConfirmPopUp = () => {
        this.setState({
            isConfirmPopUpOpen: true,
        })
    }
    closeConfirmPopUp = () => {
        this.setState({
            isConfirmPopUpOpen: false,
        })
    }

    openBadgePopUp = () => {
        this.setState({
            isBadgePopUpOpen: true,
        })
    }

    closeBadgePopUp = () => {
        this.setState({
            isBadgePopUpOpen: false,
        })
        location.reload();
    }

    openLeavePopUp = () => {
        this.setState({
            isLeavePopUpOpen: true,
        })
    }

    closeLeavePopUp = () => {
        this.setState({
            isLeavePopUpOpen: false,
        })
        window.location.href = "/Main"
    }

    openDeletePopUp = () => {
        this.setState({
            isDeletePopUpOpen: true,
        })
    }

    closeDeletePopUp = () => {
        this.setState({
            isDeletePopUpOpen: false,
        })
        window.location.href = "/Main"
    }

    handleConfirmFileChange = (e) => {
        e.preventDefault();
        let files = e.target.files;
        this.setState({
            file: files[0],
            fileName: e.target.value
        })
        this.readConfirmImage(e.target);
    }

    readConfirmImage(input) {
        if (input.files && input.files[0]) {

            const reader = new FileReader()
            reader.onload = e => {
                const previewImage = document.getElementById("preview-confirmimage");
                previewImage.src = e.target.result
            }
            reader.readAsDataURL(input.files[0])
        }
    }

    onChangeConfirmValue = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleConfirmFormSubmit = (e) => {
        e.preventDefault();
        this.makeConfirmation();
    }

    makeConfirmation = async () => {
        const formData = new FormData();
        formData.append('group_id', this.challengeData.group_id);
        formData.append('user_realid', this.userData.realId);
        formData.append('title', this.state.confirmTitle);
        formData.append('description', this.state.confirmDescription)
        formData.append('photo', this.state.file);
        formData.append('date', this.state.confirmDate);


        try {
            let response = await axios(
                {
                    method: 'post',
                    url: 'http://localhost:5001/challengeMain/certification',
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                }
            );
            console.log(response);
            if (response.data.code == 0) {
                this.closeConfirmPopUp();
                location.reload();
            }

        } catch (error) {
            console.log(error);
        }
    }

    goToOtherCertifications = () => {
        location.href = "/Challenge/" + this.challengeData.name + "/Certifications";
    }

    goToMyCertifications = () => {
        location.href = "/Challenge/" + this.challengeData.name + "/MyCertifications";
    }

    getBadgeHandler = async () => {
        try {
            let response = await axios.post("http://localhost:5001/groupMember/getBadge",
                {
                    headers: {
                    },
                    params: {
                        group_id: this.challengeData.group_id,
                        user_realid: this.userData.realId,
                    }

                }
            );
            console.log(response);
            if (response.data.code == 0) {
                this.setState({
                    isBadgePopUpOpen: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteChallenge = async () => {
        try {
            let response = await axios.delete("http://localhost:5001/makeGroup/deleteChallenge",
                {
                    headers: {
                    },
                    params: {
                        group_id: this.challengeData.group_id,
                        master_id: this.challengeData.master_id
                    }

                }
            );
            console.log(response);
            if (response.data.code == 0) {
                this.setState({
                    isDeletePopUpOpen: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    leaveChallenge = async () => {
        try {
            let response = await axios.delete("http://localhost:5001/groupMember/leave",
                {
                    headers: {
                    },
                    params: {
                        group_id: this.challengeData.group_id,
                        user_realid: this.userData.realId
                    }

                }
            );
            console.log(response);
            if (response.data.code == 0) {
                this.setState({
                    isLeavePopUpOpen: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    today = new Date();
    year = this.today.getFullYear();
    month = this.today.getMonth() + 1;
    date = this.today.getDate();

    render() {
        console.log(this.challengeData);
        console.log(this.userData);
        return (
            <div className="ChallengePage">
                <TopBar />
                <div className="ChallengeContents">
                    <div className="ChallengeTitleSection">
                        <h1>{this.challengeData.name}</h1>
                        <button className="ShowAllConfirmBt" onClick={() => { this.goToOtherCertifications() }}>인증 보러가기</button>
                        <button className="ConfirmBt" onClick={() => { this.openConfirmPopUp() }}>인증하기</button>
                    </div>
                    <div className="ChallengeInfoSection">
                        <div className="ChallengeInfoTop">
                            <img src={icon_description} /><p>{this.challengeData.description}</p>
                            <img src={icon_member} /><p>참가자 : {this.challengeData.member_count}명</p>
                            <button onClick={() => { this.userData.accountId == this.challengeData.master_id ? this.deleteChallenge() : this.leaveChallenge() }} className="DeleteChallenge">{this.userData.accountId == this.challengeData.master_id ? "삭제" : "탈퇴"}</button>
                        </div>
                        <div className="ChallengeInfoBottom">
                            <img src={icon_badge} />
                            <div style={{ display: "flex", width: "773px" }}>
                                <p className="BadgeTitle">성공 시 &lt;{this.challengeData.badge}&gt;</p>
                                <button disabled={this.challengeData.my_rate < 100 || this.state.cannotGetBadge == true} className="GetBadge" onClick={() => { this.getBadgeHandler() }}>칭호 받기</button>
                            </div>

                            <img src={icon_date} /><p>기간 : {this.startDStr.replace(/-/g, ".")} ~ {this.endDStr.replace(/-/g, ".")}</p>
                            <h2>D-{this.result}</h2>
                        </div>

                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="MyAchievementSection" onClick={() => { this.goToMyCertifications() }}>
                            <p className="Title">나의 성취도</p>
                            <div className="ChartSection">
                                <DoughnutChart
                                    myRate={Math.floor(this.challengeData.my_rate)}
                                />
                            </div>
                        </div>
                        <div className="AllAchievementSection">
                            <p className="Title">모두의 성취도</p>
                        </div>
                    </div>

                </div>

                <PopUp
                    isOpen={this.state.isConfirmPopUpOpen}
                    width={1000}
                    height={800}
                >
                    <div className="ConfirmPopUp">
                        <form encType="multipart/form-data" onSubmit={this.handleConfirmFormSubmit}>
                            <img className="ConfirmCloseBt" src={icon_close} onClick={() => { this.closeConfirmPopUp() }} />
                            <h1 className="Title">내인증</h1>
                            <img id="preview-confirmimage" src={preview_image} className="ConfirmImage" alt="인증이미지"></img>
                            <label for="confirm-input-file" className="ConfirmImgUpload">이미지 업로드<img src={icon_camera} /></label>
                            <input style={{ display: "none" }} id="confirm-input-file" type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleConfirmFileChange} />
                            <div className="ConfirmTitleSection">
                                <label className="ConfirmTitle">인증 제목: </label>
                                <input required className="ConfirmTitleInput" type="text" name="confirmTitle" onChange={this.onChangeConfirmValue} />
                            </div>
                            <div className="ConfirmDescriptionSection">
                                <label className="ConfirmDescriptionTitle">인증 설명: </label>
                                <textarea required className="ConfirmDescriptionTextArea" type="text" name="confirmDescription" onChange={this.onChangeConfirmValue} />
                            </div>
                            <div className="ConfirmDateSection">
                                <label className="ConfirmDateTitle">인증 날짜: </label>
                                <input className="ConfirmDateInput" type="text" value={this.year + '.' + this.month + '.' + this.date} readOnly />
                            </div>

                            <button className="SubmitConfirmBt" type="submit">생성하기</button>
                        </form>
                    </div>
                </PopUp>

                <PopUp
                    isOpen={this.state.isBadgePopUpOpen}
                    width={400}
                    height={200}
                >
                    <div className="BadgePopUp">
                        <img className="BadgePopUpCloseBt" src={icon_close} onClick={() => { this.closeBadgePopUp() }} />
                        <h1>칭호를 얻었습니다!</h1>
                    </div>
                </PopUp>

                <PopUp
                    isOpen={this.state.isLeavePopUpOpen}
                    width={500}
                    height={200}
                >
                    <div className="LeavePopUp">
                        <img className="LeavePopUpCloseBt" src={icon_close} onClick={() => { this.closeLeavePopUp() }} />
                        <h1>챌린지를 탈퇴했습니다!</h1>
                    </div>
                </PopUp>

                <PopUp
                    isOpen={this.state.isDeletePopUpOpen}
                    width={500}
                    height={200}
                >
                    <div className="DeletePopUp">
                        <img className="DeletePopUpCloseBt" src={icon_close} onClick={() => { this.closeDeletePopUp() }} />
                        <h1>챌린지를 삭제하였습니다!</h1>
                    </div>
                </PopUp>

            </div>
        );
    }
}

export default ChallengePage;