import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Box,
} from "@mui/material";
import moment from "moment";
import { cardActions, details, overlay2, title } from "./styles";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

function Post({ post, setCurrentId, props }) {
  const dispatch = useDispatch();
  const { user } = props;
  const navigate = useNavigate();

  const Likes = () => {
    let likesCount = post.likes.length;
    if (likesCount > 0) {
      return post.likes.find(
        (id) => id === user?.result?.id || id === user?.result?._id
      ) ? (
        <>
          <ThumbUpAlt size="small" />
          &nbsp;
          {likesCount >= 2
            ? `You and ${likesCount - 1} others`
            : `${likesCount} like${likesCount > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined size="small" />
          &nbsp;
          {likesCount} {likesCount === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined size="small" />
        &nbsp;
        {likesCount} {likesCount < 1 ? "Like" : "Likes"}
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  console.log(setCurrentId);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 4,
        height: "100%",
        position: "relative",
      }}
      raised
      elevation={6}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
        }}
        image={post.selectedFile}
        title={post.tilte}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
        }}
      >
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>
      <div style={overlay2}>
        {(user?.result?.id === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            sx={{ color: "white" }}
            size=""
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <ButtonBase
        sx={{ display: "block", textAlign: "initial" }}
        onClick={openPost}
      >
        <div style={details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography sx={title} variant="h5">
          {post.title}
        </Typography>
        <CardContent sx={{ flex: 1 }}>
          <Typography
            sx={{
              lineClamp: 2,
              wordBreak: "break-all",
            }}
            variant="body2"
            color="textSecondary"
            align="justify"
            noWrap
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions sx={cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.id === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default React.memo(Post);
