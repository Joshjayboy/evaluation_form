import React from "react";
import axios from "axios";
import { baseURL } from "./constant.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

const Post = ({ id, task, des, img, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      // setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    // each post
    <Card>
      <CardMedia sx={{ height: 140 }} image={img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {des}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={console.log("edit")} size="small">
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={removeTask}
          sx={{
            backgroundColor: "red",
            color: "white",
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
