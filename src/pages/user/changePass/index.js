import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import Images from "constants/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSelector } from "redux/selectors";
import { updatePass } from "redux/userRedux";
import { useStyles } from "./styles";
export default function ChangePassword() {
  const { isLoading } = useSelector(userSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  //
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleClickShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <LockIcon className={classes.icon} />
          <Typography className={classes.title}>Change Password</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            // history.push("/address/add");
          }}
        >
          Settings
        </Button>
      </Box>
      <Box my={2} mb={12}>
        <Paper>
          <Box p={4}>
            <Box mb={4} display="flex" alignItems="center">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                  >
                    <FormControl variant="outlined" margin="dense" fullWidth>
                      <InputLabel htmlFor="component-outlined">
                        Current Password
                      </InputLabel>
                      <OutlinedInput
                        id="component-outlined"
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                        }}
                        label="Current Password"
                        placeholder="Current Password"
                        inputProps={{
                          type: showPassword ? "text" : "password",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      className={classes.discount}
                    >
                      <InputLabel htmlFor="component-outlined">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="component-outlined"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                        label="New Password"
                        placeholder="New Password"
                        inputProps={{
                          type: showPassword2 ? "text" : "password",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword2 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      className={classes.discount}
                    >
                      <InputLabel htmlFor="component-outlined">
                        Confirm New Password
                      </InputLabel>
                      <OutlinedInput
                        id="component-outlined"
                        value={confirmNewPassword}
                        onChange={(e) => {
                          setConfirmNewPassword(e.target.value);
                        }}
                        label="Confirm New Password"
                        placeholder="Confirm New Password"
                        inputProps={{
                          type: showPassword3 ? "text" : "password",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword3}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword3 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <Box mt={2} className={classes.wrapper}>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isLoading}
                        onClick={() => {
                          dispatch(
                            updatePass({ currentPassword, newPassword })
                          ).then((data) => {
                            setCurrentPassword("");
                            setNewPassword("");
                            setConfirmNewPassword("");
                          });
                        }}
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
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <img src={Images.PASSWORD} alt="" />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
        </Paper>
      </Box>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </div>
  );
}
