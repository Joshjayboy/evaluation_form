import Post from "./Post.js";
import { useState, useEffect } from "react";
import { baseURL } from "./constant.js";
import axios from "axios";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

function App() {
  const [input, setInput] = useState("");
  const [des, setDes] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const [image, setImage] = useState(null); // To store the selected image file
  const [imagePreview, setImagePreview] = useState(""); // To store the image preview
  const [imageUrl, setImageUrl] = useState(""); // Store uploaded image URL

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the image file
    setImagePreview(URL.createObjectURL(file)); // Generate a preview
  };

  // Upload image to Cloudinary and get the URL
  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "farmdev"); // Cloudinary preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/pro-solve/image/upload",
        formData
      );
      return response.data.secure_url; // This is the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }
  };

  const addTask = async () => {
    const imageUrl = await uploadImageToCloudinary();
    axios
      .post(`${baseURL}/save`, {
        task: input,
        description: des,
        image: imageUrl,
      })
      .then((res) => {
        console.log(res.data);
        setInput("");
        setDes("");
        setImage("");
        setImagePreview("");
        setUpdateUI((prevState) => !prevState);
        setImageUrl(""); // Clear the URL after submission
        // setTasks([...tasks, res.data]);
      });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setDes(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios
      .put(`${baseURL}/update/${updateId}`, { task: input, description: des })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setInput("");
        setDes("");
      });
  };

  return (
    <>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "column",
            // gap: 2,
            fontSize: "30px",
            fontWeight: "bold",
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
          <TextField
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
        <TextField
          type="text"
          value={des}
          onChange={(e) => setDes(e.target.value)}
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
          <input
            type="file"
            onChange={handleImageChange}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Image Preview" width="100" />
          )}
        </Box>
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
            onClick={updateId ? updateTask : addTask}
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {updateId ? "Update Post" : "Add Post"}
          </Button>
        </Box>
      </div>
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid size={{ xs: 12, sm: 4, md: 4 }} key={task._id}>
              <Post
                key={task._id}
                id={task._id}
                task={task.task}
                des={task.description}
                img={task.image}
                setUpdateUI={setUpdateUI}
                updateMode={updateMode}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
