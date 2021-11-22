import "./Card.css";
import icon_members from '../../res/img/icon-members.svg';

const ChallengeCard = (props) => {
    let end = new Date(props.endDate);
    let start = new Date(props.startDate);
    var gap = end.getTime() - start.getTime();
    var result = Math.floor(gap / (1000 * 60 * 60 * 24));

    return (
        <div className="ChallengeCard">
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
                <div className="ChallengeRateGraph"><span style={{ width: `${props.rate}%` }} /></div>
                <p className="ChallengeRate">{props.rate}%</p>
            </div>

        </div >
    )
}

const PopularityCard = (props) =>{
    // var today = new Date();
    // var dday = new Date({props.dDay})
    // var dday = today -d day;
    return (
        <div className = "PopularityCard" style = {{ backgroundColor : "pink" }}>
            <div className = "ImageBox" >
                <p className = "Dday">챌린지 시작까지 D-{props.dDay}</p>
            </div>
            <div className = "PopularityTitle">{props.popularityName}</div>
        </div>
    )
}

export {ChallengeCard, PopularityCard};

