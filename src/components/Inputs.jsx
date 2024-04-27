import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

const Inputs = () => {
  const navigate = useNavigate();

  const [fristNameValue, setFristNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  // da el fetch bta3 api bta3km ento eshta
  // useEffect(() => {
  //   fetch("https://dummyapi.io/data/v1/user/", {
  //     headers: { "app-id": "64fc4a747b1786417e354f31" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  const addDataToDataBase = () => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: fristNameValue,
        lastName: lastNameValue,
        phoneNumber: phoneValue,
        email: emailValue,
        src: "",
      }),
    }).then((res) => res.json());
  };

  const condetionalFun = () => {
    if (
      fristNameValue != "" &&
      lastNameValue != "" &&
      emailValue != "" &&
      phoneValue != ""
    ) {
      addDataToDataBase();
      navigate("/");
    } else {
      console.log("Inputs is Riqouird");
    }
  };

  const inpRef = useRef(null);
  const [image, setImage] = useState("");

  const handelUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <div className="infoCon">
        <div className="image">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img src="../../public/default_iamge.jpg" alt="" />
          )}
          <input
            ref={inpRef}
            onChange={handelUploadImage}
            className="inpFile"
            type="file"
          />
        </div>
        <div className="inputsFiald">
          <input
            onChange={(e) => setFristNameValue(e.target.value)}
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastNameValue(e.target.value)}
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={(e) => setPhoneValue(e.target.value)}
            type="number"
            placeholder="Phone Number"
          />
          <input
            onChange={(e) => setEmailValue(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="bottonSave">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              condetionalFun();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inputs;
