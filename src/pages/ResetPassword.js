import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import Header from "components/auth/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { userSelector } from "redux/selectors";
import { resetPass } from "redux/userRedux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    borderRadius: 8,
  },

  welcome: {
    fontSize: 25,
    fontWeight: "bold",
  },

  signUpBtn: {
    color: "white",
    margin: theme.spacing(1, 0),
    backgroundColor: "#D23F57",
    "&:hover": {
      backgroundColor: "#db2b48",
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
const ResetPassword = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const { email } = useSelector(userSelector);
  const [secretCode, setSecretCode] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      secretCode,
    };
    dispatch(resetPass(data))
      .then((data) => {
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <Container
        style={{
          margin: "auto",
          marginTop: 100,
          height: "calc(100vh - 100px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                    Reset Password?
                  </Typography>
                  <Typography>
                    Please check your inbox and insert a code to verify and get
                    a new password.
                  </Typography>
                </Box>

                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-name">Code *</InputLabel>
                  <OutlinedInput
                    id="outlined-name"
                    type={"text"}
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    labelWidth={60}
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  className={classes.signUpBtn}
                >
                  Reset
                </Button>

                <Box mt={2}>
                  Didn't receive a code?
                  <Link to="/login" className={classes.link}>
                    Request Again
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
                Already have an account?
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ResetPassword;
