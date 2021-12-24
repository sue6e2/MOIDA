import { Component } from 'react';
import './LandingPage.css';
import logo from '../../res/img/logo.png';
import GifPlayer from "react-gif-player";
import GifOne from "../../res/img/landingPage1.gif";
import GifTwo from "../../res/img/landingpage2.gif";

class LandingPage extends Component {
    render() {
        return (
            <div className='container'>
            <div className="LandingPage">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
                <div className="LandingPageTop">
                    <img src={logo} alt="로고" />
                    <p className="SignInBt" onClick={() => { window.location.href = "/SignIn" }}>로그인</p>
                    <button className="SignUpBt" onClick={() => { window.location.href = "/SignUp" }}>시작하기</button>
                </div>
                <div className="VideoOne">
                    <GifPlayer autoplay={true} gif={GifOne} ></GifPlayer>
                </div>
                <button className="StartBt" onClick={() => { window.location.href = "/SignUp" }}>시작하기</button>
                <div className="VideoTwo">
                    <GifPlayer autoplay={true} gif={GifTwo} ></GifPlayer>
                </div>
            </div>
            </div>
        );
    }
}

export default LandingPage;