import React, { Component } from 'react';
import '../../Page/MakeGroup/MakeGroupPopup.css';
import TopBar from '../../Components/Bar/Bar';
import './Main.css';
import GroupCard from '../../Components/Card/Card';
import axios from 'axios';
import Data from '../../Data';
import PopUp from '../../Components/Popup/Popup';

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
        }

        if (this.state.myChallengeData.length == 0) {
            this.getChallengeData();
        }
    }

    userData = Data.getUserData();
    userRealId = sessionStorage.getItem('accountRealId');

    getChallengeData = async () => {
        try {
            let response = await axios.get("http://localhost:5001/myGroupList",
                {
                    headers: {
                    },
                    params: { account_id: this.userRealId }
                    
                }
            );
            console.log(response);
            if (response.data.length != 0) {
                this.setState({
                    myChallengeData: response.data
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
    }

    handleValueChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.makeChallenge();
    }

    makeChallenge = async () => {
        console.log(this.state.file);
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.newChallengeName);
        formData.append('description', this.state.newChallengeDescription);
        formData.append('startDate', new Date(this.state.newChallengeStartDate));
        formData.append('endDate', new Date(this.state.newChallengeEndDate));
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
                    },

                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        return (
            <div className="MainPage">
                <TopBar />
                <div className="MyChallenge">
                    <h1>참여중인 챌린지</h1>
                    {/* {
                        this.state.myChallengeData.map((current, index) => {
                            return (
                                <GroupCard
                                    groupName={current.name}
                                />
                            )
                        })
                    } */}
                    <div
                        className={this.state.hide ? "MakeChallengeBtHide" : "MakeChallengeBt"}
                        onMouseEnter={() => { this.setState({ hide: false }) }}
                        onMouseLeave={() => { this.setState({ hide: true }) }}
                        onClick={() => { this.openPopup() }}>
                        <p>+</p>
                    </div>
                </div>
                <div className="PoPularChallenge">
                    <h1>인기 챌린지</h1>
                </div>

                <PopUp
                    isOpen={this.state.isOpenPopup}
                    width={800}
                    height={600}>
                    <div className="MakeChallengePopUp">
                        <form encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                            <h1>챌린지 생성하기</h1>
                            <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                            <label>챌린지 이름:<input type="text" name="newChallengeName" onChange={this.handleValueChange} /></label>
                            <label>챌린지 소개:<input type="text" name="newChallengeDescription" onChange={this.handleValueChange} /></label>
                            <label>챌린지 기한(시작): <input type="text" name="newChallengeStartDate" onChange={this.handleValueChange} /></label>
                            <label>챌린지 기한(끝): <input type="text" name="newChallengeEndDate" onChange={this.handleValueChange} /></label>
                            <label>칭호명: <input type="text" name="newChallengeBadge" onChange={this.handleValueChange} /></label>
                            <label>
                                <input type="radio" name="newChallengeVisibility" value={0} onChange={(e) => { this.setState({ newChallengeVisibility: e.target.value }) }} />
                                public
                            </label>
                            <label>
                                <input type="radio" name="newChallengeVisibility" value={1} onChange={(e) => { this.setState({ newChallengeVisibility: e.target.value }) }} />
                                private
                            </label>
                            <button type="submit">생성하기</button>
                        </form>
                    </div>
                </PopUp>
            </div>
        );
    }
}

export default Main;