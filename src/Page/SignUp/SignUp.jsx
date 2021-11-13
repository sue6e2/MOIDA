import { Component } from "react";
import './SignUp.css'
import axios from "axios";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            passwordCheck: "",
            name: ""
        };
    }

    onChangeID = (e) => {
        this.setState({
            id: e.target.value
        })
        console.log(this.state.id);
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password);
    }

    onChangePasswordCheck = (e) => {
        this.setState({
            passwordCheck: e.target.value
        })
        console.log(this.state.passwordCheck);
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
        console.log(this.state.name);
    }

    callApi = async () => {
        // const response = await Axios.get("http://localhost:5001/SignUp",
        // {
        //     headers: {
        //     },
        //     params: { account_id: values.id, password: this.state.passwordEntered, userName: this.state.usernameEntered, token: values.token }
        // })
    }

    render() {
        return (
            <div className="SignUp">
                <form className="frmSignUp" name="signup" method="post" onSubmit={this.callApi()} >
                    <h1>MOIDA</h1>
                    <span>아이디</span>
                    <input
                        name="id"
                        required
                        onChange={this.onChangeID} />
                    <br />
                    <span>비밀번호</span>
                    <input
                        name="password"
                        required
                        onChange={this.onChangePassword} />
                    <br />
                    <span>비밀번호 확인</span>
                    <input
                        name="passwordCheck"
                        required
                        onChange={this.onChangePasswordCheck} />
                    <span id="correct">비밀번호가 일치합니다.</span>
                    <span id="incorrect">비밀번호가 일치하지 않습니다.</span>
                    <br />
                    <span>이름</span>
                    <input
                        name="name"
                        required
                        onChange={this.onChangeName} />
                    <br />
                    <button className="btn" type="submit">가입하기</button>
                    <p>이미 계정이 있으신가요? <a href="#">로그인</a></p>
                </form>

            </div>
        );
    }
}

export default SignUp;