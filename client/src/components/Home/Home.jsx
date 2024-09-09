import { Container, Grow, Grid2, Paper, AppBar, TextField, Autocomplete, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import { getPostsBySearch } from "../../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home({ props }) {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
      //   dispatch -> fetch search post
    } else {
      //   console.log("[else]", search, tags);
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) searchPost();
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid2 sx={{}} container justifyContent="space-between" alignItems="stretch" spacing={3} direction={{ xs: "column-reverse", sm: "row" }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 9 }}>
            <Posts setCurrentId={setCurrentId} props={props} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <AppBar sx={{ borderRadius: 1, mb: "1rem", display: "flex", p: 2 }} position="static" color="inherit">
              <TextField
                sx={{ mb: 1 }}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Autocomplete
                sx={{ mb: 1 }}
                multiple
                freeSolo
                options={[]}
                onChange={(e, value) => setTags(value)}
                renderInput={(params) => <TextField {...params} label="Search tags" />}
              />
              <Button sx={{}} variant="contained" onClick={searchPost} color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid2>
        </Grid2>
      </Container>
    </Grow>
  );
}

export default Home;
