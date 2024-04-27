import {
  Add,
  ChevronLeftRounded,
  ChevronRightRounded,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const Outputs = () => {
  const navigate = useNavigate();
  let [dataD, setData] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [count, setCount] = useState(1);

  const getAllUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((resp) => setData(resp));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = (usersId) => {
    fetch(`http://localhost:3000/users/${usersId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => getAllUsers());
  };

  const filterUsers = dataD.filter((user) => {
    if (searchUser === "") {
      return user;
    }
    if (user.firstName.toLowerCase().includes(searchUser.toLowerCase())) {
      return user;
    }
  });

  return (
    <div className="container">
      <div className="allInfo">
        <input
          onChange={(e) => setSearchUser(e.target.value)}
          className="inputSearch"
          type="text"
          placeholder="Search by Frist Name"
        />
        <div style={{ display: "flex", gap: "20px" }} className="addNewContact">
          <div className="botton">
            <Add />
            <button
              className="addBtn"
              onClick={() => {
                navigate("inputs");
              }}
              id="bottonAdd"
            >
              Add New Contact
            </button>
          </div>
        </div>
        <h3 style={{ margin: "10px 0" }}>Users Is {filterUsers.length} </h3>
        <div className="content">
          {dataD.length > 0 ? (
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "40px",
                justifyContent: "center",
                alignItems: "center",
                listStyle: "none",
              }}
            >
              {filterUsers.map((card, i) => (
                <li key={i}>
                  <div className="card">
                    <div className="info">
                      <img
                        src={
                          card.src != ""
                            ? card.src
                            : "../../public/default_iamge.jpg"
                        }
                        alt=""
                      />
                      <div className="text">
                        <h2>{card.firstName + " " + card.lastName}</h2>
                        <h5>{card.phoneNumber}</h5>
                      </div>
                    </div>
                    <div className="icons">
                      <Edit
                        style={{
                          backgroundColor: "#fff",
                          color: "#055786",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          navigate(`user/${card.id}`);
                        }}
                      />
                      <Delete
                        style={{
                          backgroundColor: "#fff",
                          color: "#b82f2f",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          deleteUser(card.id);
                        }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="not-found">Not Found User</p>
          )}
        </div>
        <div className="count">
          <ChevronLeftRounded
            onClick={() => {
              count < 1 ? null : setCount(count - 1);
            }}
          />
          <p>{count}</p>
          <ChevronRightRounded
            onClick={() => {
              setCount(count + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Outputs;
