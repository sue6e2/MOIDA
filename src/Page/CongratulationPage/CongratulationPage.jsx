import { Component } from "react";
import './CongratulationPage.css';

class CongratulationPage extends Component {
    render() {
        return (
            <div className="CongratulationPage">
                <h1>MOIDA</h1>
                <p>님 환영합니다!</p>
                <div style={{ width: "510px", margin: "56px auto 0 auto" }}>
                    <button className="BtGoToService">서비스 바로 이용하기</button>
                </div>

            </div>
        )
    }
}

export default CongratulationPage;