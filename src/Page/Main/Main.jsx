import React, { Component } from 'react';
import TopBar from '../../Components/Bar/Bar';
import './Main.css';
import ChallengeCard from '../../Components/Card/Card';
import {PopularityCard} from '../../Components/Card/Card';
import axios from 'axios';
import Data from '../../Data';
import PopUp from '../../Components/Popup/Popup';
import rabbit from '../../res/img/rabbit.jpg';
import icon_camera from '../../res/img/icon-camera.svg';
import icon_close from '../../res/img/icon-close.svg';
import icon_plus from '../../res/img/icon-plus.svg';
import icon_next from '../../res/img/icon-next.svg';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenPopup: false,
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
            popularityData : [],
        }

        if (this.state.myChallengeData.length == 0) {
            this.getChallengeData();
        }

        if(this.state.popularityData.length == 0){
            this.getPopularityData();
        }
    }

    userData = Data.getUserData();
    userRealId = sessionStorage.getItem('accountRealId');
    //madeGroupId = sessionStorage.getItem('group_id');

    getChallengeData = async () => {
        try {
            let response = await axios.get("http://localhost:5001/myGroupList",
                {
                    headers: {
                    },
                    params: { account_id: this.userRealId, }

                }
            );
            console.log(response);
            if (response.data.length != 0) {
                this.setState({
                    myChallengeData: response.data.rows
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    openPopup = () => {
        this.setState({
            isOpenPopup: true,
        })
    }
    closePopup = () => {
        this.setState({
            isOpenPopup: false,
        })
    }

    handleFileChange = (e) => {
        e.preventDefault();
        let files = e.target.files;
        this.setState({
            file: files[0],
            fileName: e.target.value
        })
        this.readImage(e.target);
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

    handleValueChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleBadgeInput = (e) => {
        var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

        if (special_pattern.test(e.target.value) == true) {

        } else {
            this.setState({
                newChallengeBadge: e.target.value,
                isBadgeValidate: true
            })
        }

    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.isBadgeValidate == true) {
            this.makeChallenge();
        } else if (this.state.isBadgeValidate == false) {
            alert("칭호에 특수문자는 불가능합니다.")
        }

    }

    makeChallenge = async () => {
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.newChallengeName);
        formData.append('description', this.state.newChallengeDescription);
        formData.append('startDate', this.state.newChallengeStartDate);
        formData.append('endDate', this.state.newChallengeEndDate);
        formData.append('badge', this.state.newChallengeBadge);
        try {
            let response = await axios(
                {
                    method: 'post',
                    url: 'http://localhost:5001/makeGroup',
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    params: {
                        master_id: this.userData.accountId,
                        status: this.state.newChallengeVisibility,
                        master_realid: this.userRealId
                    },
                }
            );
            console.log(response);
            if (response.data.code == 0) {
                sessionStorage.setItem("group_id", response.data.data.group_id);
                this.insertGroupMember();

            }
        } catch (error) {
            console.log(error);
        }
    }

    insertGroupMember = async () => {
        let madeGroupId = sessionStorage.getItem('group_id');
        try {
            let response = await axios.post("http://localhost:5001/groupMember/inviteMember",
                {
                    headers: {
                    },
                    params: { master_realid: this.userRealId, group_id: madeGroupId }
                }
            );
            console.log(response);
            if (response.data.length != 0) {
                this.closePopup();
                location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    getPopularityData = async () => {
        try {
            let response = await axios.get("http://localhost:5001/myGroupList/popularity");
            console.log(response);
            if (response.data.code == 0) {
                this.setState({
                    popularityData: response.data.rows
                })
                console.log(this.state.popularityData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    getDday = async () => {
        var today = new Date();

    }

    render() {
        return (
            <div className="MainPage">
                <TopBar />
                <div className="MyChallenge">
                    <h1>참여중인 챌린지</h1>
                    <div style={{ display: "flex" }}>
                        {
                            this.state.myChallengeData.map((current, index) => {
                                return (
                                    <ChallengeCard
                                        name={current.name}
                                        memberCount={current.member_count}
                                        image={current.image}
                                        startDate={current.startDate}
                                        endDate={current.endDate}
                                        rate={current.rate}
                                    />
                                )
                            })
                        }
                        <div
                            className={this.state.hide ? "MakeChallengeBtHide" : "MakeChallengeBt"}
                            onMouseEnter={() => { this.setState({ hide: false }) }}
                            onMouseLeave={() => { this.setState({ hide: true }) }}
                            onClick={() => { this.openPopup() }}>
                            <img src={icon_plus}></img>
                        </div>
                        <img src={icon_next} className="MyChallengeNextBt"></img>
                    </div>
                </div>
                <div className="PopularChallenge">
                    <h1>인기 챌린지</h1>
                    {
                        this.state.popularityData.map((current, index) => {
                            var today = new Date();
                            var dday = new Date(current.startDate);

                            var gap = dday.getTime() - today.getTime();
                            var result = Math.ceil(gap / ( 1000 * 60 * 60 * 24 ));
                            
                            console.log(result);
                            return (
                                <PopularityCard
                                    popularityName={current.name}
                                    dDay = {result}
                                />
                            )
                        })
                    }
                </div>

                <PopUp
                    isOpen={this.state.isOpenPopup}
                    width={1000}
                    height={850}>
                    <div className="MakeChallengePopUp">
                        <form encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                            <img className="CloseBt" src={icon_close} onClick={() => { this.closePopup() }} />
                            <h1 className="Title">챌린지 생성</h1>
                            <img id="preview-Image" src={rabbit} className="ChallengeImage" alt="챌린지 이미지"></img>
                            <label for="input-file" className="ChallengeImgUpload">이미지 업로드<img src={icon_camera} /></label>
                            <input style={{ display: "none" }} id="input-file" type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                            <div className="VisibilitySection">
                                <label className="VisibilityTitle">공개 유무: </label>
                                <select className="VisibilitySelectBox" id="cars" name="newChallengeVisibility" onChange={(e) => { this.setState({ newChallengeVisibility: e.target.value }) }}>
                                    <option value="0">public </option>
                                    <option value="1">private </option>
                                </select>
                            </div>
                            <div className="NameSection">
                                <label className="NameTitle">챌린지 이름: </label>
                                <input required className="NameInput" type="text" name="newChallengeName" onChange={this.handleValueChange} />
                            </div>
                            <div className="DateSection">
                                <label className="DateTitle">챌린지 기한: </label>
                                <input required className="DateInput" type="date" title="" name="newChallengeStartDate" onChange={this.handleValueChange} />
                                <p>~</p>
                                <input required className="DateInput" type="date" title="" name="newChallengeEndDate" onChange={this.handleValueChange} />
                            </div>
                            <div className="BadgeSection">
                                <label className="BadgeTitle">칭호: </label>
                                <input required className="BadgeInput" type="text" maxLength={10} name="newChallengeBadge" onChange={this.handleBadgeInput} />
                            </div>
                            <p className="BadgeRule">※특수문자 제외, 10자 제한</p>
                            <div className="DescriptionSection">
                                <label className="DescriptionTitle">챌린지 소개: </label>
                                <input required className="DescriptionInput" type="text" name="newChallengeDescription" onChange={this.handleValueChange} />
                            </div>
                            <button className="SubmitBt" type="submit">생성하기</button>
                        </form>
                    </div>
                </PopUp >
            </div >
        );
    }
}

export default Main;