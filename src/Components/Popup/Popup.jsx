import "./Popup.css";
import icon_description from '../../res/img/icon-description.png';
import icon_date from '../../res/img/icon-date.png';
import icon_memberCount from '../../res/img/icon-memberCount.png';
import icon_trophy from '../../res/img/icon-trophy.png';

const PopUp = (props) => {
    return props.isOpen ?
        <div style={{ backgroundColor: "rgba(238,238,238,0.4)", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
            <div style={{ border: "solid 5px #076df3", boxShadow: "0 0 16px 2px rgba(0, 0, 0, 0.25)", backgroundColor: "white", width: props.width, height: props.height, position: "fixed", top: 0, right: 0, bottom: 0, left: 0, margin: "auto" }}>
                {props.children}
            </div>
        </div>
        : null;
}

const PopUpApply = (props) => {
    let dateSt = props.startDate.toString();
    let dateEn = props.endDate.toString();
    let dateStr = dateSt.substring(5, 10);
    let dateEnd = dateEn.substring(5, 10);

    return props.isOpenApply ?

        <div className ="ApplySection" style={{ backgroundColor: "rgba(238,238,238,0.4)", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
            <div style={{ border: "solid 5px #076df3", boxShadow: "0 0 16px 2px rgba(0, 0, 0, 0.25)", backgroundColor: "white", width: props.width, height: props.height, position: "fixed", top: 0, right: 0, bottom: 0, left: 0, margin: "auto" }}>
            {props.children}
            <p className ="ApplyContent">{props.title}</p>
            <div style ={{display : "flex" , marginLeft : "30px", marginRight : "30px" , height: "200px"}}>
                <img src ={props.img} width ="370px" height="194px"/>
                <div className ="InfoBox">
                    <div className ="DescriptionSection">
                        <img src={icon_date} width="40px" height="40ox" />
                        <p className = "IconDes">챌린지 기간</p>
                    </div>
                    <p className ="Content" style={{ textAlign : "right"}}>
                        {dateEnd.replace(/-/g, "/")} ~ {dateStr.replace(/-/g, "/")}
                    </p>
                    <div className ="DescriptionSection">
                        <img src={icon_memberCount} width="40px" height="40ox"/>
                        <p className = "IconDes">현재 신청 인원</p>
                    </div>
                    <p className ="Content" style={{ textAlign : "right"}}>
                        {props.memberCount}명
                    </p>
                </div>
            </div>
            <div>
                <div className ="DescriptionSection">
                    <img src={icon_description} width="40px" height="40ox"/>
                    <p className = "IconDes">챌린지 소개</p>
                </div>
                <p className ="Content" style ={{marginLeft : "30px"}}>{props.description}</p>
            </div>
            <div>
                <div className ="DescriptionSection" style ={{marginTop : "5px"}}>
                    <img src={icon_trophy} width="40px" height="40ox"/>
                    <p className = "IconDes">칭호</p>
                </div>
                <p className ="Content" style ={{marginLeft : "30px"}}>{props.badge}</p>
            </div>
            <button className="ApplyBtn">신청하기</button>
            </div>
        </div>
        :
        null;
}

export { PopUp, PopUpApply };
