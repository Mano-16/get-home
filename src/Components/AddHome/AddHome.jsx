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

const AddHome = (props) => {
  const dispatch = useDispatch();
  const [AddHomeData, setAddHomeData] = useState({});
  const [file, setFile] = useState();
  const AddHomeHandler = async (e) => {
    e.preventDefault();
    sendData(
      "https://rental-ui-89316-default-rtdb.firebaseio.com/PendingApproval/.json",
      AddHomeData
    ).then((res) =>{ dispatch(homeSliceActions.AddApprovalPendingData(res))
      props.onShow()
    });
  };
  const onFileCheckHandler = (e) => {
    if (e.target.id === "Room") {
      const RoomImages = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const files = e.target.files[i];
       
        const reader = new FileReader();
        reader.onload=function(){
          RoomImages.push(reader.result)
          setAddHomeData({...AddHomeData,files:RoomImages})
        }
        reader.readAsDataURL(files)
      }
      console.log(RoomImages)
    } else {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        setAddHomeData({
          ...AddHomeData,
          HomeImage: reader.result,
          Rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
        });
      };
      reader.readAsDataURL(file);
    }
  };
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
    { key: 11, type: "radio", label: "Bachelor", name: "relationship" },
    { key: 12, type: "radio", label: "Family", name: "relationship" },
    { key: 13, type: "radio", label: "Bachelor/Family", name: "relationship" },
    { key: 9, type: "radio", label: "Furnished", name: "furniture" },
    { key: 7, type: "radio", label: "Semi Furnished", name: "furniture" },
    { key: 8, type: "radio", label: "No-Furnished", name: "furniture" },
    // { key: 1, type: "checkbox", label: "Refrigerator", name: "Refrigerator" },
    // { key: 2, type: "checkbox", label: "TV", name: "TV" },
    { key: 3, type: "checkbox", label: "Water_Facility", name: "Water" },
    { key: 4, type: "checkbox", label: "Wifi", name: "Wifi" },
    { key: 5, type: "checkbox", label: "Maintenance", name: "maintenance" },
    { key: 6, type: "checkbox", label: "UPS_service", name: "Ups" },
    { key: 10, type: "checkbox", label: "Bike_Car_Parking", name: "Parking" },
    { key: 20, type: "checkbox", label: "Gate_Security", name: "Security" },
    {
      key: 21,
      type: "checkbox",
      label: "Swimming_Pool",
      name: "Swimming_Pool",
    },
  ];
  const onShowHandler = () => {
    props.onShow();
  };
  return (
    <form className="addHomeForm" onSubmit={AddHomeHandler}>
      <h1>Get your customer easily!</h1>
      <span onClick={onShowHandler}>
        <LiaTimesSolid />
      </span>
      <div className="addHomeContainer">
        <Select
          placeholder="Home Type"
          className="select"
          onChange={(e) =>
            setAddHomeData({ ...AddHomeData, HomeType: e.value })
          }
          options={HomeType}
          required
        />
        <Select
          placeholder="BHKs"
          className="select"
          onChange={(e) => setAddHomeData({ ...AddHomeData, BHK: e.value })}
          options={BHKs}
          required
        />
        <Select
          placeholder="Bathroom"
          className="select"
          onChange={(e) =>
            setAddHomeData({ ...AddHomeData, Bathroom: e.value })
          }
          options={BathroomCount}
          required
        />
        <div className="homeInputFields">
          <div>
            <label className="labelBlock" htmlFor="Home Name">
              Home Name
            </label>
            <input
              type="text"
              placeholder="Home Name"
              id="Home Name"
              onChange={(e) =>
                setAddHomeData({ ...AddHomeData, HomeName: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="labelBlock" htmlFor="Owner Name">
              Owner Name
            </label>
            <input
              type="text"
              placeholder="Owner Name"
              id="Owner Name"
              onChange={(e) =>
                setAddHomeData({ ...AddHomeData, OwnerName: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="labelBlock" htmlFor="Your Email">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              id="Your Email"
              onChange={(e) =>
                setAddHomeData({ ...AddHomeData, OwnerEmail: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="labelBlock" htmlFor="Location">
              Location
            </label>
            <input
              type="text"
              placeholder="Location"
              id="Location"
              onChange={(e) =>
                setAddHomeData({ ...AddHomeData, Location: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="labelBlock" htmlFor="Contact Number">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Contact Number"
              id="Contact Number"
              onChange={(e) =>
                setAddHomeData({
                  ...AddHomeData,
                  ContactNumber: e.target.value,
                })
              }
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="homeInputFields2">
          <div>
            <label className="labelBlock" htmlFor="Price $">
              Price $
            </label>
            <input
              type="number"
              placeholder="Price $"
              id="Price $"
              onChange={(e) =>
                setAddHomeData({ ...AddHomeData, Price: e.target.value })
              }
              required
              autoComplete="off"
              min={0}
            />
            <Select
              className="select"
              placeholder="Per"
              options={per}
              onChange={(e) =>
                setAddHomeData({ ...AddHomeData, PricePerTime: e.value })
              }
            />
            <label className="labelBlock" htmlFor="Advance $">
              Advance $
            </label>
            <input
              type="number"
              placeholder="Advance $"
              id="Advance $"
              onChange={(e) =>
                setAddHomeData({ ...AddHomeData, Advance: e.target.value })
              }
              required
              autoComplete="off"
              min={0}
            />
          </div>

          <textarea
            rows={3}
            cols="2"
            placeholder="Address"
            onChange={(e) =>
              setAddHomeData({ ...AddHomeData, Address: e.target.value })
            }
            
          />
          <input type="number" placeholder="Pincode" onChange={(e)=>setAddHomeData({...AddHomeData,Pincode:e.target.value})} />
          {AddHomeData.HomeType === "Apartment" && (
            <div>
              <input type="number" placeholder="Floor number" onChange={()=>setAddHomeData({...AddHomeData,FloorNumber:e.target.value})} />
              <CardInput
                type={"checkbox"}
                label={"Lift"}
                name={"Lift"}
                class={"labelBlock"}
                onGet={setAddHomeData}
                data={AddHomeData}
                key={"as"}
              />
            </div>
          )}
        </div>
        <div className="extrathings">
          <ExtraThings
            checkBoxDetails={checkBoxDetails}
            onGet={setAddHomeData}
            data={AddHomeData}
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
            />
          </div>
          <div>
            <label className="labelBlock" htmlFor="Upload your Home's photo">
              Upload your Room & facilities images:
            </label>
            <input
              onChange={onFileCheckHandler}
              type="file"
              id="Room"
              required
              multiple
              autoComplete="off"
            />
          </div>
          <textarea
            placeholder="Comments"
            onChange={(e) =>
              setAddHomeData({ ...AddHomeData, Comments: e.target.value })
            }
          />
          <input
            placeholder="Age of Rental place"
            type="number"
            onChange={(e) => {
              setAddHomeData({ ...AddHomeData, AgeOfHome: e.target.value });
            }}
          />
        </div>
        <div className="addHomeButton">
          <button  className="submit btn" onClick={AddHomeHandler}>
            {" "}
            Submit
          </button>
          <p>You can't edit your home details you submitted.</p>
        </div>
        {/* <Button className="submit btn" d={"block"}>Submit</Button> */}
      </div>
    </form>
  );
};

export default AddHome;
