import React from "react";
import CardInput from "../Input/CardInput";
import './ExtraThings.css'

const ExtraThings = (props) => {
  
  return (
    <div className="extraThingsContainer">
      {props.checkBoxDetails.map((CBdetail,i) => (
        <CardInput 
          type={CBdetail.type}
          label={CBdetail.label}
          name={CBdetail.name}
          class={CBdetail.class}
          onGet={props.onGet}
          data={props.data}
          key={i}
        />
      ))}
    </div>
  );
};

export default ExtraThings;
