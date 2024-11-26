import {
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { appBar, profile, purple, userName } from "./styles";
import blogImage from "../../images/blogger-logo-6942640_1280.webp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
function Navbar({ props }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { user, setUser } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    <AppBar sx={appBar} position="static" color="inherit">
      <Box sx={{ display: "flex", padding: "10px 24px", gap: 2 }}>
        <img src={blogImage} alt="blogger" height={60} />
        <Typography
          component={Link}
          to="/"
          sx={{ color: "rgb(255,87,34)", textDecoration: "none" }}
          variant="h3"
          align="center"
          color="primary"
        >
          Blogger
        </Typography>
      </Box>
      <Toolbar>
        {user ? (
          <div style={profile}>
            <Avatar
              sx={purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography sx={userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
