const PopUp = (props) => {
    return props.isOpen ?
        <div style={{ backgroundColor: "rgba(238,238,238,0.4)", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
            <div style={{ backgroundColor: "white", width: props.width, height: props.height, position: "fixed", top: 0, right: 0, bottom: 0, left: 0, margin: "auto" }}>
                {props.children}
            </div>
        </div>
        : null;


}

export default PopUp;