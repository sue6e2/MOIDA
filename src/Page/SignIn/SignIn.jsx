import { Component } from "react";
import './SignIn.css'
class SignIn extends Component {
    render() {
        return (
            <div className="SignIn">
                <form>
                <table>
                    <tr>
                        <td>ID : </td>
                        <td>
                            <input type = "text" placeholder = "아이디를 입력하세요."></input>
                        </td>
                    </tr>
                    <tr>
                        <td>PW : </td>
                        <td>
                            <input type = "password" placeholder = "비밀번호를 입력하세요"></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan ="2">
                            <button type = "submit">로그인</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan = "2">
                            <a href = "#">아직 회원이 아니신가요?</a>
                        </td>
                    </tr>
                </table>
                </form>
            </div>
        );
    }
}

export default SignIn;