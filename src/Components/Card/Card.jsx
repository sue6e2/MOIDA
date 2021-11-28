import "./Card.css";
import icon_members from '../../res/img/icon-members.svg';
import icon_description from '../../res/img/icon-description.png';
import icon_date from '../../res/img/icon-date.png';
import icon_memberCount from '../../res/img/icon-memberCount.png';
import icon_trophy from '../../res/img/icon-trophy.png';
import DefaultProfileImg from "../DefaultProfileImg/DefaultProfileImg";
import Data from "../../Data";

const ChallengeCard = (props) => {
    let end = new Date(props.endDate);
    let start = new Date(props.startDate);
    var gap = end.getTime() - start.getTime();
    var result = Math.floor(gap / (1000 * 60 * 60 * 24));

    return (
        <div className="ChallengeCard" onClick={() => { props.cardClicked() }}>
            <div style={{ height: "177px", position: "relative" }}>
                <img id="challenge-image" className="ChallengeImage" src={props.image} ></img>
                <div className="MemberCountSection">
                    <img className="MemberImg" src={icon_members}></img>
                    <p className="MemberCount">{props.memberCount}명</p>
                </div>
            </div>
            <div className="ChallengeDate">챌린지 종료까지 D-{result}</div>
            <p className="ChallengeName">{props.name}</p>
            <div style={{ display: "flex" }}>
                <div className="ChallengeRateGraph"><span style={{ width: `${Math.floor(props.myRate)}%` }} /></div>
                <p className="ChallengeRate">{Math.floor(props.myRate)}%</p>
            </div>
        </div>
    )
}

const PopularityCard = (props) => {
    return (
        <div className="PopularityCard" onClick ={ ()=>{props.cardClicked()} }>
            <div className="ImageSection" style={{ height: "177px", backgroundColor: "balck" }}>
                <img id="popularity-image" className="PopularityImage" src={props.image} ></img>
            </div>
            <div className="Dday">챌린지 시작까지 D-{props.dDay}</div>
            <p className="PopularityTitle">{props.popularityName}</p>
        </div>
    )
}

const CertificationCard = (props) => {
    let date = props.date.toString();
    let dateStr = date.substring(0, 10);
    let userData = Data.getUserData();
    let id = userData.realId;

    return (
        <div className="CertificationCard" style={props.validation == 1 ? { backgroundColor: "#f2f2f2", border: "solid 2px #f2f2f2" } : { backgroundColor: "white", border: "solid 2px #076df3" }}>
            <div className="CertificationImgSection">
                <img src={props.img}></img>
            </div>
            <div className="CertificationInfoSection">
                <h1 className="CertificationTitle">{props.title}</h1>
                <p className="CertificationDescription">{props.description}</p>
                <div style={{ display: "flex" }}>
                    <DefaultProfileImg
                        id={props.userId}
                        name={props.userName}
                        width={50}
                        height={50}
                        margin={"0 0 0 20px"}
                        lineHeight={props.lineHeight}
                    />
                    <p className="CertificationDate">{dateStr.replace(/-/g, ".")}</p>
                </div>
            </div>
            <div className="CertificationBlameSection">
                <button style={id == props.userId ? { display: "none" } : {}} onClick={() => { props.blameClicked() }}>신고</button>
            </div>
        </div>
    )
}

const SearchResultCard = (props) => {
    let dateSt = props.startDate.toString();
    let dateEn = props.endDate.toString();
    let dateStr = dateSt.substring(0, 10);
    let dateEnd = dateEn.substring(0, 10);

    return(
        <div className="SearchResultCard">
            <div className="SearchResultImgSection">
                <img src={props.img} width="320px" height="179px"></img>
            </div>
            <div className="SearchResultInfoSection1">
                <h1 className="SearchResultTitle">{props.title}</h1>
                <div className="SearchResultInfoSection2" style ={{width : "500px"}}>
                    <img className="DescriptionImg" src={icon_description} width="40px" height="40ox"></img>
                    <p className="DescriptionLabel">{props.description}</p>
                </div>
            </div>
            <div>
                <div className="SearchResultInfoSection2">
                    <img className="DescriptionImg" src={icon_date} width="40px" height="40ox"></img>
                    <p className="DescriptionLabel">챌린지 기간</p>
                </div>
                <div className="SearchResultInfoSection2">
                    <img className="DescriptionImg" src={icon_memberCount} width="40px" height="40ox"></img>
                    <p className="DescriptionLabel">현재신청인원</p>
                </div>
                <div className="SearchResultInfoSection2">
                    <img className="DescriptionImg" src={icon_trophy} width="40px" height="40ox"></img>
                    <p className="DescriptionLabel">칭호</p>
                </div>
            </div>
            <div className ="SearchResultInfoSection3">
                <p className="DescriptionContent">{dateStr.replace(/-/g, ".")} ~ {dateEnd.replace(/-/g, ".")}</p>
                <p className="DescriptionContent">{props.memberCount}</p>
                <p className="DescriptionContent">{props.badge}</p>
            </div>
            <button className="ApplyBtn" onClick={()=>{props.searchApplyClicked()}}>신청하기</button>
        </div>
    )
}

const MyChallengeCard = (props) =>{

    let end = new Date(props.endDate);
    let start = new Date(props.startDate);
    var gap = end.getTime() - start.getTime();

    return (
        <div className="MyChallengeCard">
            <div>
                <img id="challenge-image" className="ChallengeImage" src={props.image} ></img>
                <p className="ChallengeName">{props.name}</p>
                <div className="ChallengeRateGraph"><span style={{ width: `${Math.floor(props.myRate)}%` }} /></div>
                <p className="ChallengeRate">{Math.floor(props.myRate)}%</p>
            </div>
        </div>
    )
}

const MyCertificationCard = (props) => {
    let date = props.date.toString();
    let dateStr = date.substring(0, 10);
    let userData = Data.getUserData();

    return (
        <div className="MyCertificationCard" style={props.validation == 1 ? { backgroundColor: "#f2f2f2", border: "solid 2px #f2f2f2" } : { backgroundColor: "white", border: "solid 2px #076df3" }}>
            <div className="MyCertificationImgSection">
                <img src={props.img}></img>
            </div>
            <div className="MyCertificationInfoSection">
                <h1 className="MyCertificationTitle">{props.title}</h1>
                <p className="MyCertificationDescription">{props.description}</p>
                <div style={{ display: "flex" }}>
                    <DefaultProfileImg
                        id={userData.realId}
                        name={userData.accountName}
                        width={50}
                        height={50}
                        margin={"0 0 0 20px"}
                        lineHeight={props.lineHeight}
                    />
                    <p className="MyCertificationDate">{dateStr.replace(/-/g, ".")}</p>
                </div>
            </div>
            <div className="MyCertificationBlameSection">
                <p className="BlameTitle">신고 수</p>
                <p className="BlameCount">{props.blameCount}</p>
            </div>
        </div>
    )
}

export { ChallengeCard, PopularityCard, SearchResultCard, CertificationCard, MyChallengeCard ,MyCertificationCard };
