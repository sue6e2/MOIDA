import { Component } from "react";
import './SignIn.css'
import google_login from '/Users/sue6e2/MOIDA/src/res/img/login_google.png';
import axios from "axios";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        };
    }

    onChangeEmail = (e) => {
        this.setState({
            id : e.target.value
        })
        console.log(this.state.email);
    }

    onChangePassword = (e) => {
        this.setState({
            name : e.target.value
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
        // const response = await Axios.get("http://localhost:5001/SignUp",
        // {
        //     headers: {
        //     },
        //     params: { account_id: values.id, password: this.state.passwordEntered, userName: this.state.usernameEntered, token: values.token }
        // })
    }

    render() {
        return (
            <div className = "container_">
            <div className = "SignIn">
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                    <meta name = "google-signin-client_id" content = "639146971200-k5eu0kv67g03gbv05saum2b2ecafglhm.apps.googleusercontent.com"></meta>
                </head>
                <form className = "frmSignIn" name = "signin" method = "post" onSubmit = {this.callApi()} >
                    <div className = "content">
                    <h1 className = "text-center my-4">MOIDA</h1>
                    <div className = "d-grid gap-2">
                        <button type="button" className="g-signin2 btn btn-light my-2" onClick="onSignIn()">
                            <img src = {google_login} alt = "google logo" width = "20px" />
                            <span className = "m-3">Google로 로그인하기</span>
                        </button>
                    </div>
                    <div className = "my-4">
                        <div className = "hr-sect">또는</div>
                    </div>
                    <div class="input-group mt-1 mb-3">
                        <input
                            type="text"
                            name = "email"
                            class="form-control"
                            placeholder = "이메일을 입력하세요."
                            required
                            onChange = {this.onChangeEmail} />
                    </div>
                    <div class="input-group mt-1 mb-3">
                        <input
                            type="password"
                            class="form-control"
                            required
                            placeholder = "비밀번호를 입력하세요."
                            onChange = {this.onChangePassword} />
                    </div>
                    <div className = "d-grid gap-2">
                        <button className = "bt btn-main my-3" type = "submit">로그인</button>
                    </div>
                    <p>계정이 없으신가요? <button type = "button" className = "btn-a" onClick = "">회원가입</button></p>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default SignIn;