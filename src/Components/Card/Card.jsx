import "./Card.css";
import icon_members from '../../res/img/icon-members.svg';
import rabbit from '../../res/img/rabbit.jpg';

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
                <div className="ChallengeRateGraph"><span style={{ width: `${Math.floor(props.rate)}%` }} /></div>
                <p className="ChallengeRate">{Math.floor(props.rate)}%</p>
            </div>
        </div>
    )
}

const PopularityCard = (props) => {
    return (
        <div className="PopularityCard">
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
    return (
        <div className="CertificationCard">
            <div className="CertificationImgSection">
                <img src={props.img}></img>
            </div>
            <div className="CertificationInfoSection">
                <h1 className="CertificationTitle">{props.title}</h1>
                <p className="CertificationDescription">{props.description}</p>
                <div style={{ display: "flex" }}>
                    <div className="UserProfile">홍주</div>
                    <p className="CertificationDate">{dateStr.replace(/-/g, ".")}</p>
                </div>
            </div>
            <div className="CertificationBlameSection">
                <button onClick={() => { props.blameClicked() }}>신고</button>
            </div>
        </div>
    )
}

export { ChallengeCard, PopularityCard, CertificationCard };
