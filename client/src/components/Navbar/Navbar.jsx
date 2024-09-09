import { AppBar, Typography, Avatar, Toolbar, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { appBar, profile, purple, userName } from "./styles";
import memories from "../../images/memories.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
function Navbar({ props }) {
  //   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
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
      <div style={{ display: "flex", padding: "10px 24px" }}>
        <Typography component={Link} to="/" sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }} variant="h3" align="center" color="primary">
          Memories
        </Typography>
        <img style={{ marginLeft: 15 }} src={memories} alt="memories" height={60} />
      </div>
      <Toolbar>
        {user ? (
          <div style={profile}>
            <Avatar sx={purple} alt={user.result.name} src={user.result.imageUrl}>
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
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
