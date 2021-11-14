import { Component } from "react";
import './CongratulationPage.css';
import CryptoJS from "crypto-js";

class CongratulationPage extends Component {

    render() {
        let encryptedName = sessionStorage.getItem('greetingName');
        let bytes = CryptoJS.AES.decrypt(encryptedName, 'greeting key');
        let name = bytes.toString(CryptoJS.enc.Utf8)
        return (
            <div className="CongratulationPage">
                <h1>MOIDA</h1>
                <p>{name}님 환영합니다!</p>
                <div style={{ width: "510px", margin: "56px auto 0 auto" }}>
                    <button className="BtGoToService">서비스 바로 이용하기</button>
                </div>

            </div>
        )
    }
}

export default CongratulationPage;