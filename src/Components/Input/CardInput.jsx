import React, { useState } from "react";
import "./CardInput.css";

const CardInput = (props) => {
  const [inputValue,setInputValue] = useState()
  const { label } = props;
  // const onInputChangeHandler=(e)=>{
  //   if(props.type==="radio"){
  //     props.onGet({...props.data,[props.name]:props.label})
  //     return
  //   }
  //   if(props.type==="checkbox" && e.target.checked===false){
  //     delete props.data[props.label]
  //     return
  //   }
  //   props.onGet({...props.data,[label]:e.target.checked})
  // }
  return (
    <div >
      <div className="inputTag">
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.label}
        value={props.label}
        onChange={props.onChange}
        name={props.name}
        // checked={props.data[props.label]}
      />
      <label className={props.class} htmlFor={props.label}>
        {props.label}
      </label>
      </div>
      {props.errors && props.errors.Relationship && props.touched[props.name] && props.label==="Bachelor/Family" && <small>{props.errors.Relationship}</small>}
      {props.errors && props.errors.Furnished &&  props.touched[props.name] && props.label==="No-Furnished" && <small>{props.errors.Furnished}</small>}
    </div>
  );
};

export default CardInput;
