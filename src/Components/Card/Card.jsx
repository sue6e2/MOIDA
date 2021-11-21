import "./Card.css";
import rabbit from '../../res/img/rabbit.jpg';
import icon_members from '../../res/img/icon-members.svg';

const ChallengeCard = (props) => {
    return (
        <div className="ChallengeCard">
            <div style={{ height: "177px", position: "relative" }}>
                <img className="ChallengeImage" src={rabbit} ></img>
                <div className="MemberCountSection">
                    <img className="MemberImg" src={icon_members}></img>
                    <p className="MemberCount">9명</p>
                </div>
            </div>
            <div className="ChallengeDate">챌린지 종료까지 D-10</div>
            <p className="ChallengeName">하루에 하나씩 사진 보정 챌린지</p>
            <div style={{ display: "flex" }}>
                <div className="ChallengeRateGraph"><span /></div>
                <p className="ChallengeRate">45%</p>
            </div>

        </div>
    )
}

export default ChallengeCard;