import { Container } from "@material-ui/core";
import Header from "components/auth/Header";
import SignUpForm from "components/auth/SignUpForm";
import { Progress } from "components/common/Progress";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ToastContainer } from "react-toastify";
import { userSelector } from "redux/selectors";
import { signUp } from "redux/userRedux";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading } = useSelector(userSelector);

  const handleSignUp = (user) => {
    dispatch(signUp(user)).then((data) => {
      console.log(data);
      if (!data?.error) history.push("/verify-email");
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
        <SignUpForm handleSignUp={handleSignUp} />
      </Container>
      <Progress isOpen={isLoading} />
      <ToastContainer autoClose={2000} style={{ marginTop: "50px" }} />
    </>
  );
};

export default SignUp;
