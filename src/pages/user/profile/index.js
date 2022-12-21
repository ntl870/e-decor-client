import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { CloudUpload, Delete } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import axios from "axios";
import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSelector } from "redux/selectors";
import { updateInfo } from "redux/userRedux";
import { useStyles } from "./styles";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector(userSelector);
  const [name, setName] = useState(currentUser?.name);
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const classes = useStyles();
  const [gender, setGender] = useState(currentUser?.gender);

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  //

  const [image, setImage] = useState(avatar);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImageUrl = (newImage) => {
    if (image) {
      cleanup();
    }
    setImage(newImage);
  };
  const getUploadedUrl = async (file) => {
    //  setUploadCover(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/e-decor/image/upload",
        data
      );
      const { url } = uploadRes.data;
      return url;
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];
    if (newImage) {
      setImageUrl(URL.createObjectURL(newImage));
    }
    getUploadedUrl(event.target.files?.[0]).then((result) => {
      setAvatar(result);
    });
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImageUrl(null);
    }
  };

  const handleSubmit = (event) => {
    const data = { name, email, avatar, phone, gender };
    dispatch(updateInfo(data));
  };
  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <PersonIcon className={classes.icon} />
          <Typography className={classes.title}>My Profile</Typography>
        </Box>
        <Button color="primary" variant="outlined">
          More
        </Button>
      </Box>
      <Box my={4} mb={10}>
        <Grid container spacing={3}>
          <Grid item sm={6} md={4}>
            <Card>
              <Box p={2} style={{ fontSize: 16, fontWeight: "bold" }}>
                Profile Picture
              </Box>
              <Divider style={{ height: 0.5 }} />
              <CardContent>
                <Box
                  display="flex"
                  my={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Avatar alt="" src={image} className={classes.avatar} />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <input
                    ref={inputFileRef}
                    accept="image/*"
                    hidden
                    id="avatar-image-upload"
                    type="file"
                    onChange={handleOnChange}
                  />
                  <label htmlFor="avatar-image-upload">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      mb={1}
                      onClick={handleClick}
                    >
                      {image ? (
                        <>
                          <Delete style={{ marginRight: 4 }} /> Remove
                        </>
                      ) : (
                        <>
                          <CloudUpload style={{ marginRight: 4 }} /> Upload
                        </>
                      )}
                    </Button>
                  </label>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6} md={8}>
            <Card>
              <Box p={2} pl={4} style={{ fontSize: 16, fontWeight: "bold" }}>
                Account Details
              </Box>
              <Divider style={{ height: 0.5 }} />
              <CardContent px={4}>
                <Box p={2} px={2}>
                  <Grid container spacing={2}>
                    <Grid container item sm={12}>
                      <Grid
                        item
                        sm={3}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Name
                      </Grid>
                      <Grid item sm={9}>
                        <FormControl
                          variant="outlined"
                          margin="dense"
                          fullWidth
                        >
                          <TextField
                            size="small"
                            required
                            id="name"
                            value={name}
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container item sm={12}>
                      <Grid
                        item
                        sm={3}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Gender
                      </Grid>
                      <Grid item sm={9}>
                        <RadioGroup
                          row
                          aria-label="gender"
                          name="gender"
                          value={gender}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                    <Grid container item sm={12}>
                      <Grid
                        item
                        sm={3}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Phone Number
                      </Grid>

                      <Grid item sm={9}>
                        <FormControl
                          variant="outlined"
                          margin="dense"
                          fullWidth
                        >
                          <TextField
                            type="text"
                            size="small"
                            required
                            id="phone-number"
                            value={phone}
                            variant="outlined"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container item sm={12}>
                      <Grid
                        item
                        sm={3}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Email
                      </Grid>
                      <Grid item sm={9}>
                        <FormControl
                          variant="outlined"
                          margin="dense"
                          fullWidth
                        >
                          <TextField
                            type="email"
                            size="small"
                            required
                            id="name"
                            value={email}
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box display="flex" alignItems="center" pl={2} mt={2} style={{position: 'relative'}}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Save Changes
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </div>
  );
}
