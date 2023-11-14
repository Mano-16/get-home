import React, { useRef, useState } from "react";
import CardInput from "../Input/CardInput";
import "./AddHome.css";
import Select from "react-select";
import ExtraThings from "./ExtraThings";
import Button from "../ReuseComponents/Button";
import { LiaTimesSolid } from "react-icons/lia";
import Home1 from "../../assets/Home.jpg";
import { sendData } from "../../lib/api";
import { useDispatch } from "react-redux";
import { homeSliceActions } from "../../store/homeDataRedux";
import { useFormik } from "formik";
import { AddHomeValidation } from "../Validation";
import Input from "../ReuseComponents/Input";

const AddHomeIntialValues = {
  HomeType: "",
  BHK: "",
  Bathroom: "",
  Per:"",
  HomeName: "",
  OwnerName: "",
  OwnerEmail: "",
  Location: "",
  ContactNumber: "",
  Relationship: "",
  Furnished: "",
  WaterFacility: false,
  Wifi: false,
  Maintenance: false,
  UPS: false,
  BikeAndCarParking: false,
  Security: false,
  SwimmingPool: false,
  Comments: "",
  Lift: "",
  AgeOfRentalPlace: "",
  Address: "",
  HomeImage:"",
  OtherImages:"",
  Rating:"",
  Price:"",
  Advance:"",
  Pincode:""
};

