import React from "react";
import { useSelector } from "react-redux";
import { Grid2, CircularProgress } from "@mui/material";

import Post from "./Post/Post";

function Posts({ setCurrentId, props }) {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid2 sx={{}} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid2 key={post._id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Post post={post} setCurrentId={setCurrentId} props={props} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default Posts;
