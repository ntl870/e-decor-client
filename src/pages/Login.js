import { Container } from "@material-ui/core";
import Header from "components/auth/Header";
import LoginForm from "components/auth/LoginForm";
import { Progress } from "components/common/Progress";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSelector } from "redux/selectors";
import { login } from "redux/userRedux";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading } = useSelector(userSelector);

  const handleLogin = async (user) => {
    dispatch(login(user))
      .then((data) => {
        if (data.payload) history.push("/");
        else {
          toast.error("Login Failed!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <Container
        style={{
          margin: "auto",
          marginTop: 80,
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginForm handleLogin={handleLogin} />
      </Container>
      <Progress isOpen={isLoading} />
      <ToastContainer autoClose={2000} style={{ marginTop: "50px" }} />
    </>
  );
};

export default Login;
