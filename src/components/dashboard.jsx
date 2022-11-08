import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://62ff2d03a85c52ee48420f24.mockapi.io/user"
      );
      setUserData(response.data);
    }
    getData();
  }, []);
  const value = (id) => {
    navigate(`/edit/${id}`);
  };
  const profile = (id) => {
    navigate(`/profile/${id}`);
  };
  return (
    <div className=" vh-100">
      <nav className="navbar navbar-dark bg-dark  text-center ">
        <div className="container">
          <h5 className="navbar-text fw-bold justify-content-center align-content-center ">
            React CRUD Application
          </h5>
          <Link to="/create">
            <button className="btn btn-primary" type="submit">
              Create User
            </button>
          </Link>
        </div>
      </nav>
      <div
        style={{
          padding: "20px",
          backgroundImage: "linear-gradient(to right, #EDFF00FF, #ffff99)",
          height: "100%",
        }}
      >
        <div className="container ">
          <div className="row">
            <h3 className="text-center "> USER DATA </h3>

            {userData.map((row) => (
              <div className="col-md-4 " key={row.id}>
                <div sx={{ width: 275 }}>
                  <div
                    className="card text-center"
                    style={{ background: "#00A4CCFF " }}
                  >
                    <div className="card-body text-black">
                      <h5 className="card-title ">Name:{row.name}</h5>
                      <h6 className="card-subtitle mb-2 ">Age:{row.age}</h6>
                      <h6 className="card-text">Email:{row.email}</h6>
                      <h6 className="card-text">Gender:{row.gender}</h6>
                      <h6 className="card-text">Course:{row.course}</h6>
                      <br />
                      <Button
                        fullWidth
                        onClick={() => value(row.id)}
                        variant="contained"
                      >
                        Edit Form
                      </Button>
                      <br />
                      <br />
                      <Button
                        fullWidth
                        onClick={() => profile(row.id)}
                        variant="contained"
                      >
                        Profile
                      </Button>
                      <br />
                      <br />
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={async () => {
                          const response = await axios.delete(
                            ` https://62ff2d03a85c52ee48420f24.mockapi.io/user/${row.id}`
                          );
                          window.location.reload();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
