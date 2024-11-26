import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
function CommentSection({ post }) {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: '${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
  };

  return (
    <Box sx={{}}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ height: "200px", overflowY: "auto", mr: "30px" }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c}
            </Typography>
          ))}
        </Box>
        {user?.result?.name && (
          <Box sx={{ width: "30%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              sx={{ mt: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Send
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CommentSection;
