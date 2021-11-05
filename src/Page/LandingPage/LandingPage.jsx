import { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
        return (
            <div className="LandingPage">
                <p>랜딩페이지를 만드는 곳입니다</p>
                <button onClick={() => { window.location.href = "/SignIn" }}>로그인</button>
            </div>
        );
    }
}

export default LandingPage;