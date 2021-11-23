import './Bar.css'
import settingIcon from '../../res/img/ic-setting.png';
import moidaLogo from '../../res/img/logo.png';

const TopBar = () => {

    const signOut = () => {
        sessionStorage.clear();
        window.location.href = "/SignIn";
    }
    return (
        <div className="TopBar">
            <button onClick={() => { window.location.href = "/Main" }} >
                <img className="MoidaLogo" src={moidaLogo}></img>
            </button>
            <input
                className="TopBarSearchInput"
                placeholder="챌린지 검색"
            />
            <img className="TopBarProfileIcon" onClick={() => signOut()} src={settingIcon}></img>
        </div>)

}

export default TopBar;