import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [fristNameValue, setFristNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const navigate = useNavigate();

  const { userId } = useParams();
  const inpRef = useRef(null);
  const [image, setImage] = useState("");

  const handelUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const UpdateUserData = () => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
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
          <button onClick={() => navigate("/")}>Cancel</button>
          <button
            onClick={() => {
              UpdateUserData();
              navigate("/");
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
