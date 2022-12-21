import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    borderRadius: 8,
  },
  welcome: {
    fontSize: 25,
    fontWeight: "bold",
  },
  divider: {
    width: 170,
    padding: theme.spacing(0, 1),
  },
  dividerText: {
    color: "#9396b9",
    padding: theme.spacing(0, 1),
  },
  loginBtn: {
    color: "white",
    margin: theme.spacing(1, 0),
    backgroundColor: "#D23F57",
    "&:hover": {
      backgroundColor: "#db2b48",
    },
  },
  fbBtn: {
    color: "white",
    backgroundColor: "rgb(59, 89, 152)",
    margin: theme.spacing(1, 0),
    "&:hover": {
      backgroundColor: "rgb(39 75 151)",
    },
  },
  ggBtn: {
    color: "white",
    backgroundColor: "rgb(66, 133, 244)",
    margin: theme.spacing(1, 0),
    "&:hover": {
      backgroundColor: "rgb(38 115 243)",
    },
  },

  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "100%",
  },

  link: {
    marginLeft: 8,
    fontWeight: 500,
    color: "#2B3445",
    borderBottom: "1px solid #2B3445",
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (e) => {
    if (!values.email) setEmailErr("Not empty");
    if (!values.password) setPasswordErr("Not empty");
    const user = {
      email: values.email,
      password: values.password,
    };
    e.preventDefault();
    props.handleLogin(user);
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <Box px={8} py={4}>
        <form onSubmit={handleFormSubmit}>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              mb={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="h5" className={classes.welcome}>
                Welcome To E-Decor
              </Typography>
              <Typography>Log in with email & password</Typography>
            </Box>

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
            >
              <TextField
                error={Boolean(emailErr)}
                required
                id="email"
                label="Email"
                helperText={emailErr}
                variant="outlined"
                value={values.email}
                onChange={handleChange("email")}
                type="email"
              />
            </FormControl>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
            >
              <TextField
                error={Boolean(passwordErr)}
                required
                helperText={passwordErr}
                id="password"
                label="Password"
                variant="outlined"
                value={values.password}
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              className={classes.loginBtn}
            >
              Login
            </Button>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Divider className={classes.divider} />
              <Box>
                <Typography component="span" className={classes.dividerText}>
                  or
                </Typography>
              </Box>
              <Divider className={classes.divider} />
            </Box>

            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              className={classes.fbBtn}
            >
              Login with Facebook
            </Button>
            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              className={classes.ggBtn}
            >
              Login with Google
            </Button>
            <Box mt={2}>
              Don't have account?
              <Link to="/sign-up" className={classes.link}>
                Sign Up
              </Link>
            </Box>
          </Box>
        </form>
      </Box>
      <Box>
        <Box>
          <Box
            py={3}
            display="flex"
            justifyContent="center"
            style={{ backgroundColor: "#F3F5F9" }}
          >
            Forgot your password?
            <Link to="/forgot-password" className={classes.link}>
              Reset It
            </Link>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;
