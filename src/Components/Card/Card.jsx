import "./Card.css";

const GroupCard = (props) => {
    return (
        <div className="GroupCard">
            <div className="GroupColor" style={{ backgroundColor: "green" }}></div>
            <div className="GroupName" style={{ backgroundColor: "#BDECB6" }}>
                <p className="GroupNameTitle">{props.groupName}</p>
            </div>
        </div>
    )
}

export default GroupCard;