const AddHome = (props) => {
  const dispatch = useDispatch();
  const [AddHomeData, setAddHomeData] = useState({});
  const [file, setFile] = useState();
  const AddHomeHandler = async (values) => {
    sendData(
      "https://rental-ui-89316-default-rtdb.firebaseio.com/PendingApproval/.json",
      values
    ).then((res) => {
      dispatch(homeSliceActions.AddApprovalPendingData(res));
      props.onShow();
    });
  };
  const onFileCheckHandler = (e) => {
    if (e.target.id === "Room") {
      const RoomImages = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const files = e.target.files[i];

        const reader = new FileReader();
        reader.onload = function () {
          RoomImages.push(reader.result);
          setFieldValue("OtherImages",RoomImages)
          //setAddHomeData({ ...AddHomeData, files: RoomImages });
        };
        reader.readAsDataURL(files);
      }
    } else {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        setFieldValue("HomeImage",reader.result)
        setFieldValue("Rating",Math.round((Math.random() * 1.5 + 3.5) * 10) / 10)
        // setAddHomeData({
        //   ...AddHomeData,
        //   HomeImage: reader.result,
        //   Rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
        // });
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: AddHomeIntialValues,
    validationSchema: AddHomeValidation,
    onSubmit: (values) => {
      console.log(values);
      AddHomeHandler(values);
    },
  });

  const HomeType = [
    { value: "Hotel", label: "Hotel" },
    { value: "Apartment", label: "Apartment" },
    { value: "Rental Home", label: "Rental Home" },
    { value: "Resort", label: "Resort" },
  ];
  const BHKs = [
    { value: "1BHK", label: "1BHK" },
    { value: "2BHK", label: "2BHK" },
    { value: "3BHK", label: "3BHK" },
    { value: "More", label: "More" },
  ];
  const BathroomCount = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "More", label: "More" },
  ];
  const per = [
    { value: "Hour", label: "Hour" },
    { value: "Day", label: "Day" },
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" },
  ];

  const checkBoxDetails = [
    { key: 11, type: "radio", label: "Bachelor", name: "Relationship" },
    { key: 12, type: "radio", label: "Family", name: "Relationship" },
    { key: 13, type: "radio", label: "Bachelor/Family", name: "Relationship" },
    { key: 9, type: "radio", label: "Furnished", name: "Furnished" },
    { key: 7, type: "radio", label: "Semi Furnished", name: "Furnished" },
    { key: 8, type: "radio", label: "No-Furnished", name: "Furnished" },
    // { key: 1, type: "checkbox", label: "Refrigerator", name: "Refrigerator" },
    // { key: 2, type: "checkbox", label: "TV", name: "TV" },
    {
      key: 3,
      type: "checkbox",
      label: "Water_Facility",
      name: "WaterFacility",
    },
    { key: 4, type: "checkbox", label: "Wifi", name: "Wifi" },
    { key: 5, type: "checkbox", label: "Maintenance", name: "Maintenance" },
    { key: 6, type: "checkbox", label: "Ups_Service", name: "UPS" },
    {
      key: 10,
      type: "checkbox",
      label: "Bike_Car_Parking",
      name: "BikeAndCarParking",
    },
    { key: 20, type: "checkbox", label: "Gate_Security", name: "Security" },
    {
      key: 21,
      type: "checkbox",
      label: "Swimming_Pool",
      name: "SwimmingPool",
    },
  ];
  const onShowHandler = () => {
    props.onShow();
  };
  const InputElements1 = [
    [
      {
        LabelName: "Home Name",
        htmlFor: "Home Name",
        LabelClassName: "labelBlock",
        type: "text",
        placeholder: "Home Name",
        id: "Home Name",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.HomeName,
        name: "HomeName",
        autoComplete: "off",
        errors: errors.HomeName,
        touched: touched.HomeName,
      },
      {
        LabelName: "Owner Name",
        htmlFor: "Owner Name",
        LabelClassName: "labelBlock",
        type: "text",
        placeholder: "Owner Name",
        id: "Owner Name",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.OwnerName,
        name: "OwnerName",
        autoComplete: "off",
        errors: errors.OwnerName,
        touched: touched.OwnerName,
      },
      {
        LabelName: "Owner Email",
        htmlFor: "Owner Email",
        LabelClassName: "labelBlock",
        type: "email",
        placeholder: "Owner Email",
        id: "Owner Email",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.OwnerEmail,
        name: "OwnerEmail",
        autoComplete: "off",
        errors: errors.OwnerEmail,
        touched: touched.OwnerEmail,
      },
      {
        LabelName: "Location",
        htmlFor: "Location",
        LabelClassName: "labelBlock",
        type: "text",
        placeholder: "Location",
        id: "Location",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.Location,
        name: "Location",
        autoComplete: "off",
        errors: errors.Location,
        touched: touched.Location,
      },
      {
        LabelName: "Contact Number",
        htmlFor: "Contact Number",
        LabelClassName: "labelBlock",
        type: "number",
        placeholder: "Contact Number",
        id: "Contact Number",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.ContactNumber,
        name: "ContactNumber",
        autoComplete: "off",
        errors: errors.ContactNumber,
        touched: touched.ContactNumber,
      },
    ],
    [
      {
        LabelName: "Pincode",
        htmlFor: "Pincode",
        LabelClassName: "labelBlock",
        type: "number",
        placeholder: "Pincode ",
        id: "Pincode",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.Pincode,
        name: "Pincode",
        autoComplete: "off",
        errors: errors.Pincode,
        touched: touched.Pincode,
      },
      {
        LabelName: "Advance $",
        htmlFor: "Advance",
        LabelClassName: "labelBlock",
        type: "number",
        placeholder: "Advance $",
        id: "Advance",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.Advance,
        name: "Advance",
        autoComplete: "off",
        errors: errors.Advance,
        touched: touched.Advance,
      },
      {
        LabelName: "Price $",
        htmlFor: "Price",
        LabelClassName: "labelBlock",
        type: "number",
        placeholder: "Price $",
        id: "Price",
        onChange: handleChange,
        onBlur: handleBlur,
        value: values.Price,
        name: "Price",
        autoComplete: "off",
        errors: errors.Price,
        touched: touched.Price,
      },
    ],
  ];
  return (
    <form className="addHomeForm">
      <h1>Get your customer easily!</h1>
      <span onClick={onShowHandler}>
        <LiaTimesSolid />
      </span>
      <div className="addHomeContainer">
        <div className="HomeType">
          <Select
            placeholder="Home Type"
            className="select"
            name="HomeType"
            type="text"
            id="HomeType"
            // value={values.HomeType}
            onChange={(option) => setFieldValue("HomeType", option.value)}
            onBlur={handleBlur}
            options={HomeType}
          />
          {errors.HomeType && touched.HomeType  && <small>{errors.HomeType}</small>}
        </div>
        <div className="BHk">
          <Select
            placeholder="BHKs"
            className="select"
            name="BHK"
            type="text"
            onChange={(option) => setFieldValue("BHK", option.value)}
            options={BHKs}
          />
          {errors.BHK && touched.BHK && <small>{errors.BHK}</small>}
        </div>

        <div className="Bathroom">
          <Select
            placeholder="Bathroom"
            name="Bathroom"
            type="text"
            className="select"
            onChange={(option) => setFieldValue("Bathroom", option.value)}
            options={BathroomCount}
          />
          {errors.Bathroom && touched.Bathroom && <small>{errors.Bathroom}</small>}
        </div>
        <div className="homeInputFields">
          {InputElements1[0].map((el) => ( 
            <div key={el.id}>
              <Input
                LabelName={el.LabelName}
                htmlFor={el.htmlFor}
                LabelClassName={el.LabelClassName}
                type={el.type}
                placeholder={el.placeholder}
                id={el.id}
                onChange={el.onChange}
                onBlur={el.onBlur}
                value={el.value}
                name={el.name}
                autoComplete={el.autoComplete}
                errors={el.errors}
                touched={el.touched}
              />
            </div>
          ))}
        </div>
        <div className="homeInputFields2">
          {InputElements1[1].map((el) => (
            <div key={el.id}>
              <Input
                LabelName={el.LabelName}
                htmlFor={el.htmlFor}
                LabelClassName={el.LabelClassName}
                type={el.type}
                placeholder={el.placeholder}
                id={el.id}
                onChange={el.onChange}
                onBlur={el.onBlur}
                value={el.value}
                touched={el.touched}
                name={el.name}
                autoComplete={el.autoComplete}
                errors={el.errors}
              />
            </div>
          ))}
          <div>
            <Select
              className="select"
              placeholder="Per"
              options={per}
              name="Per"
              onChange={option=>setFieldValue("Per",option.value)}
            />
             {errors.Per && touched.Per && <small>{errors.Per}</small>}
          </div>
          <div>
            <textarea
              rows={3}
              cols="2"
              placeholder="Address"
              name="Address"
              value={values.Address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.Address && touched.Address && <small>{errors.Address}</small>}
          </div>
          {AddHomeData.HomeType === "Apartment" && (
            <div>
              <input
                type="number"
                placeholder="Floor number"
                onChange={() =>
                  setAddHomeData({
                    ...AddHomeData,
                    FloorNumber: e.target.value,
                  })
                }
              />
              <CardInput
                type={"checkbox"}
                label={"Lift"}
                name={"Lift"}
                class={"labelBlock"}
                onGet={setAddHomeData}
                data={AddHomeData}
                key={"as"}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <div className="extrathings">
          <ExtraThings
            checkBoxDetails={checkBoxDetails}
            onGet={setAddHomeData}
            data={AddHomeData}
            onChange={handleChange}
            errors={errors}
            touched={touched}
          />
        </div>
        <div className="file">
          <div>
            <label className="labelBlock" htmlFor="Upload your Home's photo">
              Upload your Home's image:
            </label>
            <input
              onChange={onFileCheckHandler}
              type="file"
              id="Upload your Home's photo:"
              required
              autoComplete="off"
              name="HomeImage"
            />
            {errors.HomeImage && touched.HomeImage && <small>{errors.HomeImage}</small>}
          </div>
          <div>
            <label className="labelBlock" htmlFor="Upload your Home's photo">
              Upload your Room & facilities images:
            </label>
            <input
              onChange={onFileCheckHandler}
              type="file"
              id="Room"
              name="OtherImages"
              required
              multiple
              autoComplete="off"
            />
            {errors.OtherImages && touched.Images && <small>{errors.OtherImages}</small>}
          </div>
          <div>
            <textarea
              placeholder="Comments"
              onChange={handleChange}
              name="Comments"
              value={values.Comments}
              onBlur={handleBlur}
            />
            {errors.Comments && touched.Comments && <small>{errors.Comments}</small>}
          </div>
          <div>
            <input
              placeholder="Age of Rental place"
              type="number"
              name="AgeOfRentalPlace"
              onChange={handleChange}
              value={values.AgeOfRentalPlace}
              onBlur={handleBlur}
            />
            {errors.AgeOfRentalPlace && touched.AgeOfRentalPlace && 
              <small>{errors.AgeOfRentalPlace}</small>
            }
          </div>
        </div>
        <div className="addHomeButton">
          <button className="submit btn" onClick={handleSubmit}>
            {" "}
            Submit for Approval
          </button>
          <p>You can't edit your home details once you submitted.</p>
          <p>Once Admin Approved your home, that will displayed in dashboard.</p>
        </div>
        {/* <Button className="submit btn" d={"block"}>Submit</Button> */}
      </div>
    </form>
  );
};

export default AddHome;
