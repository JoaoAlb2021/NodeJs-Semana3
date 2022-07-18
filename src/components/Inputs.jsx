import React from "react";


const Inputs = (props) => {
    return (
        <div className="inputs-users">
            <input type="text" name={props.name} placeholder={props.placeholder} value={props.value}/>
            <br/>
        </div>
        )
}

export default Inputs