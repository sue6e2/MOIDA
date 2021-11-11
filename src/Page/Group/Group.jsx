import axios from 'axios';
import { Component } from 'react';
import './Group.css';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteID: ""
        }
    }
    onClickButton = async () => {
        await axios.get("http://localhost:5001/groupMember").then((res) => console.log(res.data.test))
    }

    inviteMember = () => {
    }

    leaveGroup = () => {

    }

    onChangeInviteID = (e) => {
        this.setState({
            inviteID: e.target.value
        })
    }

    render() {

        return (
            <div className="GroupPage">
                그룹을 클릭했을 때 나오는 페이지
                <button onClick={() => { this.onClickButton() }}>api시험</button>
                <input onChange={(e) => { this.onChangeInviteID(e) }} placeholder="초대하려는 id를 입력해주세요"></input>
                <button onClick={() => { this.inviteMember() }}>초대하기</button>
                <button onClick={() => { this.leaveGroup() }}>탈퇴하기</button>
            </div>
        );
    }
}

export default GroupPage;