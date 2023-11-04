import React, { useEffect, useRef, useState } from "react";
import "./FullHomeDetails.css";
import Home1 from "../../assets/Home.jpg";
import { useParams } from "react-router-dom";
import LoaderSpinner from "../ReuseComponents/Loader";
import ImageSlider from "../ReuseComponents/ImageSlider";

const FullHomeDetails = () => {
  const [homeData, setHomeData] = useState({});
  const [status, setStatus] = useState({
    isSubmitting: true,
    didSubmit: false,
    totalFiles: [],
  });
  let { ID } = useParams();
  useEffect(() => {
    const FetchFullData = async () => {
      const response = await fetch(
        `https://rental-ui-89316-default-rtdb.firebaseio.com/HomeDetails/${ID}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const files = [data.HomeImage];
        setHomeData(data);
        if(data.OtherImages){
            setStatus({
            isSubmitting: false,
            didSubmit: true,
            totalFiles: files.concat(data.OtherImages),
          })}
          else{
            setStatus({
                isSubmitting: false,
                didSubmit: true,
                totalFiles: files,
              })
          }   
      } else {
        console.log(`fetch Error`);
      }
    };
    FetchFullData();
  }, []);

  return (
    <div>
      {status.isSubmitting && <LoaderSpinner height={"100vh"} />}
      {status.didSubmit && (
        <div className="fullHomeDetailsContainer">
          <div className="imageAndName">
            <div className="homeSlide">
              <ImageSlider slideImages={status.totalFiles} />
              <p>{`Age of Building: ${homeData.AgeOfRentalPlace}`}</p>
              <p>{homeData.floorNumber && `Floor Number:${homeData.floorNumber}`}</p>
              <p>{`Address: ${homeData.Address}-${homeData.Pincode}`}</p>
              <div className="contact">
                <p>{homeData.OwnerName && homeData.OwnerName}</p>   
                <p>{homeData.OwnerEmail}</p>
                <p>{`+91 ${homeData.ContactNumber}`}</p>
              </div>
            </div>
            <div className="homeDetails">
              <h1>{homeData.HomeName}</h1>
              <div className="flex">
                {" "}
                <h4>{`It is an ${homeData.HomeType} and it  has ${
                  homeData.BHK && (homeData.BHK==="More"?"more than 3":homeData.BHK.charAt(0))
                } bedroom${homeData.BHK.charAt(0) !== "1" ? "s" : ""}, ${
                    (homeData.Bathroom==="More"?"more than 3":homeData.Bathroom)
                } bathroom${homeData.Bathroom !== "1" ? "s" : ""}, ${
                  homeData.HomeType !== "Resort" ? "1 Kitchen" : ""
                } and good view of balcony.`}</h4>
                <div>
                  <p>
                    Advance: <span className="price">{homeData.Advance}</span>
                  </p>
                </div>
              </div>
              <div className="p">
                <div>
                  <p>{`Preferred tenant: ${homeData.Relationship}`}</p>
                  <p>{`Location:${homeData.Location} `}</p>
                  <p>
                    Rating: <span>{`${homeData.Rating} `}</span>
                  </p>
                </div>
                <p>
                  Rent:<span className="price">{`${homeData.Price}`}</span>
                  {`/${homeData.Per}`}
                </p>
              </div>
              <p className="">Other Details:</p>
              <ul>
                {homeData.Furnished && <li>{homeData.Furnished}</li>}
                {homeData.Wifi && <li>Wifi facility available</li>}
                {homeData.Maintenance && <li>Maintenance included</li>}
                {homeData.BikeAndCarParking && (
                  <li>Car & Bike Parking available</li>
                )}
                {homeData.WaterFacility && <li>Water facility available</li>}
                {homeData.UPS && <li>UPS Service available</li>}
                {homeData.SwimmingPool && <li>Swimming pool</li>}
                {homeData.lift && <li>Lift Facility available</li>}
                {
                  <li>{`Gate Security: ${
                    homeData.Security ? "Yes" : "No"
                  }`}</li>
                }
              </ul>
            </div>
          </div>
          <div className="locationAndContact">
            {`Comments:${homeData.Comments}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default FullHomeDetails;
