import { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import { auth, signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await dispatch(auth(codeResponse));
      navigate("/");
    },
    flow: "auth-code",
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ p: 2 }} elevation={3}>
        <Avatar
          sx={{
            justifyContent: "center",
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "#e91e63",
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography sx={{ m: 2, textAlign: "center" }} variant="h5">
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Adress"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid2>
          <Button
            sx={{ mt: 2, mb: 1 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={googleLogin}
          >
            sign in with google
          </Button>

          <Grid2 container justifyContent={"flex-end"}>
            <Grid2>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
