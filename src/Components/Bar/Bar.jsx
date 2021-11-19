import './Bar.css'
import settingIcon from '../../res/img/ic-setting.png';
import moidaLogo from '../../res/img/logo.png';

const TopBar = () => {

    return (
        <div className="TopBar">
            <button onClick={() => { window.location.href = "/Main" }} >
                <img className="MoidaLogo" src={moidaLogo}></img>
            </button>
            <input
                className="TopBarSearchInput"
                placeholder="챌린지 검색"
            />
            <img className="TopBarProfileIcon" src={settingIcon}></img>
        </div>)

}

export default TopBar;