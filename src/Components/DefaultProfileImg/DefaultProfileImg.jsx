const DefaultProfileImg = (props) => {

    const colorList = ["#ff87a6", "#ffab84", "#97d8ae", "#bcd89c", "#8fd5de", "#91c4ed", "#df9be8", "#b59be8", "#f76388"];
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