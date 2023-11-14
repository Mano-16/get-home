import * as Yup from "yup";

export const SignupValidation = Yup.object({
  Signupname: Yup.string().min(3).required("Name Required"),
  Signupemail: Yup.string().email("Invalid Email").required("Email Required"),
  Signuppassword: Yup.string()
    .min(8)
    .required("Password Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const LoginValidation = Yup.object({
  Loginemail: Yup.string().email("Invalid Email").required("Email Required"),
  Loginpassword: Yup.string()
    .min(8)
    .required("Password Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  Userpermission: Yup.string().required("Select Privillege"),
});

export const AddHomeValidation = Yup.object({
  HomeType: Yup.string().required("Home Type Required"),
  HomeName: Yup.string().max(15).required("Home Name Required"),
  OwnerName: Yup.string().max(15).required("Owner Name Required"),
  OwnerEmail: Yup.string()
    .email("Invalid Email")
    .required("Owner Email Required"),
  Location: Yup.string().max(15).required("Location Required"),
  ContactNumber: Yup.string()
    .required("Contact Number Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  BHK: Yup.string().required("BHK Required"),
  Price: Yup.string().required("Price Required"),
  Per: Yup.string().required("Per Required"),
  Advance: Yup.string().required("Advance Required"),
  Address: Yup.string().required("Address Required"),
  Pincode: Yup.string().required("Pincode Required").matches(/^[0-9]+$/, "Must be only digits")
  .min(6, "Must be exactly 6 digits")
  .max(6, "Must be exactly 6 digits"),
  Bathroom: Yup.string().required("Bathroom Required"),
  Relationship: Yup.string().required("Select Relationship"),
  Furnished: Yup.string().required("Select Furinished status"),
  HomeImage: Yup.string().required("HomeImage Required"),
  OtherImages: Yup.array().required("OtherImages Required"),
  Comments: Yup.string().required("Comments Required"),
  AgeOfRentalPlace: Yup.string().required("AgeOfRentalPlace Required").matches(/^[0-9]+$/, "Must be only digits")
  .min(1, "Must be exactly 1 digit")
  .max(1, "Must be exactly 1 digit"),
  Lift: Yup.boolean(),
  WaterFacility: Yup.boolean(),
  Wifi: Yup.boolean(),
  Maintenance: Yup.boolean(),
  UPS: Yup.boolean(),
  BikeAndCarParking: Yup.boolean(),
  Security: Yup.boolean(),
  SwimmingPool: Yup.boolean(),
});
