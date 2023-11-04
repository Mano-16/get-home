import React from "react";

const Input = (props) => {
  const {type,name, value,autoComplete="off",onChange,onBlur="",id,placeholder="", LabelClassName="", htmlFor="", LabelName="",errors="", touched=""} = props;
  return (
    <>
        {LabelName && <label className={LabelClassName} >{LabelName}</label>}
        <input
      type={type}
      autoComplete={autoComplete}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
    />
    {errors && touched && <small>{errors}</small>}
    </>
  );
};

export default Input;
