import { Component } from "react";
import './SignIn.css'
import axios from "axios";
import GoogleLogin from 'react-google-login';
import CryptoJS from "crypto-js";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            name: ""
        };
    }

    onChangeEmail = (e) => {
        this.setState({
            id: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    responseGoogle = (res) => {
        sessionStorage.setItem('googleId', res.profileObj.email);
        sessionStorage.setItem('googleName', res.profileObj.name);
        this.gooleLogin2(res.profileObj.email, res.profileObj.name);
    }

    gooleLogin2 = async (id, name) => {

        const response = await axios.post("signIn/googleLogin",
            {
                headers: {
                },
                params: { user_id: id, user_name: name }
            })
        console.log(response);
        if (response.data.code == 0) {
            sessionStorage.setItem("accountRealId", response.data.accountRealId);
            sessionStorage.setItem("accountName", response.data.accountName);
            sessionStorage.setItem("userData", CryptoJS.AES.encrypt(JSON.stringify(response.data.data), 'signIn key').toString());
            window.location.href = "/Main"
        } else if (response.data.code == 101) {
            window.location.href = '/SignUp';
        } else if (response.data.code == 102) {
            window.location.href = '/SignUp';
        }

    }

    responseFail = (err) => {
        console.log(err);
    }

    callApi = async () => {
        const response = await axios.post("/signIn",
            {
                headers: {
                },
                params: { user_id: this.state.id, user_pw: this.state.password }
            })
        console.log(response);
        if (response.data.code == 0) {
            sessionStorage.setItem("accountRealId", response.data.accountRealId);
            sessionStorage.setItem("accountName", response.data.accountName);
            sessionStorage.setItem("userData", CryptoJS.AES.encrypt(JSON.stringify(response.data.data), 'signIn key').toString());
            window.location.href = "/Main"
        } else if (response.data.code == 101) {
            alert("입력하신 ID가 존재하지 않습니다")
        } else if (response.data.code == 102) {
            alert("비밀번호가 일치하지 않습니다.")
        }
    }

    render() {
        return (
            <>
                <div className="container_">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
                    <meta name="google-signin-scope" content="profile email"></meta>
                    <meta name="google-signin-client_id" content="639146971200-k5eu0kv67g03gbv05saum2b2ecafglhm.apps.googleusercontent.com"></meta>
                    <div className="SignIn">
                        <div className="frmSignIn"  >
                            <div className="content">
                                <h1 className="text-center my-4">MOIDA</h1>
                                <div className="d-grid gap-2">
                                    <GoogleLogin
                                        className="justify-content-center fs-6"
                                        clientId="639146971200-k5eu0kv67g03gbv05saum2b2ecafglhm.apps.googleusercontent.com"
                                        buttonText="Google로 로그인하기"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseFail}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                    <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                                </div>
                                <div className="my-4">
                                    <div className="hr-sect">또는</div>
                                </div>
                                <div className="input-group mt-1 mb-3">
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="이메일을 입력하세요."
                                        required
                                        onChange={this.onChangeEmail} />
                                </div>
                                <div className="input-group mt-1 mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        placeholder="비밀번호를 입력하세요."
                                        onChange={this.onChangePassword} />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="bt btn-main my-3" onClick={() => { this.callApi(); }}>로그인</button>
                                </div>
                                <p>계정이 없으신가요? <button type="button" className="btn-a" onClick={() => { window.location.href = "/SignUp" }}>회원가입</button></p>
                            </div>
                        </div>
                    </div>
                    <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
                </div>
            </>

        );
    }
}

export default SignIn;