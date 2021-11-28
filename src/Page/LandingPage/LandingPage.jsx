import { Component } from 'react';
import './LandingPage.css';
import logo from '../../res/img/logo.png';
import GifPlayer from "react-gif-player";
import Pengsu from "../../res/img/instagram.gif";

class LandingPage extends Component {
    render() {
        return (
            <div className="LandingPage">
                <div className="LandingPageTop">
                    <img src={logo} alt="로고" />
                    <p className="SignInBt" onClick={() => { window.location.href = "/SignIn" }}>로그인</p>
                    <button className="SignUpBt" onClick={() => { window.location.href = "/SignUp" }}>시작하기</button>
                </div>

                <div className="VideoOne">
                    <GifPlayer autoplay={true} gif={Pengsu} ></GifPlayer>
                </div>
                <button className="StartBt">시작하기</button>
                <div className="VideoTwo">
                    <GifPlayer autoplay={true} gif={Pengsu} ></GifPlayer>
                </div>
            </div>
        );
    }
}

export default LandingPage;