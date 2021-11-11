import React, { Component } from 'react';
import PopupDom from '../../Page/MakeGroup/PopupDom';
import MakeGroupPopupContent from '../../Page/MakeGroup/MakeGroupPopup';
import '../../Page/MakeGroup/MakeGroupPopup.css';
import TopBar from '../../Components/Bar/Bar';
import './Main.css';
import GroupCard from '../../Components/Card/Card';
import axios from 'axios';

class Main extends Component {
    constructor(props) {
        super(props); //why?

        this.state = {
            // isOpenPopup: false,
            MyGroupData: []
        }

        if (this.state.MyGroupData.length == 0) {
            this.getGroupData();
        }
        // this.openPopup = this.openPopup.bind(this);
        // this.closePopup = this.closePopup.bind(this);
    }

    getGroupData = async () => {
        try {
            let response;
            response = await axios.get("http://localhost:5001/myGroupList");
            console.log(response);
            if (response.data.length != 0) {
                this.setState({
                    MyGroupData: response.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    // openPopup() {
    //     this.setState({
    //         isOpenPopup: true,
    //     })
    // }
    // closePopup() {
    //     this.setState({
    //         isOpenPopup: false,
    //     })
    // }
    render() {
        return (
            <div className="MainPage">
                <TopBar />
                <div className="TodoListContent">
                    <h1>해야할 일</h1>
                    <hr></hr>
                </div>
                <div className="GroupContent">
                    <h1>모임</h1>
                    <hr></hr>
                    {
                        this.state.MyGroupData.map((current, index) => {
                            return (
                                <GroupCard
                                    groupName={current.name}
                                />
                            )
                        })
                    }

                </div>
                {/* <div>
                    <button type="button" id="popupDom" onClick={this.openPopup}>
                        방 만들기
                    </button>
                    {this.state.isOpenPopup &&
                        <PopupDom>
                            <MakeGroupPopupContent onClose={this.closePopup} />
                        </PopupDom>}
                </div> */}
            </div>
        );
    }
}

export default Main;