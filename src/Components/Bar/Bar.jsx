import './Bar.css'
import moidaLogo from '../../res/img/logo.png';
import DefaultProfileImg from '../DefaultProfileImg/DefaultProfileImg';
import Data from '../../Data';
import setting from '../../res/img/ic-setting.png';

const TopBar = () => {

    const signOut = () => {
        sessionStorage.clear();
        window.location.href = "/SignIn";
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
            />
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
                <img src={setting}></img>
            </div>
        </div>)

}

export default TopBar;