import { Component } from "react";
import './SignUp.css'
import axios from "axios";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : "",
            password : "",
            passwordCheck : "",
            name : ""
        };
    }

    onChangeID = (e) => {
        this.setState({
            id : e.target.value
        })
        console.log(this.state.id);
    }

    onChangePassword = (e) => {
        this.setState({
            password : e.target.value
        })
        console.log(this.state.password);
    }

    onChangePasswordCheck = (e) => {
        this.setState({
            passwordCheck : e.target.value
        })
        console.log(this.state.passwordCheck);
    }

    onChangeName = (e) => {
        this.setState({
            name : e.target.value
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
            <div className = "container_">
            <div className = "SignUp">
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                </head>
                <form className = "frmSignUp" name = "signup" method = "post" onSubmit = {this.callApi()} >
                    <div className = "content">
                    <h1 className = "text-center my-4">MOIDA</h1>
                    <div className = "text-start">아이디</div>
                    <div class="input-group mt-1 mb-3">
                        <input
                            type="text"
                            class="form-control"
                            required
                            onChange = {this.onChangeID} />
                    </div>
                    <div className = "text-start">비밀번호</div>
                    <div class="input-group mt-1 mb-3">
                        <input
                            type="password"
                            class="form-control"
                            required
                            onChange = {this.onChangePassword} />
                    </div>
                    <div className = "text-start">비밀번호 확인</div>
                    <div class="input-group mt-1 mb-3">
                        <input
                            type="password"
                            class="form-control"
                            required
                            onChange = {this.onChangePasswordCheck} />
                    </div>
                        <span className = "d-none">비밀번호가 일치합니다.</span>
                        <span className = "d-none">비밀번호가 일치하지 않습니다.</span>
                    <div className = "text-start">이름</div>
                    <div class="input-group mt-1 mb-3">
                        <input
                            type="text"
                            class="form-control"
                            required
                            onChange = {this.onChangeName} />
                    </div>
                    <div className = "d-grid gap-2">
                        <button className = "bt btn-main my-3" type = "submit">가입하기</button>
                    </div>
                    <p>이미 계정이 있으신가요? <button type = "button" className = "btn-a" onClick = "">로그인</button></p>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default SignUp;