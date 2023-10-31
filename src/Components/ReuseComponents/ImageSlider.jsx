import React from "react";
import { Slide,Fade,Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ImageSlider = (props) => {
    const divStyles={
        display:'flex',
        backgroundSize:'cover',
        width: "45vw",
        height: "60vh",
        borderRadius:"20px"
       
    }

  return (
    <div className="slide-container" style={{width: "45vw",
    height: "60vh",}}>
      <Zoom>
        {props.slideImages.map((slideImage,index)=>
            <div key={index}  style={{width:"100%",height:"100%"}}>
                <div style={{...divStyles,backgroundImage:`url(${slideImage})`}}></div>
            </div>
        )}
      </Zoom>
    </div>
  );
};

export default ImageSlider;
