import React, { useState } from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/Postdetails";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const props = { user, setUser };
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar props={props} />
        <Routes>
          <Route path="/" element={<Navigate to={"/posts"} />} />
          <Route path="/posts" element={<Home props={props} />} />
          <Route path="/posts/search" element={<Home props={props} />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to={"/posts"} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
