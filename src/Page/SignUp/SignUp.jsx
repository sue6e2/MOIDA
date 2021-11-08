import { Component } from "react";
import './SignUp.css'
class SignUp extends Component {
    render() {
        return (
            <div className="SignUp">
                <p>회원가입 페이지를 만드는 곳입니다</p>
                <table border = "1">
                    <tr>
                        <td>ID : </td>
                        <td>
                            <input type = "text" placeholder = "아이디를 입력하세요."></input>
                        </td>
                        <td>
                          <button type = "button">중복확인</button>
                        </td>
                    </tr>
                    <tr>
                        <td>PW : </td>
                        <td>
                            <input type = "password" placeholder = "비밀번호를 입력하세요"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>PW Again : </td>
                        <td>
                            <input type = "password" placeholder = "비밀번호를 다시 입력하세요"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>Name : </td>
                        <td>
                            <input type = "text" placeholder = "이름을 입력하세요"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td>
                            <input type = "text" placeholder = "이메일"></input>
                            -
                            <input type = "text" placeholder = "이메일"></input>
                            <select>
                              <option>직접입력</option>
                              <option>naver.com</option>
                              <option>gmail.com</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan ="2">
                            <button type = "submit">가입하기</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan = "2">
                            <a href = "#">아직 회원이 아니신가요?</a>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default SignUp;