import * as Yup from "yup"

export const SignupValidation =Yup.object({
    Signupname:Yup.string().min(3).required("Name Required"),
    Signupemail:Yup.string().email("Invalid Email").required("Email Required"),
    Signuppassword:Yup.string().min(8).required("Password Required")
})


export const LoginValidation =Yup.object({
    Loginemail:Yup.string().email("Invalid Email").required("Email Required"),
    Loginpassword:Yup.string().min(8).required("Password Required"),
    Userpermission:Yup.string().required("Select Privillege")
})

export const AddHomeValidation =Yup.object({
    HomeType:Yup.string().required("Home Type Required"),
    HomeName:Yup.string().required("Home Name Required"),
    OwnerName:Yup.string().required("Owner Name Required"),
    OwnerEmail:Yup.string().email("Invalid Email").required("Owner Email Required"),
    Location:Yup.string().required("Location Required"),
    ContactNumber:Yup.number().required("Contact Number Required"),
    BHK:Yup.string().required("BHK Required"),
    Price:Yup.string().required("Price Required"),
    Per:Yup.string().required("Per Required"),
    Advance:Yup.string().required("Advance Required"),
    Address:Yup.string().required("Address Required"),
    Pincode:Yup.string().required("Pincode Required"),
    Bathroom:Yup.string().required("Bathroom Required"),
    Relationship:Yup.string().required("Select Relationship"),
    Furnished:Yup.string().required("Select Furinished status"),
    HomeImage:Yup.string().required("HomeImage Required"),
    OtherImages:Yup.array().required("OtherImages Required"),
    Comments:Yup.string().required("Comments Required"),
    AgeOfRentalPlace:Yup.string().required("AgeOfRentalPlace Required"),
    Lift:Yup.boolean(),
    WaterFacility:Yup.boolean(),
    Wifi:Yup.boolean(),
    Maintenance:Yup.boolean(),
    UPS:Yup.boolean(),
    BikeAndCarParking:Yup.boolean(),
    Security:Yup.boolean(),
    SwimmingPool:Yup.boolean(),
})

