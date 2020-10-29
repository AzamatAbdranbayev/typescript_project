import React from "react";

interface ButtonSubmitProps {
    clicked():void
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = (props) => {
    return (
        <button onClick={props.clicked}>Submit</button>
    )
}
export default ButtonSubmit;