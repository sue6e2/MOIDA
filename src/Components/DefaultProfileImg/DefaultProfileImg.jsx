const DefaultProfileImg = (props) => {

    const colorList = ["#8DF6E5", "#FECFF3", "#FEFCC9", "#A1EAFB", "#CDBDFE", "#FF999A", "#03D99D", "#076DF3", "#F2E206", "#FF7BA2"];
    let username = String(props.name);
    let userId = props.id;
    let usercolor = colorList[userId % colorList.length];
    let name = username.substr(1, 3);
    return (
        <div className="UserBackground" style={{ backgroundColor: usercolor, width: props.width, height: props.height, borderRadius: "75px", margin: props.margin }}>
            <p className="UserName" style={{ color: "white", textAlign: "center", lineHeight: props.lineHeight, fontFamily: "Roboto", margin: props.textMargin }}>{name}</p>
        </div>
    )
}

export default DefaultProfileImg;