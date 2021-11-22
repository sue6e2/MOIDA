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

export {GroupCard, PopularityCard};