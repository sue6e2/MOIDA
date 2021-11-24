import { Component } from 'react';
import TopBar from '../../Components/Bar/Bar';
import './Challenge.css';
import Data from '../../Data';
import PopUp from '../../Components/Popup/Popup';
import icon_camera from '../../res/img/icon-camera.svg';
import icon_close from '../../res/img/icon-close.svg';
import preview_image from '../../res/img/no-image.jpg';
import axios from 'axios';

class ChallengePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmPopUpOpen: false,
            confirmTitle: "",
            confirmDescription: "",
            confirmDate: new Date(),
            file: null,
            fileName: ""
        }
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

        } catch (error) {
            console.log(error);
        }
    }


    today = new Date();
    year = this.today.getFullYear();
    month = this.today.getMonth() + 1;
    date = this.today.getDate();

    render() {
        return (
            <div className="ChallengePage">
                <TopBar />
                <div className="ChallengeContents">
                    <div className="ChallengeTitleSection">
                        <h1>{this.challengeData.name}</h1>
                        <button className="ShowAllConfirmBt">인증 보러가기</button>
                        <button className="ConfirmBt" onClick={() => { this.openConfirmPopUp() }}>인증하기</button>
                    </div>
                    <div className="ChallengeInfoSection">
                        <div className="ChallengeInfoTop">
                            <p>{this.challengeData.description}</p>
                            <p>참가자 : {this.challengeData.member_count}명</p>
                        </div>
                        <div className="ChallengeInfoBottom">
                            <p>성공시 &lt;{this.challengeData.badge}&gt;</p>
                            <p>기간 : {this.startDStr.replace(/-/g, ".")}~{this.endDStr.replace(/-/g, ".")}</p>
                            <h2>D-{this.result}</h2>
                        </div>

                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="MyAchievementSection">
                            <p className="Title">나의 성취도</p>
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

            </div>
        );
    }
}

export default ChallengePage;