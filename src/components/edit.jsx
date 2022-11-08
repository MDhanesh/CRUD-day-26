import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUsers() {
  const navigate = useNavigate();
  const params = useParams();
  ///get data
  const [get, setGet] = useState([]);

  useEffect(() => {
    async function Apidata() {
      //console.log(params.id);
      const response = await axios.get(
        `https://62ff2d03a85c52ee48420f24.mockapi.io/user/${params.id}`
      );
      // setGet(response.data);
      setPost(response.data);
      //console.log(response.data);
    }
    Apidata();
  }, []);
  //--------------------------------------------------------------//
  //POST Method
  //
  let formValue = {
    id: "",
    name: "",
    age: "",
    email: "",
    gender: "",
    course: "",
    error: {
      name: "",
      age: "",
      email: "",
      gender: "",
      course: "",
    },
  };
  //usestate for POST METHOD
  const [post, setPost] = useState(formValue);
  //FUNCTION for POST Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errKeys = Object.keys(post).filter((key) => {
      if (post[key] === "" && key !== "id" && key !== "error") {
        return key;
      }
    });
    if (errKeys.length >= 1) {
      alert("Please fill all Data");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(post.email)) {
      window.alert("Please Enter a Valid Email Address");
    } else {
      const response = await axios.put(
        `https://62ff2d03a85c52ee48420f24.mockapi.io/user/${params.id}`,
        {
          name: post.name,
          age: post.age,
          email: post.email,
          gender: post.gender,
          course: post.course,
        }
      );
      console.log(response);
      let user = [get];
      let index = user.findIndex((row) => row.id === response.data.id);
      user[index] = response.data;
      setGet(user);
      navigate("/");
    }
  };
  //
  //handlesubmit
  const handleChange = (e) => {
    let error = { ...post.error };
    if (e.target.value === "") {
      error[e.target.name] = `${e.target.name} is Required`;
    } else {
      error[e.target.name] = "";
    }
    setPost({ ...post, [e.target.name]: e.target.value, error });
  };
  ////
  return (
    <div className="container bg-info ">
      <nav className="navbar navbar-dark bg-dark  text-center">
        <div className="container">
          <h5 className="navbar-text fw-bold justify-content-center align-content-center ">
            React CRUD Application
          </h5>
        </div>
      </nav>
      <div className="d-flex m-5 pb-5">
        <div
          className="product col-md-6 col-lg-6 offset-md-3"
          style={{
            justifyContent: "center",
            padding: "30px",
            backgroundColor: "white",
            paddingLeft: "62px",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontSize: "30px",
              color: "black",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            EDIT the User Data
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              id="name"
              label="Name"
              variant="standard"
              name="name"
              value={post.name}
              onChange={(e) => handleChange(e)}
            />
            <br />
            {/* <span style={{ color: "red" }}>{post.error.name}</span> */}
            <br />
            <TextField
              id="age"
              label="Age"
              variant="standard"
              type="number"
              name="age"
              value={post.age}
              onChange={(e) => handleChange(e)}
            />
            <br />
            {/* <span style={{ color: "red" }}>{post.error.age}</span> */}
            <br />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              name="email"
              value={post.email}
              onChange={(e) => handleChange(e)}
            />
            <br />
            {/* <span style={{ color: "red" }}>{post.error.email}</span> */}
            <br />
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
              value={post.gender}
              onChange={(e) => handleChange(e)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={post.course}
                name="course"
                label="Course"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="REACT">REACT</MenuItem>
                <MenuItem value="DSA">DSA</MenuItem>
                <MenuItem value="CSS">CSS</MenuItem>
              </Select>
            </FormControl>
            <br />
            <Button variant="contained" type="submit">
              Update
            </Button>
            <Link to="/">
              <Button variant="contained" className="p-1 mt-2  w-100">
                Back
              </Button>
            </Link>
          </Box>
        </div>
      </div>
    </div>
  );
}
