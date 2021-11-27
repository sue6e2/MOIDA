import React, { useState } from 'react';
import './Bar.css'
import moidaLogo from '../../res/img/logo.png';
import DefaultProfileImg from '../DefaultProfileImg/DefaultProfileImg';
import Data from '../../Data';
import axios from 'axios';
import icon_signOut from '../../res/img/icon-logout.png';
import icon_search from '../../res/img/icon-search.png';
import CryptoJS from 'crypto-js';

const TopBar = () => {

  const [challengeName, setchallengeName] = useState('');

    const signOut = () => {
        sessionStorage.clear();
        window.location.href = "/SignIn";
    }

    const onClickButton = async () => {

      try{
        const response = await axios.get(
          "http://localhost:5001/challengeSearch",
          {
            headers:{},
            params : { name : challengeName }
          });

          if(response.data.code ==0){
            console.log("검색됨");
            
            let searchData = response.data.rows;
            sessionStorage.setItem("searchData", CryptoJS.AES.encrypt(JSON.stringify(searchData), 'search key').toString());
            console.log(searchData);
            window.location.href = "/ChallengeSearch";
          }
      }catch(error){
        console.log(error);
      }
  }

  const onKeyPress = (e) =>{
    if(e.key == 'Enter'){
      onClickButton();
    }
  }

  const onChangeChallenge = (e) => {
    setchallengeName(e.target.value);
    console.log(challengeName);
  }

    const userData = Data.getUserData();
    return (
        <div className="TopBar">
            <button onClick={() => { window.location.href = "/Main" }} >
                <img className="MoidaLogo" src={moidaLogo}></img>
            </button>
            <input
                className="TopBarSearchInput"
                placeholder="챌린지 검색"
                onKeyPress={onKeyPress}
                onChange={(e) => {onChangeChallenge(e)}}
            />
            <img className="SearchIcon" src={icon_search} onClick={() =>{onClickButton()}}></img>
            <div className="TopBarProfileIcon" >
                <DefaultProfileImg
                    id={userData.realId}
                    name={userData.accountName}
                    width={56}
                    height={56}
                    margin={"0"}
                    textMargin={"0"}
                    lineHeight={2.7}
                />
            </div>
            <div className="TopBarLogOutIcon" onClick={() => signOut()}>
                <img src={icon_signOut}></img>
            </div>
        </div>)

}

export default TopBar;