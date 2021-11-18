import { Component } from "react";
import './SignIn.css'
import google_login from '../../res/img/login_google.png';
import axios from "axios";
import CryptoJS from "crypto-js";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: ""
        };
    }

    onChangeEmail = (e) => {
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

    //구글로 로그인 관련
    // onSignIn = () =>{
    //     var auth2 = gapi.auth2.getAuthInstance()
    //     if(auth2.isSignedIn.get()){
    //         var profile = 
    //             auth2.currentUser.get().getBasicProfile();
    //             gooleLoginPro(profile)
    //     }
    // }

    callApi = async () => {
        const response = await axios.post("http://localhost:5001/signIn",
            {
                headers: {
                },
                params: { user_id: this.state.id, user_pw: this.state.password }
            })
        console.log(response);
        if (response.data.code == 0) {
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
            <div className="container_">
                <div className="SignIn">
                    <head>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                        <meta name="google-signin-client_id" content="639146971200-k5eu0kv67g03gbv05saum2b2ecafglhm.apps.googleusercontent.com"></meta>
                    </head>
                    <div className="frmSignIn"  >
                        <div className="content">
                            <h1 className="text-center my-4">MOIDA</h1>
                            <div className="d-grid gap-2">
                                <button type="button" className="g-signin2 btn btn-light my-2" onClick="onSignIn()">
                                    <img src={google_login} alt="google logo" width="20px" />
                                    <span className="m-3">Google로 로그인하기</span>
                                </button>
                            </div>
                            <div className="my-4">
                                <div className="hr-sect">또는</div>
                            </div>
                            <div class="input-group mt-1 mb-3">
                                <input
                                    type="text"
                                    name="email"
                                    class="form-control"
                                    placeholder="이메일을 입력하세요."
                                    required
                                    onChange={this.onChangeEmail} />
                            </div>
                            <div class="input-group mt-1 mb-3">
                                <input
                                    type="password"
                                    class="form-control"
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
            </div>
        );
    }
}

export default SignIn;