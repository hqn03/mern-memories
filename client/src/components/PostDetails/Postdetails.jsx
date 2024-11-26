import { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
  }, [post, dispatch]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
        elevation={6}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (id) => navigate(`/posts/${id}`);

  return (
    <>
      <Paper sx={{ p: 5, borderRadius: 4 }} elevation={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "20px",
            margin: "10px",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
          {/* <Divider sx={{ mx: 0, my: 5 }} /> */}
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            textAlign={"justify"}
          >
            {post.message}
          </Typography>
          <img
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              maxWidth: "50%",
            }}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </Box>
        <Divider sx={{ mx: 0, my: 5 }} />
        <Typography variant="body1">
          <strong>Realtime-chat</strong>
        </Typography>
        <Divider sx={{ mx: 0, my: 5 }} />
        {/* Comment section */}
        <CommentSection post={post} />
      </Paper>
      {recommendedPosts.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <Paper
                  key={_id}
                  sx={{
                    width: 200,
                    m: 2,
                    p: 1,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img
                    src={selectedFile}
                    width={200}
                    style={{ flex: 1, objectFit: "cover" }}
                    alt={title}
                  />
                </Paper>
              )
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default PostDetails;
