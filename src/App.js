import { useState, useEffect } from "react";
import Post from "./Post.js";
import { Box, TextField, Button } from "@mui/material";
import { useTasks } from "./useTasks";
import { useImageUpload } from "./useImageUpload";
import { useForm } from "./useForm";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";

function App() {
  // hooks and usestate handling
  const { tasks, addTask, updateTask } = useTasks();
  const { form, handleInputChange, resetForm } = useForm();
  const { handleImageChange, uploadImage, imagePreview } = useImageUpload();
  const [updateId, setUpdateId] = useState(null);

  // function to add a post
  const handleSubmit = async () => {
    const imageUrl = await uploadImage();
    const taskData = {
      task: form.input,
      description: form.des,
      image: imageUrl,
    };

    if (updateId) {
      await updateTask(updateId, taskData);
      setUpdateId(null);
    } else {
      await addTask(taskData);
    }
    resetForm();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "30px",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        Evaluation Form
      </Box>
      <Box
        sx={{
          mt: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Topic
        </Box>

        {/* post input field */}
        <TextField
          name="input"
          value={form.input}
          onChange={handleInputChange}
          placeholder="Enter the Post topic..."
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          mt: 4,
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Description
      </Box>

      {/* Description input field */}
      <TextField
        name="des"
        value={form.des}
        onChange={handleInputChange}
        placeholder="Enter the Post description..."
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          mt: 4,
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Image
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* select image */}
        <input
          type="file"
          onChange={handleImageChange}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        {/* Image preview */}
        {imagePreview && (
          <img src={imagePreview} alt="Image Preview" width="100" />
        )}
      </Box>

      {/* Submit Button to add a post */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          type="submit"
          onClick={handleSubmit}
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {updateId ? "Update Post" : "Add Post"}
        </Button>
      </Box>

      <Divider
        sx={{
          mt: "50px",
          mb: "50px",
          fontWeight: 600,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "30px",
          fontWeight: 700,
        }}
      >
        All Posts
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "10%",
          marginBottom: "20%",
        }}
      >
        {/* Display posts */}
        <Grid container spacing={5}>
          {tasks.map((task) => (
            <Grid size={{ xs: 12, sm: 4, md: 4 }} key={task._id}>
              <Post
                {...task}
                setUpdateId={setUpdateId}
                key={task._id}
                id={task._id}
                task={task.task}
                des={task.description}
                img={task.image}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
