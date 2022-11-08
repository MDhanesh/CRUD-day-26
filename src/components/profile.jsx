import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function Profile() {
  const params = useParams();
  ///get data
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function Apidata() {
      // console.log(params.id);
      const response = await axios.get(
        `https://62ff2d03a85c52ee48420f24.mockapi.io/user/${params.id}`
      );
      setUserData(response.data);
      // setPost(response.data);
      // console.log(response.data);
    }
    Apidata();
  }, []);
  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-dark  text-center">
        <div className="container">
          <h5 className="navbar-text fw-bold justify-content-center align-content-center ">
            React CRUD Application
          </h5>
          <Link to="/">
            <button className="btn btn-primary" type="submit">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>
      <div
        className="container d-flex bg-info vh-100 "
        style={{
          justifyContent: "center",
          padding: "50px",
          paddingLeft: "62px",
        }}
      >
        <div className=" p-3 " key={userData.id}>
          <div style={{ width: "250px" }}>
            <Typography
              variant="h6"
              style={{
                color: "black",
              }}
              className="m-3 text-center"
            >
              Welcome
              <span className="text-uppercase text-danger">
                &nbsp; &nbsp;
                {userData.name}
              </span>
            </Typography>
            <div
              className="card bg-info text-center px-3 mx-3 bg-warning"
              style={{ width: "20rem" }}
            >
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Name:<span className="text-white ">{userData.name}</span>
                </h5>
                <h6 className="card-subtitle mb-3 ">
                  Age:<span className="text-white">{userData.age}</span>
                </h6>
                <h6 className="card-text mb-3">
                  Email:<span className="text-white">{userData.email}</span>
                </h6>
                <h6 className="card-text mb-3">
                  Gender:<span className="text-white">{userData.gender}</span>
                </h6>
                <h6 className="card-text mb-3">
                  Course:<span className="text-white">{userData.course}</span>
                </h6>
                <Link to="/">
                  <Button variant="contained">back to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}
