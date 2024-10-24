// import React, { useEffect, useState } from 'react';
// import { Grid, Button } from '@mui/material';
// import axios from 'axios';

// const PostGrid = () => {
//   const [posts, setPosts] = useState([]);

//   const fetchPosts = async () => {
//     const response = await axios.get('http://localhost:5000/posts');
//     setPosts(response.data);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/posts/${id}`);
//     fetchPosts();
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <Grid container spacing={2}>
//       {posts.map((post) => (
//         <Grid item xs={12} sm={6} md={4} key={post._id}>
//           <img src={post.imageUrl} alt={post.title} width="100%" />
//           <h3>{post.title}</h3>
//           <p>{post.description}</p>
//           <Button onClick={() => handleDelete(post._id)} variant="contained" color="error">Delete</Button>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default PostGrid;
