import './Bar.css'
import settingIcon from '../../res/img/ic-setting.png';
import moidaLogo from '../../res/img/logo.png';
import { useState } from 'react';

const TopBar = () => {
    const [topBarTab, setTopBarTab] = useState(0);
    const topBarTabClicked = {
        borderBottom: "solid 5px #3682f5"
    }
    return (
        <div className="TopBar">
            <button onClick={() => { setTopBarTab(0) }} style={topBarTab == 0 ? topBarTabClicked : {}}>
                <img className="MoidaLogo" src={moidaLogo}></img>
            </button>
            <button onClick={() => { setTopBarTab(1) }} style={topBarTab == 1 ? topBarTabClicked : {}}>
                <p className="MyToDoList">나의 할 일
                </p>
            </button>
            <img className="TopBarSettingIcon" src={settingIcon}></img>
            <img className="TopBarLogoutIcon" src={settingIcon}></img>
        </div>)

}

export default TopBar;