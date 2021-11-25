import React, { Component } from 'react';
import TopBar from '../../Components/Bar/Bar';
import './Main.css';
import { ChallengeCard } from '../../Components/Card/Card';
import { PopularityCard } from '../../Components/Card/Card';
import axios from 'axios';
import Data from '../../Data';
import PopUp from '../../Components/Popup/Popup';
import preview_Image from '../../res/img/no-image.jpg'
import icon_camera from '../../res/img/icon-camera.svg';
import icon_close from '../../res/img/icon-close.svg';
import icon_plus from '../../res/img/icon-plus.svg';
import icon_next from '../../res/img/icon-next.png';
import icon_previous from '../../res/img/icon-previous.png';
import CryptoJS from 'crypto-js';

class Main extends Component {
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

        if (this.state.popularityDataBeforeProcessing.length == 0) {
            this.getPopularityData();
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
                    myChallengeTotalPageNum: Math.ceil(response.data.rows.length / 4),
                    isMyPageHandlerOn: true
                })
            } else {
                this.setState({
                    myChallengeTotalPageNum: 1,
                    myDataBeforeProcessing: [],
                    isOpenPopup: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    onClickMyPageHandler = (value) => {
        let num = this.state.myChallengePageNum;
        if (value == true) {
            if (num < this.state.myChallengeTotalPageNum) {
                this.setState({
                    myChallengePageNum: num + 1,
                    isMyPageHandlerOn: true,
                })
            }
        } else {
            if (num != 1) {
                this.setState({
                    myChallengePageNum: num - 1,
                    isMyPageHandlerOn: true
                })
            }
        }
    }

    onClickPopularityPageHandler = (value) => {
        let num = this.state.popularityPageNum;
        if (value == true) {
            if (num < this.state.popularityTotalPageNum) {
                this.setState({
                    popularityPageNum: num + 1,
                    isPopularityHandlerOn: true,
                })
            }
        } else {
            if (num != 1) {
                this.setState({
                    popularityPageNum: num - 1,
                    isPopularityHandlerOn: true
                })
            }
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
            console.log(this.state.file);
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
                        master_realid: this.userData.realId
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
                    params: { master_realid: this.userData.realId, group_id: madeGroupId }
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
        let temp = [];
        try {
            let response = await axios.get("http://localhost:5001/myGroupList/popularity");
            console.log(response);
            if (response.data.rows.length != 0) {
                for (let i = 0; i < response.data.rows.length; i++) {
                    temp.push(response.data.rows[i]);
                }
                this.setState({
                    popularityDataBeforeProcessing: temp,
                    popularityTotalPageNum: Math.ceil(response.data.rows.length / 4),
                    isPopularityHandlerOn: true
                })
            } else {
                this.setState({
                    popularityTotalPageNum: 1,
                    popularityDataBeforeProcessing: []
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    myChallengeCardHandler = (index) => {
        const challengeData = this.state.myChallengeData;
        console.log(index);
        console.log(challengeData[index]);
        sessionStorage.setItem("challengeData", CryptoJS.AES.encrypt(JSON.stringify(challengeData[index]), 'challenge key').toString());
        location.href = "/Challenge/" + challengeData[index].name;
    }

    render() {

        return (
            <div className="MainPage">
                <TopBar />
                <div className="MyChallenge">
                    <h1>참여중인 챌린지</h1>
                    <div style={{ height: "45px", margin: "0 0 10px 0" }}>
                        <button className="MakeBt" onClick={() => { this.openPopup() }}>챌린지 생성하기</button>
                    </div>
                    {
                        this.state.myDataBeforeProcessing.length != 0 ?
                            <div style={{ display: "flex" }}>
                                <img style={this.state.myChallengePageNum == 1 ? { display: "none" } : {}} src={icon_previous} onClick={() => { this.onClickMyPageHandler(false) }} className="MyChallengePreviousBt"></img>
                                {
                                    this.state.myChallengeData.map((current, index) => {
                                        return (
                                            <ChallengeCard
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
                                <div
                                    className={this.state.hide ? "MakeChallengeBtHide" : "MakeChallengeBt"}
                                    onMouseEnter={() => { this.setState({ hide: false }) }}
                                    onMouseLeave={() => { this.setState({ hide: true }) }}
                                    onClick={() => { this.openPopup() }}>
                                    <img src={icon_plus}></img>
                                </div>
                                <img style={this.state.myChallengePageNum == this.state.myChallengeTotalPageNum ? { display: "none" } : {}} src={icon_next} onClick={() => { this.onClickMyPageHandler(true) }} className="MyChallengeNextBt"></img>
                            </div>
                            :
                            <div style={{ height: "285.69px" }}></div>
                    }

                </div>
                <div className="PopularChallenge">
                    <h1>인기 챌린지</h1>
                    <div style={{ display: "flex" }}>
                        <img style={this.state.popularityPageNum == 1 ? { display: "none" } : {}} src={icon_previous} className="PopularityPreviousBt" onClick={() => { this.onClickPopularityPageHandler(false) }}></img>
                        {
                            this.state.popularityData.map((current, index) => {
                                var today = new Date();
                                var dday = new Date(current.startDate);

                                var gap = dday.getTime() - today.getTime();
                                var result = Math.ceil(gap / (1000 * 60 * 60 * 24));

                                return (
                                    <PopularityCard
                                        key={index}
                                        popularityName={current.name}
                                        dDay={result}
                                        image={current.image}
                                        startDate={current.startDate}
                                        endDate={current.endDate}
                                    />
                                )
                            })
                        }
                        <img style={this.state.popularityPageNum == this.state.popularityTotalPageNum ? { display: "none" } : {}} src={icon_next} className="PopularityNextBt" onClick={() => { this.onClickPopularityPageHandler(true) }}></img>
                    </div>
                </div>

                <PopUp
                    isOpen={this.state.isOpenPopup}
                    width={1000}
                    height={850}>
                    <div className="MakeChallengePopUp">
                        <form encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                            <img className="CloseBt" src={icon_close} onClick={() => { this.closePopup() }} />
                            <h1 className="Title">챌린지 생성</h1>
                            <img id="preview-Image" src={preview_Image} className="ChallengeImage" alt="챌린지 이미지"></img>
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
                                <textarea required className="DescriptionInput" type="text" name="newChallengeDescription" onChange={this.handleValueChange} />
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