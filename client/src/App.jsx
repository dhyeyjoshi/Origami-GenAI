// import React, { useState } from "react";
// import axios from "axios";
// import NavBar from "./NavBar";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Switch,
//   FormControlLabel,
//   Paper,
// } from "@mui/material";
// import centerGif from "./assets/giphy.gif"; // Ensure these paths are correct
// import leftGif from "./assets/bird.gif";
// import rightGif from "./assets/module.gif";
// import right2Gif from "./assets/bird2.gif";
// import "./App.css"; // Ensure your CSS is imported
// import Gallery from "./Gallery";
// import InputFileUpload from "./InputFileUpload";

// function App() {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     negativePrompt: "",
//     cfgScale: "",
//     image: null,
//     strength: "",
//     steps: "",
//     seed: "",
//     uploadImageRequired: false,
//   });

//   const [imageSrc, setImageSrc] = useState(null);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const onImageClick = (image) => {
//     setFormData({ ...formData, image });
//   };

//   const handleToggleChange = (e) => {
//     setFormData({
//       ...formData,
//       uploadImageRequired: e.target.checked,
//       image: e.target.checked ? formData.image : null,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
//     if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
//     else if (!formData.prompt.match(regex))
//       tempErrors.prompt =
//         "Prompt can only contain letters, numbers, commas, and spaces.";
//     if (formData.negativePrompt && !formData.negativePrompt.match(regex))
//       tempErrors.negativePrompt =
//         "Negative Prompt can only contain letters, numbers, commas, and spaces.";
//     if (
//       !formData.cfgScale ||
//       formData.cfgScale < 1.0 ||
//       formData.cfgScale > 20.0
//     )
//       tempErrors.cfgScale =
//         "CFG Scale is required and should be between 1.0 and 20.0.";
//     if (formData.uploadImageRequired && !formData.image)
//       tempErrors.image = "Image is required.";
//     if (
//       !formData.strength ||
//       formData.strength <= 0.0 ||
//       formData.strength > 1.0
//     )
//       tempErrors.strength =
//         "Strength is required and should be between 0.0 and 1.0.";
//     if (!formData.steps || formData.steps < 1 || formData.steps > 1000)
//       tempErrors.steps =
//         "Number of Inference Steps is required and should be between 1 and 1000.";
//     if (!formData.seed) tempErrors.seed = "Seed is required.";
//     else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
//       tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
//     const formDataToSend = new FormData();
//     formDataToSend.append("prompt", formData.prompt + staticSuffix);
//     formDataToSend.append("negativePrompt", formData.negativePrompt || "");
//     formDataToSend.append("cfgScale", formData.cfgScale);
//     formDataToSend.append("strength", formData.strength);
//     formDataToSend.append("steps", formData.steps);
//     formDataToSend.append("seed", formData.seed);
//     if (formData.image) formDataToSend.append("image", formData.image);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/generate",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(new Blob([response.data]));
//       setImageSrc(imageUrl);
//     } catch (error) {
//       console.error("There was an error sending the form data!", error);
//     }
//   };

//   return (
//     <>
//       <NavBar />
//       <Container maxWidth="md" className="text-center mt-8">
//         <Box className="gif-container">
//           <img src={leftGif} alt="Left Gif" className="gif" />
//           <img src={centerGif} alt="Center Gif" className="gif" />
//           <img src={rightGif} alt="Right Gif" className="gif" />
//           <img src={right2Gif} alt="Right Gif" className="gif" />
//         </Box>
//         <Typography
//           variant="h3"
//           sx={{
//             fontFamily: "Jokerman, sans-serif",
//             textAlign: "center",
//             fontSize: "3rem",
//             marginTop: "20px",
//           }}
//         >
//           Generative Origami AI: Artistry Meets Algorithms
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontFamily: "Times New Roman, sans-serif",
//             marginTop: "20px",
//             fontSize: "1.2rem",
//           }}
//         >
//           Unleashing the potential of AI to elevate origami design through
//           innovative workflows and multi-layered feedback loops, merging human
//           creativity with advanced AI-driven processes.
//         </Typography>
//         <Paper sx={{ mt: 5, mb: 5 }} square={false} elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Paper elevation={3} sx={{ padding: "20px", m: 2 }}>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="prompt"
//                         label="Prompt"
//                         fullWidth
//                         value={formData.prompt}
//                         onChange={handleChange}
//                         error={!!errors.prompt}
//                         helperText={errors.prompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="negativePrompt"
//                         label="Negative Prompt"
//                         fullWidth
//                         value={formData.negativePrompt}
//                         onChange={handleChange}
//                         error={!!errors.negativePrompt}
//                         helperText={errors.negativePrompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="cfgScale"
//                         label="Classifier-Free Guidance (CFG) Scale"
//                         fullWidth
//                         type="number"
//                         value={formData.cfgScale}
//                         onChange={handleChange}
//                         error={!!errors.cfgScale}
//                         helperText={errors.cfgScale}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={formData.uploadImageRequired}
//                             onChange={handleToggleChange}
//                           />
//                         }
//                         label="Submit Your Picture to Origami-fy It"
//                       />
//                     </Grid>
//                     {formData.uploadImageRequired && (
//                       <Grid item xs={12}>
//                         <Box
//                           sx={{
//                             border: "1px dashed grey",
//                             borderRadius: "4px",
//                             padding: "10px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {formData.image ? (
//                             <img
//                               src={
//                                 formData.image instanceof File
//                                   ? URL.createObjectURL(formData.image)
//                                   : formData.image.img
//                               }
//                               alt="Uploaded"
//                               style={{ maxWidth: "100%", textAlign: "center" }}
//                             />
//                           ) : (
//                             <Typography variant="body2" color="textSecondary">
//                               Image Placeholder (click to upload)
//                             </Typography>
//                           )}
//                           <InputFileUpload
//                             handleFileUpload={handleFileChange}
//                           />
//                           <Typography variant="h6" gutterBottom>
//                             Or
//                           </Typography>
//                           <Gallery onImageClick={onImageClick} />
//                         </Box>
//                         {errors.image && (
//                           <Typography color="error">{errors.image}</Typography>
//                         )}
//                       </Grid>
//                     )}
//                     <Grid item xs={12}>
//                       <TextField
//                         name="strength"
//                         label="Strength"
//                         fullWidth
//                         type="number"
//                         value={formData.strength}
//                         onChange={handleChange}
//                         error={!!errors.strength}
//                         helperText={errors.strength}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="steps"
//                         label="Number of Inference Steps"
//                         fullWidth
//                         type="number"
//                         value={formData.steps}
//                         onChange={handleChange}
//                         error={!!errors.steps}
//                         helperText={errors.steps}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="seed"
//                         label="Seed"
//                         fullWidth
//                         type="number"
//                         value={formData.seed}
//                         onChange={handleChange}
//                         error={!!errors.seed}
//                         helperText={errors.seed}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button type="submit" variant="contained" color="primary">
//                         Generate
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               {imageSrc && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                     mr: 2,
//                   }}
//                 >
//                   <Typography variant="h5" align="center"sx={{
//                   fontFamily: "Curlz MT, sans-serif",
//                   textAlign: "center",
//                   fontSize: "2rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                     AI-Generated Origami
//                   </Typography>
//                   <Box
//                     sx={{
//                       flexGrow: 1,
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <img
//                       src={imageSrc}
//                       alt="Generated"
//                       style={{
//                         width: "100%", // Ensure the image takes up the full width of the container
//                         height: "auto", // Maintain aspect ratio
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               )}
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default App;

//////////UPLOAD IMAGE FEATURE/////////////////////////

// import React, { useState } from "react";
// import axios from "axios";
// import NavBar from "./NavBar";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Switch,
//   FormControlLabel,
//   Paper,
// } from "@mui/material";
// import centerGif from "./assets/giphy.gif"; // Ensure these paths are correct
// import leftGif from "./assets/bird.gif";
// import rightGif from "./assets/module.gif";
// import right2Gif from "./assets/bird2.gif";
// import "./App.css"; // Ensure your CSS is imported
// import Gallery from "./Gallery";
// import InputFileUpload from "./InputFileUpload";

// function App() {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     negativePrompt: "",
//     cfgScale: "",
//     image: null,
//     strength: "",
//     steps: "",
//     seed: "",
//     uploadImageRequired: false,
//   });

//   const [imageSrc, setImageSrc] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [uploadSuccess, setUploadSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const onImageClick = (image) => {
//     setFormData({ ...formData, image });
//   };

//   const handleToggleChange = (e) => {
//     setFormData({
//       ...formData,
//       uploadImageRequired: e.target.checked,
//       image: e.target.checked ? formData.image : null,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
//     if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
//     else if (!formData.prompt.match(regex))
//       tempErrors.prompt =
//         "Prompt can only contain letters, numbers, commas, and spaces.";
//     if (formData.negativePrompt && !formData.negativePrompt.match(regex))
//       tempErrors.negativePrompt =
//         "Negative Prompt can only contain letters, numbers, commas, and spaces.";
//     if (
//       !formData.cfgScale ||
//       formData.cfgScale < 1.0 ||
//       formData.cfgScale > 20.0
//     )
//       tempErrors.cfgScale =
//         "CFG Scale is required and should be between 1.0 and 20.0.";
//     if (formData.uploadImageRequired && !formData.image)
//       tempErrors.image = "Image is required.";
//     if (
//       !formData.strength ||
//       formData.strength <= 0.0 ||
//       formData.strength > 1.0
//     )
//       tempErrors.strength =
//         "Strength is required and should be between 0.0 and 1.0.";
//     if (!formData.steps || formData.steps < 1 || formData.steps > 1000)
//       tempErrors.steps =
//         "Number of Inference Steps is required and should be between 1 and 1000.";
//     if (!formData.seed) tempErrors.seed = "Seed is required.";
//     else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
//       tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
//     const formDataToSend = new FormData();
//     formDataToSend.append("prompt", formData.prompt + staticSuffix);
//     formDataToSend.append("negativePrompt", formData.negativePrompt || "");
//     formDataToSend.append("cfgScale", formData.cfgScale);
//     formDataToSend.append("strength", formData.strength);
//     formDataToSend.append("steps", formData.steps);
//     formDataToSend.append("seed", formData.seed);
//     if (formData.image) formDataToSend.append("image", formData.image);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/generate",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(new Blob([response.data]));
//       setImageSrc(imageUrl);
//       setUploadSuccess(true);
//     } catch (error) {
//       console.error("There was an error sending the form data!", error);
//       setUploadSuccess(false);
//     }
//   };

//   return (
//     <>
//       <NavBar />
//       <Container maxWidth="md" className="text-center mt-8">
//         <Box className="gif-container">
//           <img src={leftGif} alt="Left Gif" className="gif" />
//           <img src={centerGif} alt="Center Gif" className="gif" />
//           <img src={rightGif} alt="Right Gif" className="gif" />
//           <img src={right2Gif} alt="Right Gif" className="gif" />
//         </Box>
//         <Typography
//           variant="h3"
//           sx={{
//             fontFamily: "Jokerman, sans-serif",
//             textAlign: "center",
//             fontSize: "3rem",
//             marginTop: "20px",
//           }}
//         >
//           Generative Origami AI <br /> Artistry Meets Algorithms
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontFamily: "Times New Roman, sans-serif",
//             marginTop: "20px",
//             fontSize: "1.2rem",
//           }}
//         >
//           Unleashing the potential of AI to elevate origami design through
//           innovative workflows and multi-layered feedback loops, merging human
//           creativity with advanced AI-driven processes.
//         </Typography>
//         <Paper sx={{ mt: 5, mb: 5 }} square={false} elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Paper elevation={3} sx={{ padding: "20px", m: 2 }}>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="prompt"
//                         label="Prompt"
//                         fullWidth
//                         value={formData.prompt}
//                         onChange={handleChange}
//                         error={!!errors.prompt}
//                         helperText={errors.prompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="negativePrompt"
//                         label="Negative Prompt"
//                         fullWidth
//                         value={formData.negativePrompt}
//                         onChange={handleChange}
//                         error={!!errors.negativePrompt}
//                         helperText={errors.negativePrompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="cfgScale"
//                         label="Classifier-Free Guidance (CFG) Scale"
//                         fullWidth
//                         type="number"
//                         value={formData.cfgScale}
//                         onChange={handleChange}
//                         error={!!errors.cfgScale}
//                         helperText={errors.cfgScale}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={formData.uploadImageRequired}
//                             onChange={handleToggleChange}
//                           />
//                         }
//                         label="Submit Your Picture to Origami-fy It"
//                       />
//                     </Grid>
//                     {formData.uploadImageRequired && (
//                       <Grid item xs={12}>
//                         <Box
//                           sx={{
//                             border: "1px dashed grey",
//                             borderRadius: "4px",
//                             padding: "10px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {formData.image ? (
//                             <img
//                               src={
//                                 formData.image instanceof File
//                                   ? URL.createObjectURL(formData.image)
//                                   : formData.image.img
//                               }
//                               alt="Uploaded"
//                               style={{ maxWidth: "100%", textAlign: "center" }}
//                             />
//                           ) : (
//                             <Typography variant="body2" color="textSecondary">
//                               Image Placeholder (click to upload)
//                             </Typography>
//                           )}
//                           <InputFileUpload
//                             handleFileUpload={handleFileChange}
//                           />
//                           <Typography variant="h6" gutterBottom>
//                             Or
//                           </Typography>
//                           <Gallery onImageClick={onImageClick} />
//                         </Box>
//                         {errors.image && (
//                           <Typography color="error">{errors.image}</Typography>
//                         )}
//                       </Grid>
//                     )}
//                     <Grid item xs={12}>
//                       <TextField
//                         name="strength"
//                         label="Strength"
//                         fullWidth
//                         type="number"
//                         value={formData.strength}
//                         onChange={handleChange}
//                         error={!!errors.strength}
//                         helperText={errors.strength}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="steps"
//                         label="Number of Inference Steps"
//                         fullWidth
//                         type="number"
//                         value={formData.steps}
//                         onChange={handleChange}
//                         error={!!errors.steps}
//                         helperText={errors.steps}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="seed"
//                         label="Seed"
//                         fullWidth
//                         type="number"
//                         value={formData.seed}
//                         onChange={handleChange}
//                         error={!!errors.seed}
//                         helperText={errors.seed}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button type="submit" variant="contained" color="primary">
//                         Generate
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Paper>
//               {uploadSuccess && (
//                 <Typography
//                 variant="h6"
//                 color="success.main"
//                 sx={{
//                   fontFamily: "'Dancing Script', cursive",
//                   textAlign: "center",
//                   fontSize: "1.5rem",
//                   fontWeight: "bold",
//                   mt: 3,
//                 }}
//               >
//                 ? Your origami masterpiece is ready! <br /> Enjoy and share your creation! ??
//               </Typography>              
//               )}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               {imageSrc && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                     mr: 2,
//                   }}
//                 >
//                   <Typography variant="h5" align="center"sx={{
//                   fontFamily: "Curlz MT, sans-serif",
//                   textAlign: "center",
//                   fontSize: "2rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                     AI-Generated Origami
//                   </Typography>
//                   <Box
//                     sx={{
//                       flexGrow: 1,
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <img
//                       src={imageSrc}
//                       alt="Generated"
//                       style={{
//                         width: "100%", // Ensure the image takes up the full width of the container
//                         height: "auto", // Maintain aspect ratio
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               )}
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default App;

////////////////////////////////////////////////////////////// Added Instruction Table //////////////////////////////////////////////

// import React, { useState } from "react";
// import axios from "axios";
// import NavBar from "./NavBar";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Switch,
//   FormControlLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import centerGif from "./assets/giphy.gif"; // Ensure these paths are correct
// import leftGif from "./assets/bird.gif";
// import rightGif from "./assets/module.gif";
// import right2Gif from "./assets/bird2.gif";
// import "./App.css"; // Ensure your CSS is imported
// import Gallery from "./Gallery";
// import InputFileUpload from "./InputFileUpload";

// function App() {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     negativePrompt: "",
//     cfgScale: "",
//     image: null,
//     strength: "",
//     steps: "",
//     seed: "",
//     uploadImageRequired: false,
//   });

//   const [imageSrc, setImageSrc] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [uploadSuccess, setUploadSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const onImageClick = (image) => {
//     setFormData({ ...formData, image });
//   };

//   const handleToggleChange = (e) => {
//     setFormData({
//       ...formData,
//       uploadImageRequired: e.target.checked,
//       image: e.target.checked ? formData.image : null,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
//     if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
//     else if (!formData.prompt.match(regex))
//       tempErrors.prompt =
//         "Prompt can only contain letters, numbers, commas, and spaces.";
//     if (formData.negativePrompt && !formData.negativePrompt.match(regex))
//       tempErrors.negativePrompt =
//         "Negative Prompt can only contain letters, numbers, commas, and spaces.";
//     if (
//       !formData.cfgScale ||
//       formData.cfgScale < 1.0 ||
//       formData.cfgScale > 20.0
//     )
//       tempErrors.cfgScale =
//         "CFG Scale is required and should be between 1.0 and 20.0.";
//     if (formData.uploadImageRequired && !formData.image)
//       tempErrors.image = "Image is required.";
//     if (
//       !formData.strength ||
//       formData.strength <= 0.0 ||
//       formData.strength > 1.0
//     )
//       tempErrors.strength =
//         "Strength is required and should be between 0.0 and 1.0.";
//     if (!formData.steps || formData.steps < 1 || formData.steps > 1000)
//       tempErrors.steps =
//         "Number of Inference Steps is required and should be between 1 and 1000.";
//     if (!formData.seed) tempErrors.seed = "Seed is required.";
//     else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
//       tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
//     const formDataToSend = new FormData();
//     formDataToSend.append("prompt", formData.prompt + staticSuffix);
//     formDataToSend.append("negativePrompt", formData.negativePrompt || "");
//     formDataToSend.append("cfgScale", formData.cfgScale);
//     formDataToSend.append("strength", formData.strength);
//     formDataToSend.append("steps", formData.steps);
//     formDataToSend.append("seed", formData.seed);
//     if (formData.image) formDataToSend.append("image", formData.image);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/generate",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(new Blob([response.data]));
//       setImageSrc(imageUrl);
//       setUploadSuccess(true);
//     } catch (error) {
//       console.error("There was an error sending the form data!", error);
//       setUploadSuccess(false);
//     }
//   };

//   const summaryData = [
//     {
//       parameter: "prompt",
//       impact: "Detailed prompt results in more specific images",
//       example: `"A serene landscape with mountains"`,
//     },
//     {
//       parameter: "negative_prompt",
//       impact: "Helps to exclude unwanted elements",
//       example: `"Without any watermarks"`,
//     },
//     {
//       parameter: "input_image",
//       impact: "Guides the generation based on the initial image",
//       example: "Using a sketch as the input",
//     },
//     {
//       parameter: "strength",
//       impact: "Higher values make the output closely follow the input image",
//       example: "strength=0.8 for detailed transformation",
//     },
//     {
//       parameter: "cfg_scale",
//       impact: "Balances adherence to prompt and image realism",
//       example: "cfg_scale=10 for strong adherence",
//     },
//     {
//       parameter: "steps",
//       impact: "More steps result in higher quality but take longer",
//       example: "steps=500 for detailed image",
//     },
//     {
//       parameter: "seed",
//       impact: "Ensures reproducibility with the same seed",
//       example: "seed=42 for consistent results",
//     },
//   ];

//   return (
//     <>
//       <NavBar />
//       <Container maxWidth="md" className="text-center mt-8">
//         <Box className="gif-container">
//           <img src={leftGif} alt="Left Gif" className="gif" />
//           <img src={centerGif} alt="Center Gif" className="gif" />
//           <img src={rightGif} alt="Right Gif" className="gif" />
//           <img src={right2Gif} alt="Right Gif" className="gif" />
//         </Box>
//         <Typography
//           variant="h3"
//           sx={{
//             fontFamily: "Jokerman, sans-serif",
//             textAlign: "center",
//             fontSize: "3rem",
//             marginTop: "20px",
//           }}
//         >
//           Generative Origami AI <br /> Artistry Meets Algorithms
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontFamily: "Times New Roman, sans-serif",
//             marginTop: "20px",
//             fontSize: "1.2rem",
//           }}
//         >
//           Unleashing the potential of AI to elevate origami design through
//           innovative workflows and multi-layered feedback loops, merging human
//           creativity with advanced AI-driven processes.
//         </Typography>
//         <TableContainer component={Paper} sx={{ mt: 5 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}
//                 >
//                   Parameter
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}
//                 >
//                   Impact on Image Generation
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}
//                 >
//                   Example
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {summaryData.map((row) => (
//                 <TableRow key={row.parameter}>
//                   <TableCell align="center" sx={{ fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}>
//                     {row.parameter}
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}>
//                     {row.impact}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{ fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem", fontStyle: "italic", fontWeight: "bold" }}
//                   >
//                     {row.example}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Paper sx={{ mt: 5, mb: 5 }} square={false} elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Paper elevation={3} sx={{ padding: "20px", m: 2 }}>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="prompt"
//                         label="Prompt"
//                         fullWidth
//                         value={formData.prompt}
//                         onChange={handleChange}
//                         error={!!errors.prompt}
//                         helperText={errors.prompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="negativePrompt"
//                         label="Negative Prompt"
//                         fullWidth
//                         value={formData.negativePrompt}
//                         onChange={handleChange}
//                         error={!!errors.negativePrompt}
//                         helperText={errors.negativePrompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="cfgScale"
//                         label="Classifier-Free Guidance (CFG) Scale"
//                         fullWidth
//                         type="number"
//                         value={formData.cfgScale}
//                         onChange={handleChange}
//                         error={!!errors.cfgScale}
//                         helperText={errors.cfgScale}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={formData.uploadImageRequired}
//                             onChange={handleToggleChange}
//                           />
//                         }
//                         label="Submit Your Picture to Origami-fy It"
//                       />
//                     </Grid>
//                     {formData.uploadImageRequired && (
//                       <Grid item xs={12}>
//                         <Box
//                           sx={{
//                             border: "1px dashed grey",
//                             borderRadius: "4px",
//                             padding: "10px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {formData.image ? (
//                             <img
//                               src={
//                                 formData.image instanceof File
//                                   ? URL.createObjectURL(formData.image)
//                                   : formData.image.img
//                               }
//                               alt="Uploaded"
//                               style={{ maxWidth: "100%", textAlign: "center" }}
//                             />
//                           ) : (
//                             <Typography variant="body2" color="textSecondary">
//                               Image Placeholder (click to upload)
//                             </Typography>
//                           )}
//                           <InputFileUpload handleFileUpload={handleFileChange} />
//                           <Typography variant="h6" gutterBottom>
//                             Or
//                           </Typography>
//                           <Gallery onImageClick={onImageClick} />
//                         </Box>
//                         {errors.image && (
//                           <Typography color="error">{errors.image}</Typography>
//                         )}
//                       </Grid>
//                     )}
//                     <Grid item xs={12}>
//                       <TextField
//                         name="strength"
//                         label="Strength"
//                         fullWidth
//                         type="number"
//                         value={formData.strength}
//                         onChange={handleChange}
//                         error={!!errors.strength}
//                         helperText={errors.strength}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="steps"
//                         label="Number of Inference Steps"
//                         fullWidth
//                         type="number"
//                         value={formData.steps}
//                         onChange={handleChange}
//                         error={!!errors.steps}
//                         helperText={errors.steps}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="seed"
//                         label="Seed"
//                         fullWidth
//                         type="number"
//                         value={formData.seed}
//                         onChange={handleChange}
//                         error={!!errors.seed}
//                         helperText={errors.seed}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button type="submit" variant="contained" color="primary">
//                         Generate
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Paper>
//               {uploadSuccess && (
//                 <Typography
//                   variant="h6"
//                   color="success.main"
//                   sx={{
//                     fontFamily: "'Dancing Script', cursive",
//                     textAlign: "center",
//                     fontSize: "1.5rem",
//                     fontWeight: "bold",
//                     mt: 3,
//                   }}
//                 >
//                   ? Your origami masterpiece is ready! <br /> Enjoy and share your creation! ??
//                 </Typography>
//               )}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               {imageSrc && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                     mr: 2,
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     align="center"
//                     sx={{
//                       fontFamily: "Curlz MT, sans-serif",
//                       textAlign: "center",
//                       fontSize: "2rem",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     AI-Generated Origami
//                   </Typography>
//                   <Box
//                     sx={{
//                       flexGrow: 1,
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <img
//                       src={imageSrc}
//                       alt="Generated"
//                       style={{
//                         width: "100%", // Ensure the image takes up the full width of the container
//                         height: "auto", // Maintain aspect ratio
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               )}
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default App;

///////////////////////////////////////////////////////ADDED INSTRUCTION + LOADING gif + PLACEHOLDER jpg/////////////////////////////////

// import React, { useState } from "react";
// import axios from "axios";
// import NavBar from "./NavBar";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Switch,
//   FormControlLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import centerGif from "./assets/giphy4.gif"; // Ensure these paths are correct
// import leftGif from "./assets/bird.gif";
// import rightGif from "./assets/module.gif";
// import right2Gif from "./assets/bird2.gif";
// import placeholderImage from "./assets/placeholder.jpg"; // Ensure this path is correct
// import loadingGif from "./assets/giphy.gif"; // Ensure this path is correct
// import "./App.css"; // Ensure your CSS is imported
// import Gallery from "./Gallery";
// import InputFileUpload from "./InputFileUpload";

// function App() {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     negativePrompt: "",
//     cfgScale: "",
//     image: null,
//     strength: "",
//     steps: "",
//     seed: "",
//     uploadImageRequired: false,
//   });

//   const [imageSrc, setImageSrc] = useState(placeholderImage); // Initial placeholder image
//   const [errors, setErrors] = useState({});
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const onImageClick = (image) => {
//     setFormData({ ...formData, image });
//   };

//   const handleToggleChange = (e) => {
//     setFormData({
//       ...formData,
//       uploadImageRequired: e.target.checked,
//       image: e.target.checked ? formData.image : null,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
//     if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
//     else if (!formData.prompt.match(regex))
//       tempErrors.prompt =
//         "Prompt can only contain letters, numbers, commas, and spaces.";
//     if (formData.negativePrompt && !formData.negativePrompt.match(regex))
//       tempErrors.negativePrompt =
//         "Negative Prompt can only contain letters, numbers, commas, and spaces.";
//     if (
//       !formData.cfgScale ||
//       formData.cfgScale < 1.0 ||
//       formData.cfgScale > 20.0
//     )
//       tempErrors.cfgScale =
//         "CFG Scale is required and should be between 1.0 and 20.0.";
//     if (formData.uploadImageRequired && !formData.image)
//       tempErrors.image = "Image is required.";
//     if (
//       !formData.strength ||
//       formData.strength <= 0.0 ||
//       formData.strength > 1.0
//     )
//       tempErrors.strength =
//         "Strength is required and should be between 0.0 and 1.0.";
//     if (!formData.steps || formData.steps < 1 || formData.steps > 1000)
//       tempErrors.steps =
//         "Number of Inference Steps is required and should be between 1 and 1000.";
//     if (!formData.seed) tempErrors.seed = "Seed is required.";
//     else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
//       tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true); // Show loading GIF

//     const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
//     const formDataToSend = new FormData();
//     formDataToSend.append("prompt", formData.prompt + staticSuffix);
//     formDataToSend.append("negativePrompt", formData.negativePrompt || "");
//     formDataToSend.append("cfgScale", formData.cfgScale);
//     formDataToSend.append("strength", formData.strength);
//     formDataToSend.append("steps", formData.steps);
//     formDataToSend.append("seed", formData.seed);
//     if (formData.image) formDataToSend.append("image", formData.image);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/generate",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(new Blob([response.data]));
//       setImageSrc(imageUrl); // Replace loading GIF with the generated image
//       setUploadSuccess(true);
//     } catch (error) {
//       console.error("There was an error sending the form data!", error);
//       setUploadSuccess(false);
//     } finally {
//       setLoading(false); // Hide loading GIF
//     }
//   };

//   const summaryData = [
//     {
//       parameter: "prompt",
//       impact: "Detailed prompt results in more specific images",
//       example: `"A serene landscape with mountains"`,
//     },
//     {
//       parameter: "negative_prompt",
//       impact: "Helps to exclude unwanted elements",
//       example: `"Without any watermarks"`,
//     },
//     {
//       parameter: "input_image",
//       impact: "Guides the generation based on the initial image",
//       example: "Using a sketch as the input",
//     },
//     {
//       parameter: "strength",
//       impact: "Higher values make the output closely follow the input image",
//       example: "strength=0.8 for detailed transformation",
//     },
//     {
//       parameter: "cfg_scale",
//       impact: "Balances adherence to prompt and image realism",
//       example: "cfg_scale=10 for strong adherence",
//     },
//     {
//       parameter: "steps",
//       impact: "More steps result in higher quality but take longer",
//       example: "steps=500 for detailed image",
//     },
//     {
//       parameter: "seed",
//       impact: "Ensures reproducibility with the same seed",
//       example: "seed=42 for consistent results",
//     },
//   ];

//   return (
//     <>
//       <NavBar />
//       <Container maxWidth="md" className="text-center mt-8">
//         <Box className="gif-container">
//           <img src={leftGif} alt="Left Gif" className="gif" />
//           <img src={centerGif} alt="Center Gif" className="gif" />
//           <img src={rightGif} alt="Right Gif" className="gif" />
//           <img src={right2Gif} alt="Right Gif" className="gif" />
//         </Box>
//         <Typography
//           variant="h3"
//           sx={{
//             fontFamily: "Jokerman, sans-serif",
//             textAlign: "center",
//             fontSize: "3rem",
//             marginTop: "20px",
//           }}
//         >
//           Generative Origami AI <br /> Artistry Meets Algorithms
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontFamily: "Times New Roman, sans-serif",
//             marginTop: "20px",
//             fontSize: "1.2rem",
//           }}
//         >
//           Unleashing the potential of AI to elevate origami design through
//           innovative workflows and multi-layered feedback loops, merging human
//           creativity with advanced AI-driven processes.
//         </Typography>
//         <TableContainer component={Paper} sx={{ mt: 5 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontSize: "1.0rem",
//                   }}
//                 >
//                   Parameter
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontSize: "1.0rem",
//                   }}
//                 >
//                   Impact on Image Generation
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontSize: "1.0rem",
//                   }}
//                 >
//                   Example
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {summaryData.map((row) => (
//                 <TableRow key={row.parameter}>
//                   <TableCell
//                     align="center"
//                     sx={{ fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}
//                   >
//                     {row.parameter}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{ fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}
//                   >
//                     {row.impact}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       fontFamily: "Times New Roman, sans-serif",
//                       fontSize: "1.0rem",
//                       fontStyle: "italic",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {row.example}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Paper sx={{ mt: 5, mb: 5 }} square={false} elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Paper elevation={3} sx={{ padding: "20px", m: 2 }}>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="prompt"
//                         label="Prompt"
//                         fullWidth
//                         value={formData.prompt}
//                         onChange={handleChange}
//                         error={!!errors.prompt}
//                         helperText={errors.prompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="negativePrompt"
//                         label="Negative Prompt"
//                         fullWidth
//                         value={formData.negativePrompt}
//                         onChange={handleChange}
//                         error={!!errors.negativePrompt}
//                         helperText={errors.negativePrompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="cfgScale"
//                         label="Classifier-Free Guidance (CFG) Scale"
//                         fullWidth
//                         type="number"
//                         value={formData.cfgScale}
//                         onChange={handleChange}
//                         error={!!errors.cfgScale}
//                         helperText={errors.cfgScale}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={formData.uploadImageRequired}
//                             onChange={handleToggleChange}
//                           />
//                         }
//                         label="Submit Your Picture to Origami-fy It"
//                       />
//                     </Grid>
//                     {formData.uploadImageRequired && (
//                       <Grid item xs={12}>
//                         <Box
//                           sx={{
//                             border: "1px dashed grey",
//                             borderRadius: "4px",
//                             padding: "10px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {formData.image ? (
//                             <img
//                               src={
//                                 formData.image instanceof File
//                                   ? URL.createObjectURL(formData.image)
//                                   : formData.image.img
//                               }
//                               alt="Uploaded"
//                               style={{ maxWidth: "100%", textAlign: "center" }}
//                             />
//                           ) : (
//                             <Typography variant="body2" color="textSecondary">
//                               Image Placeholder (click to upload)
//                             </Typography>
//                           )}
//                           <InputFileUpload handleFileUpload={handleFileChange} />
//                           <Typography variant="h6" gutterBottom>
//                             Or
//                           </Typography>
//                           <Gallery onImageClick={onImageClick} />
//                         </Box>
//                         {errors.image && (
//                           <Typography color="error">{errors.image}</Typography>
//                         )}
//                       </Grid>
//                     )}
//                     <Grid item xs={12}>
//                       <TextField
//                         name="strength"
//                         label="Strength"
//                         fullWidth
//                         type="number"
//                         value={formData.strength}
//                         onChange={handleChange}
//                         error={!!errors.strength}
//                         helperText={errors.strength}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="steps"
//                         label="Number of Inference Steps"
//                         fullWidth
//                         type="number"
//                         value={formData.steps}
//                         onChange={handleChange}
//                         error={!!errors.steps}
//                         helperText={errors.steps}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="seed"
//                         label="Seed"
//                         fullWidth
//                         type="number"
//                         value={formData.seed}
//                         onChange={handleChange}
//                         error={!!errors.seed}
//                         helperText={errors.seed}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button type="submit" variant="contained" color="primary">
//                         Generate
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Paper>
//               {uploadSuccess && (
//                 <Typography
//                   variant="h6"
//                   color="success.main"
//                   sx={{
//                     fontFamily: "'Dancing Script', cursive",
//                     textAlign: "center",
//                     fontSize: "1.5rem",
//                     fontWeight: "bold",
//                     mt: 3,
//                   }}
//                 >
//                   ? Your origami masterpiece is ready! <br /> Enjoy and share your creation! ??
//                 </Typography>
//               )}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                   mr: 2,
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   align="center"
//                   sx={{
//                     fontFamily: "Dancing Script, sans-serif",
//                     textAlign: "center",
//                     fontSize: "2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   AI-Generated Origami
//                 </Typography>
//                 <Box
//                   sx={{
//                     flexGrow: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <img
//                     src={loading ? loadingGif : imageSrc} // Show loading GIF or the generated image
//                     alt="Generated"
//                     style={{
//                       width: "100%", // Ensure the image takes up the full width of the container
//                       height: "auto", // Maintain aspect ratio
//                       borderRadius: "8px",
//                     }}
//                   />
//                   {loading && (
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontFamily: "Times New Roman, sans-serif",
//                         fontStyle: "italic",
//                         marginTop: "10px",
//                       }}
//                     >
//                       Loading...
//                     </Typography>
//                   )}
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default App;



/////////////////////////////////////////////// Add a SAVE feature ////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import axios from "axios";
// import NavBar from "./NavBar";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Switch,
//   FormControlLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import centerGif from "./assets/giphy4.gif"; // Ensure these paths are correct
// import leftGif from "./assets/bird.gif";
// import rightGif from "./assets/module.gif";
// import right2Gif from "./assets/bird2.gif";
// import placeholderImage from "./assets/placeholder.jpg"; // Ensure this path is correct
// import loadingGif from "./assets/giphy.gif"; // Ensure this path is correct
// import "./App.css"; // Ensure your CSS is imported
// import Gallery from "./Gallery";
// import InputFileUpload from "./InputFileUpload";

// function App() {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     negativePrompt: "",
//     cfgScale: "",
//     image: null,
//     strength: "",
//     steps: "",
//     seed: "",
//     uploadImageRequired: false,
//   });

//   const [imageSrc, setImageSrc] = useState(placeholderImage); // Initial placeholder image
//   const [errors, setErrors] = useState({});
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const onImageClick = (image) => {
//     setFormData({ ...formData, image });
//   };

//   const handleToggleChange = (e) => {
//     setFormData({
//       ...formData,
//       uploadImageRequired: e.target.checked,
//       image: e.target.checked ? formData.image : null,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
//     if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
//     else if (!formData.prompt.match(regex))
//       tempErrors.prompt =
//         "Prompt can only contain letters, numbers, commas, and spaces.";
//     if (formData.negativePrompt && !formData.negativePrompt.match(regex))
//       tempErrors.negativePrompt =
//         "Negative Prompt can only contain letters, numbers, commas, and spaces.";
//     if (
//       !formData.cfgScale ||
//       formData.cfgScale < 1.0 ||
//       formData.cfgScale > 20.0
//     )
//       tempErrors.cfgScale =
//         "CFG Scale is required and should be between 1.0 and 20.0.";
//     if (formData.uploadImageRequired && !formData.image)
//       tempErrors.image = "Image is required.";
//     if (
//       !formData.strength ||
//       formData.strength <= 0.0 ||
//       formData.strength > 1.0
//     )
//       tempErrors.strength =
//         "Strength is required and should be between 0.0 and 1.0.";
//     if (!formData.steps || formData.steps < 1 || formData.steps > 1000)
//       tempErrors.steps =
//         "Number of Inference Steps is required and should be between 1 and 1000.";
//     if (!formData.seed) tempErrors.seed = "Seed is required.";
//     else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
//       tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true); // Show loading GIF

//     const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
//     const formDataToSend = new FormData();
//     formDataToSend.append("prompt", formData.prompt + staticSuffix);
//     formDataToSend.append("negativePrompt", formData.negativePrompt || "");
//     formDataToSend.append("cfgScale", formData.cfgScale);
//     formDataToSend.append("strength", formData.strength);
//     formDataToSend.append("steps", formData.steps);
//     formDataToSend.append("seed", formData.seed);
//     if (formData.image) formDataToSend.append("image", formData.image);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/generate",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(new Blob([response.data]));
//       setImageSrc(imageUrl); // Replace loading GIF with the generated image
//       setUploadSuccess(true);
//     } catch (error) {
//       console.error("There was an error sending the form data!", error);
//       setUploadSuccess(false);
//     } finally {
//       setLoading(false); // Hide loading GIF
//     }
//   };

//   const handleSaveImage = () => {
//     const link = document.createElement("a");
//     link.href = imageSrc;
//     link.download = "generated_image.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const summaryData = [
//     {
//       parameter: "prompt",
//       impact: "Detailed prompt results in more specific images",
//       example: `"A serene landscape with mountains"`,
//     },
//     {
//       parameter: "negative_prompt",
//       impact: "Helps to exclude unwanted elements",
//       example: `"Without any watermarks"`,
//     },
//     {
//       parameter: "input_image",
//       impact: "Guides the generation based on the initial image",
//       example: "Using a sketch as the input",
//     },
//     {
//       parameter: "strength",
//       impact: "Higher values make the output closely follow the input image",
//       example: "strength=0.8 for detailed transformation",
//     },
//     {
//       parameter: "cfg_scale",
//       impact: "Balances adherence to prompt and image realism",
//       example: "cfg_scale=10 for strong adherence",
//     },
//     {
//       parameter: "steps",
//       impact: "More steps result in higher quality but take longer",
//       example: "steps=500 for detailed image",
//     },
//     {
//       parameter: "seed",
//       impact: "Ensures reproducibility with the same seed",
//       example: "seed=42 for consistent results",
//     },
//   ];

//   return (
//     <>
//       <NavBar />
//       <Container maxWidth="md" className="text-center mt-8">
//         <Box className="gif-container">
//           <img src={leftGif} alt="Left Gif" className="gif" />
//           <img src={centerGif} alt="Center Gif" className="gif" />
//           <img src={rightGif} alt="Right Gif" className="gif" />
//           <img src={right2Gif} alt="Right Gif" className="gif" />
//         </Box>
//         <Typography
//           variant="h3"
//           sx={{
//             fontFamily: "Jokerman, sans-serif",
//             textAlign: "center",
//             fontSize: "3rem",
//             marginTop: "20px",
//           }}
//         >
//           Generative Origami AI <br /> Artistry Meets Algorithms
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontFamily: "Times New Roman, sans-serif",
//             marginTop: "20px",
//             fontSize: "1.2rem",
//           }}
//         >
//           Unleashing the potential of AI to elevate origami design through
//           innovative workflows and multi-layered feedback loops, merging human
//           creativity with advanced AI-driven processes.
//         </Typography>
//         <TableContainer component={Paper} sx={{ mt: 5 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontSize: "1.0rem",
//                   }}
//                 >
//                   Parameter
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontSize: "1.0rem",
//                   }}
//                 >
//                   Impact on Image Generation
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontSize: "1.0rem",
//                   }}
//                 >
//                   Example
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {summaryData.map((row) => (
//                 <TableRow key={row.parameter}>
//                   <TableCell
//                     align="center"
//                     sx={{ fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}
//                   >
//                     {row.parameter}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{ fontFamily: "Times New Roman, sans-serif", fontSize: "1.0rem" }}
//                   >
//                     {row.impact}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       fontFamily: "Times New Roman, sans-serif",
//                       fontSize: "1.0rem",
//                       fontStyle: "italic",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {row.example}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Paper sx={{ mt: 5, mb: 5 }} square={false} elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Paper elevation={3} sx={{ padding: "20px", m: 2 }}>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="prompt"
//                         label="Prompt"
//                         fullWidth
//                         value={formData.prompt}
//                         onChange={handleChange}
//                         error={!!errors.prompt}
//                         helperText={errors.prompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="negativePrompt"
//                         label="Negative Prompt"
//                         fullWidth
//                         value={formData.negativePrompt}
//                         onChange={handleChange}
//                         error={!!errors.negativePrompt}
//                         helperText={errors.negativePrompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="cfgScale"
//                         label="Classifier-Free Guidance (CFG) Scale"
//                         fullWidth
//                         type="number"
//                         value={formData.cfgScale}
//                         onChange={handleChange}
//                         error={!!errors.cfgScale}
//                         helperText={errors.cfgScale}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={formData.uploadImageRequired}
//                             onChange={handleToggleChange}
//                           />
//                         }
//                         label="Upload Any Photos to Origami-fy It"
//                       />
//                     </Grid>
//                     {formData.uploadImageRequired && (
//                       <Grid item xs={12}>
//                         <Box
//                           sx={{
//                             border: "1px dashed grey",
//                             borderRadius: "4px",
//                             padding: "10px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {formData.image ? (
//                             <img
//                               src={
//                                 formData.image instanceof File
//                                   ? URL.createObjectURL(formData.image)
//                                   : formData.image.img
//                               }
//                               alt="Uploaded"
//                               style={{ maxWidth: "100%", textAlign: "center" }}
//                             />
//                           ) : (
//                             <Typography variant="body2" color="textSecondary">
//                               Image Format PNG/JPEG/JPG (click to upload)
//                             </Typography>
//                           )}
//                           <InputFileUpload handleFileUpload={handleFileChange} />
//                           <Typography variant="h6" gutterBottom>
//                             Or
//                           </Typography>
//                           <Gallery onImageClick={onImageClick} />
//                         </Box>
//                         {errors.image && (
//                           <Typography color="error">{errors.image}</Typography>
//                         )}
//                       </Grid>
//                     )}
//                     <Grid item xs={12}>
//                       <TextField
//                         name="strength"
//                         label="Strength"
//                         fullWidth
//                         type="number"
//                         value={formData.strength}
//                         onChange={handleChange}
//                         error={!!errors.strength}
//                         helperText={errors.strength}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="steps"
//                         label="Number of Inference Steps"
//                         fullWidth
//                         type="number"
//                         value={formData.steps}
//                         onChange={handleChange}
//                         error={!!errors.steps}
//                         helperText={errors.steps}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="seed"
//                         label="Seed"
//                         fullWidth
//                         type="number"
//                         value={formData.seed}
//                         onChange={handleChange}
//                         error={!!errors.seed}
//                         helperText={errors.seed}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button type="submit" variant="contained" color="primary">
//                         Generate
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                   mr: 2,
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   align="center"
//                   sx={{
//                     fontFamily: "Dancing Script, sans-serif",
//                     textAlign: "center",
//                     fontSize: "2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   AI-Generated Origami
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <img
//                   src={loading ? loadingGif : imageSrc} // Show loading GIF or the generated image
//                   alt="Generated"
//                   style={{
//                     width: "100%", // Ensure the image takes up the full width of the container
//                     height: loading ? 'auto' : '550px', // Maintain aspect ratio or set height
//                     borderRadius: "8px",
//                     display: "block", // Add display block to center the image
//                     margin: "0 auto" // Center the image horizontally
//                   }}
//                 />
//                   {loading && (
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontFamily: "Times New Roman, sans-serif",
//                         fontStyle: "italic",
//                         marginTop: "10px",
//                       }}
//                     >
//                       Loading...
//                     </Typography>
//                   )}
//                   {!loading && imageSrc !== placeholderImage && (
//                     <>
//                       <Button
//                         variant="contained"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveImage}
//                         sx={{ mt: 1 }}
//                       >
//                         Download
//                       </Button>
//                       <Typography
//                         variant="h6"
//                         color="success.main"
//                         sx={{
//                           fontFamily: "'Dancing Script', cursive",
//                           textAlign: "center",
//                           fontSize: "1.5rem",
//                           fontWeight: "bold",
//                           mt: 1,
//                         }}
//                       >
//                         ? Your origami masterpiece is ready! <br /> Enjoy and share your creation! ??
//                       </Typography>
//                     </>
//                   )}
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default App;

/////////////////////////////////////////////// Dynamic Placeholder change ////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import NavBar from "./NavBar";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Switch,
//   FormControlLabel,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import InfoIcon from "@mui/icons-material/Info";
// import centerGif from "./assets/giphy4.gif"; // Ensure these paths are correct
// import leftGif from "./assets/bird.gif";
// import rightGif from "./assets/module.gif";
// import right2Gif from "./assets/bird2.gif";
// import placeholderImage from "./assets/placeholder.jpg"; // Ensure this path is correct
// import loadingGif from "./assets/giphy.gif"; // Ensure this path is correct
// import "./App.css"; // Ensure your CSS is imported
// import Gallery from "./Gallery";
// import InputFileUpload from "./InputFileUpload";

// function App() {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     negativePrompt: "",
//     cfgScale: "",
//     image: null,
//     strength: "",
//     steps: "",
//     seed: "",
//     uploadImageRequired: false,
//   });

//   const [imageSrc, setImageSrc] = useState(placeholderImage); // Initial placeholder image
//   const [errors, setErrors] = useState({});
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [dialogOpen, setDialogOpen] = useState(false); // State for dialog

//   const formRef = useRef(null);

//   useEffect(() => {
//     let timeout;

//     const refreshPage = () => {
//       // Clear localStorage to clear cache
//       localStorage.clear();
//       // Reload the page
//       window.location.reload(true);
//     };

//     const resetTimeout = () => {
//       // Clear the previous timeout
//       if (timeout) clearTimeout(timeout);
//       // Set a new timeout to refresh the page after 15 minutes of inactivity
//       timeout = setTimeout(refreshPage, 15 * 60 * 1000); // 15 minutes
//     };

//     // Add event listeners for user activity
//     window.addEventListener("mousemove", resetTimeout);
//     window.addEventListener("keypress", resetTimeout);
//     window.addEventListener("click", resetTimeout);
//     window.addEventListener("scroll", resetTimeout);

//     // Set the initial timeout
//     resetTimeout();

//     // Cleanup event listeners on component unmount
//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keypress", resetTimeout);
//       window.removeEventListener("click", resetTimeout);
//       window.removeEventListener("scroll", resetTimeout);
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const onImageClick = (image) => {
//     console.log("Image clicked from gallery:", image); // Log the image data
//     setFormData({ ...formData, image });
//   };

//   const handleToggleChange = (e) => {
//     setFormData({
//       ...formData,
//       uploadImageRequired: e.target.checked,
//       image: e.target.checked ? formData.image : null,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
//     if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
//     else if (!formData.prompt.match(regex))
//       tempErrors.prompt =
//         "Prompt can only contain letters, numbers, commas, and spaces.";
//     if (formData.negativePrompt && !formData.negativePrompt.match(regex))
//       tempErrors.negativePrompt =
//         "Negative Prompt can only contain letters, numbers, commas, and spaces.";
//     if (
//       !formData.cfgScale ||
//       formData.cfgScale < 1.0 ||
//       formData.cfgScale > 20.0
//     )
//       tempErrors.cfgScale =
//         "CFG Scale is required and should be between 1.0 and 20.0.";
//     if (formData.uploadImageRequired && !formData.image)
//       tempErrors.image = "Please upload an Image!";
//     if (
//       !formData.strength ||
//       formData.strength <= 0.0 ||
//       formData.strength > 1.0
//     )
//       tempErrors.strength =
//         "Strength is required and should be between 0.0 and 1.0.";
//     if (!formData.steps || formData.steps < 1 || formData.steps > 1000)
//       tempErrors.steps =
//         "Number of Inference Steps is required and should be between 1 and 1000.";
//     if (!formData.seed) tempErrors.seed = "Seed is required.";
//     else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
//       tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true); // Show loading GIF

//     const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
//     const formDataToSend = new FormData();
//     formDataToSend.append("prompt", formData.prompt + staticSuffix);
//     formDataToSend.append("negativePrompt", formData.negativePrompt || "");
//     formDataToSend.append("cfgScale", formData.cfgScale);
//     formDataToSend.append("strength", formData.strength);
//     formDataToSend.append("steps", formData.steps);
//     formDataToSend.append("seed", formData.seed);
//     if (formData.image) {
//       console.log("Image being sent:", formData.image); // Log the image being sent
//       formDataToSend.append("image", formData.image);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/generate",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(new Blob([response.data]));
//       setImageSrc(imageUrl); // Replace loading GIF with the generated image
//       setUploadSuccess(true);
//     } catch (error) {
//       console.error("There was an error sending the form data!", error);
//       setUploadSuccess(false);
//     } finally {
//       setLoading(false); // Hide loading GIF
//     }
//   };

//   const handleSaveImage = () => {
//     const link = document.createElement("a");
//     link.href = imageSrc;
//     link.download = "generated_image.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const summaryData = [
//     {
//       parameter: "Prompt",
//       impact: "Detailed prompt results in more specific images",
//       example: `"A serene landscape with mountains"`,
//     },
//     {
//       parameter: "Negative Prompt",
//       impact: "Helps to exclude unwanted elements",
//       example: `"Without any watermarks"`,
//     },
//     {
//       parameter: "Input Image",
//       impact: "Guides the generation based on the initial image",
//       example: "Using a sketch as the input",
//     },
//     {
//       parameter: "Strength",
//       impact: "Higher values make the output closely follow the input image",
//       example: "strength=0.8 for detailed transformation",
//     },
//     {
//       parameter: "Cfg-Scale",
//       impact: "Balances adherence to prompt and image realism",
//       example: "cfg_scale=10 for strong adherence",
//     },
//     {
//       parameter: "Number of Inference Steps",
//       impact: "More steps result in higher quality but take longer",
//       example: "steps=500 for detailed image",
//     },
//     {
//       parameter: "Seed",
//       impact: "Ensures reproducibility with the same seed",
//       example: "seed=42 for consistent results",
//     },
//   ];

//   const handleDialogOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   return (
//     <>
//       <NavBar />
//       <Container maxWidth="md" className="text-center mt-8">
//         <Typography
//           variant="h3"
//           sx={{
//             fontFamily: "Dancing Script, sans-serif",
//             textAlign: "center",
//             fontSize: "3rem",
//             marginTop: "20px",
//           }}
//         >
//           Generative Origami AI
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontFamily: "Times New Roman, sans-serif",
//             marginTop: "20px",
//             fontSize: "1.2rem",
//           }}
//         >
//           Unleashing the potential of AI to elevate origami design through
//           innovative workflows and multi-layered feedback loops, merging human
//           creativity with advanced AI-driven processes.
//         </Typography>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//           <Button
//             variant="text"
//             startIcon={<InfoIcon />}
//             onClick={handleDialogOpen}
//           >
//             Learn More
//           </Button>
//         </Box>
//         <Dialog open={dialogOpen} onClose={handleDialogClose}>
//           <DialogTitle
//             sx={{
//               fontFamily: "Times New Roman, sans-serif",
//               fontWeight: "bold",
//               fontSize: "1.5rem",
//               textAlign: "center",
//             }}
//           >
//             HOW TO USE
//           </DialogTitle>
//           <DialogContent>
//             {summaryData.map((row, index) => (
//               <Box key={index} sx={{ mb: 2 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {row.parameter}
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   sx={{ fontFamily: "Times New Roman, sans-serif" }}
//                 >
//                   {row.impact}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontFamily: "Times New Roman, sans-serif",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   Example: {row.example}
//                 </Typography>
//               </Box>
//             ))}
//           </DialogContent>
//         </Dialog>
//         <Paper sx={{ mt: 5, mb: 5 }} square={false} elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Paper elevation={3} sx={{ padding: "20px", m: 2 }}>
//                 <Box
//                   ref={formRef}
//                   component="form"
//                   onSubmit={handleSubmit}
//                   sx={{ mt: 3 }}
//                 >
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="prompt"
//                         label="Prompt"
//                         fullWidth
//                         value={formData.prompt}
//                         onChange={handleChange}
//                         error={!!errors.prompt}
//                         helperText={errors.prompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="negativePrompt"
//                         label="Negative Prompt"
//                         fullWidth
//                         value={formData.negativePrompt}
//                         onChange={handleChange}
//                         error={!!errors.negativePrompt}
//                         helperText={errors.negativePrompt}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="cfgScale"
//                         label="Classifier-Free Guidance (CFG) Scale"
//                         fullWidth
//                         type="number"
//                         value={formData.cfgScale}
//                         onChange={handleChange}
//                         error={!!errors.cfgScale}
//                         helperText={errors.cfgScale}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={formData.uploadImageRequired}
//                             onChange={handleToggleChange}
//                           />
//                         }
//                         label="Upload Any Picture to Origami-fy It"
//                       />
//                     </Grid>
//                     {formData.uploadImageRequired && (
//                       <Grid item xs={12}>
//                         <Box
//                           sx={{
//                             border: "1px dashed grey",
//                             borderRadius: "4px",
//                             padding: "10px",
//                             marginBottom: "10px",
//                           }}
//                         >
//                           {formData.image ? (
//                             <img
//                               src={
//                                 formData.image instanceof File
//                                   ? URL.createObjectURL(formData.image)
//                                   : formData.image.img
//                               }
//                               alt="Uploaded"
//                               style={{ maxWidth: "100%", textAlign: "center" }}
//                             />
//                           ) : (
//                             <Typography variant="body2" color="textSecondary">
//                               Image Format PNG/JPEG/JPG (click to upload)
//                             </Typography>
//                           )}
//                           <InputFileUpload handleFileUpload={handleFileChange} />
//                           <Typography variant="h6" gutterBottom>
//                             Or
//                           </Typography>
//                           <Gallery onImageClick={onImageClick} />
//                         </Box>
//                         {errors.image && (
//                           <Typography color="error">{errors.image}</Typography>
//                         )}
//                       </Grid>
//                     )}
//                     <Grid item xs={12}>
//                       <TextField
//                         name="strength"
//                         label="Strength"
//                         fullWidth
//                         type="number"
//                         value={formData.strength}
//                         onChange={handleChange}
//                         error={!!errors.strength}
//                         helperText={errors.strength}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="steps"
//                         label="Number of Inference Steps"
//                         fullWidth
//                         type="number"
//                         value={formData.steps}
//                         onChange={handleChange}
//                         error={!!errors.steps}
//                         helperText={errors.steps}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         name="seed"
//                         label="Seed"
//                         fullWidth
//                         type="number"
//                         value={formData.seed}
//                         onChange={handleChange}
//                         error={!!errors.seed}
//                         helperText={errors.seed}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button type="submit" variant="contained" color="primary">
//                         Generate
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                   mr: 2,
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   align="center"
//                   sx={{
//                     fontFamily: "Dancing Script, sans-serif",
//                     textAlign: "center",
//                     fontSize: "2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   AI-Generated Origami
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                  <img
//                   src={loading ? loadingGif : imageSrc} // Show loading GIF or the generated image
//                   alt="Generated"
//                   style={{
//                     width: "100%", // Ensure the image takes up the full width of the container
//                     height: loading ? 'auto' : '450px', // Maintain aspect ratio or set height
//                     borderRadius: "8px",
//                     display: "block", // Add display block to center the image
//                     margin: "0 auto", // Center the image horizontally
//                     marginTop: "40px", // Add spacing from the top of the image (adjust the value as needed)
//                   }}
//                 />
//                   {loading && (
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontFamily: "Times New Roman, sans-serif",
//                         fontStyle: "italic",
//                         marginTop: "10px",
//                       }}
//                     >
//                       Loading...
//                     </Typography>
//                   )}
//                   {!loading && imageSrc !== placeholderImage && (
//                     <>
//                       <Button
//                         variant="contained"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveImage}
//                         sx={{ mt: 1 }}
//                       >
//                         Download
//                       </Button>
//                       <Typography
//                         variant="h6"
//                         color="success.main"
//                         sx={{
//                           fontFamily: "'Dancing Script', cursive",
//                           textAlign: "center",
//                           fontSize: "1.5rem",
//                           fontWeight: "bold",
//                           mt: 1,
//                         }}
//                       >
//                         Your origami masterpiece is ready! <br /> Enjoy and share your creation!
//                         </Typography>
//                     </>
//                   )}
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default App;

///////////////////////////////////////////////// Updated UI Design by professor //////////////////////////////////////////////////


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Switch,
//   FormControlLabel,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import placeholderImage from "./assets/placeholder.jpg"; // Ensure this path is correct
// import loadingGif from "./assets/giphy.gif"; // Ensure this path is correct
// import "./App.css"; // Ensure your CSS is imported
// import Gallery from "./Gallery";
// import InputFileUpload from "./InputFileUpload";
// import NavBar from "./NavBar"; // Import NavBar
// import HeaderText from "./HeaderText"; // Import HeaderText
// import Footer from "./Footer"; // Import Footer

// const summaryData = {
//   prompt: {
//     parameter: "Prompt",
//     impact: "Detailed prompt results in more specific images",
//     example: `"A serene landscape with mountains"`,
//   },
//   negativePrompt: {
//     parameter: "Negative Prompt",
//     impact: "Helps to exclude unwanted elements",
//     example: `"Without any watermarks"`,
//   },
//   cfgScale: {
//     parameter: "Cfg-Scale",
//     impact: "Higher Cfg-Scale value means the image will strictly follow the prompt",
//     example: "cfg_scale=10 for strong to the prompt",
//   },
//   strength: {
//     parameter: "Strength",
//     impact: "Lower values make the output closely follow the input image",
//     example: "strength=0.8 for detailed transformation",
//   },
//   steps: {
//     parameter: "Number of Inference Steps",
//     impact: "More steps result in higher quality but take longer",
//     example: "steps=500 for detailed image",
//   },
//   seed: {
//     parameter: "Seed",
//     impact: "Using a random seed generates varied outputs each time",
//     example: "seed=42 for consistent results",
//   },
// };

// function App() {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     negativePrompt: "",
//     cfgScale: "",
//     image: null,
//     strength: "",
//     steps: "",
//     seed: "",
//     uploadImageRequired: false,
//   });

//   const [imageSrc, setImageSrc] = useState(placeholderImage); // Initial placeholder image
//   const [errors, setErrors] = useState({});
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state

//   const formRef = useRef(null);

//   useEffect(() => {
//     let timeout;

//     const refreshPage = () => {
//       // Clear localStorage to clear cache
//       localStorage.clear();
//       // Reload the page
//       window.location.reload(true);
//     };

//     const resetTimeout = () => {
//       // Clear the previous timeout
//       if (timeout) clearTimeout(timeout);
//       // Set a new timeout to refresh the page after 15 minutes of inactivity
//       timeout = setTimeout(refreshPage, 15 * 60 * 1000); // 15 minutes
//     };

//     // Add event listeners for user activity
//     window.addEventListener("mousemove", resetTimeout);
//     window.addEventListener("keypress", resetTimeout);
//     window.addEventListener("click", resetTimeout);
//     window.addEventListener("scroll", resetTimeout);

//     // Set the initial timeout
//     resetTimeout();

//     // Cleanup event listeners on component unmount
//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keypress", resetTimeout);
//       window.removeEventListener("click", resetTimeout);
//       window.removeEventListener("scroll", resetTimeout);
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const onImageClick = (image) => {
//     console.log("Image clicked from gallery:", image); // Log the image data
//     setFormData({ ...formData, image });
//   };

//   const handleToggleChange = (e) => {
//     setFormData({
//       ...formData,
//       uploadImageRequired: e.target.checked,
//       image: e.target.checked ? formData.image : null,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
//     if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
//     else if (!formData.prompt.match(regex))
//       tempErrors.prompt =
//         "Prompt can only contain letters, numbers, commas, and spaces.";
//     if (formData.negativePrompt && !formData.negativePrompt.match(regex))
//       tempErrors.negativePrompt =
//         "Negative Prompt can only contain letters, numbers, commas, and spaces.";
//     if (
//       !formData.cfgScale ||
//       formData.cfgScale < 1.0 ||
//       formData.cfgScale > 20.0
//     )
//       tempErrors.cfgScale =
//         "CFG Scale is required and should be between 1.0 and 20.0.";
//     if (formData.uploadImageRequired && !formData.image)
//       tempErrors.image = "Please upload an Image!";
//     if (
//       !formData.strength ||
//       formData.strength <= 0.0 ||
//       formData.strength > 1.0
//     )
//       tempErrors.strength =
//         "Strength is required and should be between 0.0 and 1.0.";
//     if (!formData.steps || formData.steps < 1 || formData.steps > 1000)
//       tempErrors.steps =
//         "Number of Inference Steps is required and should be between 1 and 1000.";
//     if (!formData.seed) tempErrors.seed = "Seed is required.";
//     else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
//       tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true); // Show loading GIF

//     const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
//     const formDataToSend = new FormData();
//     formDataToSend.append("prompt", formData.prompt + staticSuffix);
//     formDataToSend.append("negativePrompt", formData.negativePrompt || "");
//     formDataToSend.append("cfgScale", formData.cfgScale);
//     formDataToSend.append("strength", formData.strength);
//     formDataToSend.append("steps", formData.steps);
//     formDataToSend.append("seed", formData.seed);
//     if (formData.image) {
//       console.log("Image being sent:", formData.image); // Log the image being sent
//       formDataToSend.append("image", formData.image);
//     }

//     try {
//       const response = await axios.post(
//         "http://149.165.154.177/api/generate",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(new Blob([response.data]));
//       setImageSrc(imageUrl); // Replace loading GIF with the generated image
//       setUploadSuccess(true);
//     } catch (error) {
//       console.error("There was an error sending the form data!", error);
//       setUploadSuccess(false);
//     } finally {
//       setLoading(false); // Hide loading GIF
//     }
//   };

//   const handleSaveImage = () => {
//     const link = document.createElement("a");
//     link.href = imageSrc;
//     link.download = "generated_image.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const renderImage = () => {
//     if (loading) {
//       return (
//         <img
//           src={loadingGif}
//           alt="Loading"
//           style={{
//             width: "500px",
//             height: "450px",
//             borderRadius: "8px",
//             display: "block",
//             margin: "0 auto",
//             marginTop: "15px",
//           }}
//         />
//       );
//     } else if (imageSrc === placeholderImage) {
//       return (
//         <img
//           src={placeholderImage}
//           alt="Placeholder"
//           style={{
//             width: "500px",
//             height: "500px",
//             borderRadius: "8px",
//             display: "block",
//             margin: "0 auto",
//             marginTop: "15px",
//           }}
//         />
//       );
//     } else {
//       return (
//         <img
//           src={imageSrc}
//           alt="Generated"
//           style={{
//             width: "500px",
//             height: "412px",
//             borderRadius: "8px",
//             display: "block",
//             margin: "0 auto",
//             marginTop: "0px",
//           }}
//         />
//       );
//     }
//   };

//   return (
//     <>
//       <NavBar />
//       <HeaderText />
//       <Container maxWidth="md" sx={{ marginTop: "10px" }}> {/* Increased top margin to 10px */}
//         <Box sx={{ padding: "20px", m: 2 }}>
//           <Typography
//             variant="h3"
//             sx={{
//               fontFamily: "Century Gothic, sans-serif",
//               textAlign: "center",
//               fontSize: "3rem",
//               fontWeight: 549, // Changed font weight to 548
//               marginBottom: "20px", // Reduced bottom spacing
//             }}
//           >
//             Generative Origami AI
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 ref={formRef}
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ mt: 3 }}
//               >
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <TextField
//                         name="prompt"
//                         label="Prompt"
//                         fullWidth
//                         value={formData.prompt}
//                         onChange={handleChange}
//                         error={!!errors.prompt}
//                         helperText={errors.prompt}
//                       />
//                       <Tooltip
//                         title={
//                           <div>
//                             <strong>{summaryData.prompt.parameter}</strong>
//                             <br />
//                             {summaryData.prompt.impact}
//                             <br />
//                             Example: {summaryData.prompt.example}
//                           </div>
//                         }
//                       >
//                         <IconButton sx={{ color: "lightblue" }}>
//                           <HelpOutlineIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <TextField
//                         name="negativePrompt"
//                         label="Negative Prompt"
//                         fullWidth
//                         value={formData.negativePrompt}
//                         onChange={handleChange}
//                         error={!!errors.negativePrompt}
//                         helperText={errors.negativePrompt}
//                       />
//                       <Tooltip
//                         title={
//                           <div>
//                             <strong>{summaryData.negativePrompt.parameter}</strong>
//                             <br />
//                             {summaryData.negativePrompt.impact}
//                             <br />
//                             Example: {summaryData.negativePrompt.example}
//                           </div>
//                         }
//                       >
//                         <IconButton sx={{ color: "lightblue" }}>
//                           <HelpOutlineIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <TextField
//                         name="cfgScale"
//                         label="Classifier-Free Guidance (CFG) Scale"
//                         fullWidth
//                         type="number"
//                         value={formData.cfgScale}
//                         onChange={handleChange}
//                         error={!!errors.cfgScale}
//                         helperText={errors.cfgScale}
//                       />
//                       <Tooltip
//                         title={
//                           <div>
//                             <strong>{summaryData.cfgScale.parameter}</strong>
//                             <br />
//                             {summaryData.cfgScale.impact}
//                             <br />
//                             Example: {summaryData.cfgScale.example}
//                           </div>
//                         }
//                       >
//                         <IconButton sx={{ color: "lightblue" }}>
//                           <HelpOutlineIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <TextField
//                         name="strength"
//                         label="Strength"
//                         fullWidth
//                         type="number"
//                         value={formData.strength}
//                         onChange={handleChange}
//                         error={!!errors.strength}
//                         helperText={errors.strength}
//                       />
//                       <Tooltip
//                         title={
//                           <div>
//                             <strong>{summaryData.strength.parameter}</strong>
//                             <br />
//                             {summaryData.strength.impact}
//                             <br />
//                             Example: {summaryData.strength.example}
//                           </div>
//                         }
//                       >
//                         <IconButton sx={{ color: "lightblue" }}>
//                           <HelpOutlineIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <TextField
//                         name="steps"
//                         label="Number of Inference Steps"
//                         fullWidth
//                         type="number"
//                         value={formData.steps}
//                         onChange={handleChange}
//                         error={!!errors.steps}
//                         helperText={errors.steps}
//                       />
//                       <Tooltip
//                         title={
//                           <div>
//                             <strong>{summaryData.steps.parameter}</strong>
//                             <br />
//                             {summaryData.steps.impact}
//                             <br />
//                             Example: {summaryData.steps.example}
//                           </div>
//                         }
//                       >
//                         <IconButton sx={{ color: "lightblue" }}>
//                           <HelpOutlineIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <TextField
//                         name="seed"
//                         label="Seed"
//                         fullWidth
//                         type="number"
//                         value={formData.seed}
//                         onChange={handleChange}
//                         error={!!errors.seed}
//                         helperText={errors.seed}
//                       />
//                       <Tooltip
//                         title={
//                           <div>
//                             <strong>{summaryData.seed.parameter}</strong>
//                             <br />
//                             {summaryData.seed.impact}
//                             <br />
//                             Example: {summaryData.seed.example}
//                           </div>
//                         }
//                       >
//                         <IconButton sx={{ color: "lightblue" }}>
//                           <HelpOutlineIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControlLabel
//                       control={
//                         <Switch
//                           checked={formData.uploadImageRequired}
//                           onChange={handleToggleChange}
//                         />
//                       }
//                       label="Upload Any Picture to Origami-fy It"
//                     />
//                   </Grid>
//                   {formData.uploadImageRequired && (
//                     <Grid item xs={12}>
//                       <Box
//                         sx={{
//                           border: "1px dashed grey",
//                           borderRadius: "4px",
//                           padding: "10px",
//                           marginBottom: "10px",
//                           textAlign: "center",
//                         }}
//                       >
//                         {formData.image ? (
//                           <img
//                             src={
//                               formData.image instanceof File
//                                 ? URL.createObjectURL(formData.image)
//                                 : formData.image.img
//                             }
//                             alt="Uploaded"
//                             style={{ maxWidth: "100%" }}
//                           />
//                         ) : (
//                           <Typography variant="body2" color="textSecondary">
//                             Image Format PNG/JPEG/JPG (click to upload)
//                           </Typography>
//                         )}
//                         <InputFileUpload handleFileUpload={handleFileChange} />
//                         <Typography variant="body2" color="textSecondary" gutterBottom>
//                           Or
//                         </Typography>
//                         <Gallery onImageClick={onImageClick} />
//                       </Box>
//                       {errors.image && (
//                         <Typography color="error" textAlign="center">{errors.image}</Typography>
//                       )}
//                     </Grid>
//                   )}
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", justifyContent: "center" }}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="success"
//                         sx={{ backgroundColor: "green" }}
//                       >
//                         Generate
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                   justifyContent: "center", // Center content vertically
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   {renderImage()}
//                   {loading && (
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontFamily: "Times New Roman, sans-serif",
//                         fontStyle: "italic",
//                         marginTop: "10px",
//                       }}
//                     >
//                       Loading...
//                     </Typography>
//                   )}
//                   {!loading && imageSrc !== placeholderImage && (
//                     <>
//                       <Button
//                         variant="contained"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveImage}
//                         sx={{ mt: 1 }}
//                       >
//                         Download
//                       </Button>
//                     </>
//                   )}
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//       <Footer />
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import placeholderImage from "./assets/placeholder.jpg"; // Ensure this path is correct
import loadingGif from "./assets/giphy.gif"; // Ensure this path is correct
import "./App.css"; // Ensure your CSS is imported
import Gallery from "./Gallery";
import InputFileUpload from "./InputFileUpload";
import Footer from "./Footer"; // Import Footer

const summaryData = {
  prompt: {
    parameter: "Prompt",
    impact: "Detailed prompt results in more specific images",
    example: `"A serene landscape with mountains"`,
  },
  negativePrompt: {
    parameter: "Negative Prompt",
    impact: "Helps to exclude unwanted elements",
    example: `"Without any watermarks"`,
  },
  cfgScale: {
    parameter: "Prompt Strictness Level",
    impact: "Higher value means the image will strictly follow the prompt",
    example: "Prompt Strictness level=10 for strong to the prompt",
  },
  strength: {
    parameter: "Strength",
    impact: "Lower values make the output closely follow the input image",
    example: "strength=0.8 for detailed transformation",
  },
  steps: {
    parameter: "Number of Inference Steps",
    impact: "More steps result in higher quality but take longer",
    example: "steps=50 for detailed image",
  },
  seed: {
    parameter: "Seed",
    impact: "Using a random seed generates varied outputs each time",
    example: "seed=42 for consistent results",
  },
};

function App() {
  const [formData, setFormData] = useState({
    prompt: "",
    negativePrompt: "",
    cfgScale: "",
    image: null,
    strength: "",
    steps: "",
    seed: "",
    uploadImageRequired: false,
  });

  const [imageSrc, setImageSrc] = useState(placeholderImage); // Initial placeholder image
  const [errors, setErrors] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const formRef = useRef(null);

  useEffect(() => {
    let timeout;

    const refreshPage = () => {
      // Clear localStorage to clear cache
      localStorage.clear();
      // Reload the page
      window.location.reload(true);
    };

    const resetTimeout = () => {
      // Clear the previous timeout
      if (timeout) clearTimeout(timeout);
      // Set a new timeout to refresh the page after 15 minutes of inactivity
      timeout = setTimeout(refreshPage, 15 * 60 * 1000); // 15 minutes
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
    window.addEventListener("click", resetTimeout);
    window.addEventListener("scroll", resetTimeout);

    // Set the initial timeout
    resetTimeout();

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
      window.removeEventListener("click", resetTimeout);
      window.removeEventListener("scroll", resetTimeout);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const onImageClick = (image) => {
    console.log("Image clicked from gallery:", image); // Log the image data
    setFormData({ ...formData, image });
  };

  const handleToggleChange = (e) => {
    setFormData({
      ...formData,
      uploadImageRequired: e.target.checked,
      image: e.target.checked ? formData.image : null,
    });
  };

  const validate = () => {
    let tempErrors = {};
    const regex = /^[a-zA-Z0-9, ]*$/; // Only letters, numbers, commas, and spaces
    if (!formData.prompt) tempErrors.prompt = "Prompt is required.";
    else if (!formData.prompt.match(regex))
      tempErrors.prompt =
        "Prompt can only contain letters, numbers, commas, and spaces.";
    if (formData.negativePrompt && !formData.negativePrompt.match(regex))
      tempErrors.negativePrompt =
        "Negative Prompt can only contain letters, numbers, commas, and spaces.";
    if (
      !formData.cfgScale ||
      formData.cfgScale < 1.0 ||
      formData.cfgScale > 20.0
    )
      tempErrors.cfgScale =
        "CFG Scale is required and should be between 1.0 and 20.0.";
    if (formData.uploadImageRequired && !formData.image)
      tempErrors.image = "Please upload an Image!";
    if (
      !formData.strength ||
      formData.strength <= 0.0 ||
      formData.strength > 1.0
    )
      tempErrors.strength =
        "Strength is required and should be between 0.0 and 1.0.";
    if (!formData.steps || formData.steps < 10 || formData.steps > 100)
      tempErrors.steps =
        "Number of Inference Steps is required and should be between 10 and 100.";
    if (!formData.seed) tempErrors.seed = "Seed is required.";
    else if (formData.seed < 0 || formData.seed > 2 ** 32 - 1)
      tempErrors.seed = "Seed should be between 0 and 2^32 - 1.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); // Show loading GIF

    const staticSuffix = ", ultra sharp, cinematic, 100mm lens, 8k resolution";
    const formDataToSend = new FormData();
    formDataToSend.append("prompt", formData.prompt + staticSuffix);
    formDataToSend.append("negativePrompt", formData.negativePrompt || "");
    formDataToSend.append("cfgScale", formData.cfgScale);
    formDataToSend.append("strength", formData.strength);
    formDataToSend.append("steps", formData.steps);
    formDataToSend.append("seed", formData.seed);
    if (formData.image) {
      console.log("Image being sent:", formData.image); // Log the image being sent
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://149.165.154.177/api/generate",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      const imageUrl = URL.createObjectURL(new Blob([response.data]));
      setImageSrc(imageUrl); // Replace loading GIF with the generated image
      setUploadSuccess(true);
    } catch (error) {
      console.error("There was an error sending the form data!", error);
      setUploadSuccess(false);
    } finally {
      setLoading(false); // Hide loading GIF
    }
  };

  const handleSaveImage = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderImage = () => {
    if (loading) {
      return (
        <img
          src={loadingGif}
          alt="Loading"
          style={{
            width: "512px",
            height: "400px",
            borderRadius: "8px",
            display: "block",
            margin: "0 auto",
            marginTop: "0px",
          }}
        />
      );
    } else if (imageSrc === placeholderImage) {
      return (
        <img
          src={placeholderImage}
          alt="Placeholder"
          style={{
            width: "512px",
            height: "400px",
            borderRadius: "8px",
            display: "block",
            margin: "0 auto",
            marginTop: "0px",
          }}
        />
      );
    } else {
      return (
        <img
          src={imageSrc}
          alt="Generated"
          style={{
            width: "512px",
            height: "400px",
            borderRadius: "8px",
            display: "block",
            margin: "0 auto",
            marginTop: "0px",
          }}
        />
      );
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: "10px" }}> {/* Increased top margin to 10px */}
        <Box sx={{ padding: "20px", m: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Century Gothic, sans-serif",
              textAlign: "center",
              fontSize: "3rem",
              fontWeight: 549, // Changed font weight to 548
              marginBottom: "20px", // Reduced bottom spacing
            }}
          >
            Generative Origami AI
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box
                ref={formRef}
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        name="prompt"
                        label="Prompt"
                        fullWidth
                        value={formData.prompt}
                        onChange={handleChange}
                        error={!!errors.prompt}
                        helperText={errors.prompt}
                      />
                      <Tooltip
                        title={
                          <div>
                            <strong>{summaryData.prompt.parameter}</strong>
                            <br />
                            {summaryData.prompt.impact}
                            <br />
                            Example: {summaryData.prompt.example}
                          </div>
                        }
                      >
                        <IconButton sx={{ color: "lightblue" }}>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        name="negativePrompt"
                        label="Negative Prompt (Do-Not-Include List)"
                        fullWidth
                        value={formData.negativePrompt}
                        onChange={handleChange}
                        error={!!errors.negativePrompt}
                        helperText={errors.negativePrompt}
                      />
                      <Tooltip
                        title={
                          <div>
                            <strong>{summaryData.negativePrompt.parameter}</strong>
                            <br />
                            {summaryData.negativePrompt.impact}
                            <br />
                            Example: {summaryData.negativePrompt.example}
                          </div>
                        }
                      >
                        <IconButton sx={{ color: "lightblue" }}>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        name="cfgScale"
                        label="Prompt Strictness Level (1 - 20)"
                        fullWidth
                        type="number"
                        value={formData.cfgScale}
                        onChange={handleChange}
                        error={!!errors.cfgScale}
                        helperText={errors.cfgScale}
                      />
                      <Tooltip
                        title={
                          <div>
                            <strong>{summaryData.cfgScale.parameter}</strong>
                            <br />
                            {summaryData.cfgScale.impact}
                            <br />
                            Example: {summaryData.cfgScale.example}
                          </div>
                        }
                      >
                        <IconButton sx={{ color: "lightblue" }}>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        name="strength"
                        label="Strength value (0 - 1)"
                        fullWidth
                        type="number"
                        value={formData.strength}
                        onChange={handleChange}
                        error={!!errors.strength}
                        helperText={errors.strength}
                      />
                      <Tooltip
                        title={
                          <div>
                            <strong>{summaryData.strength.parameter}</strong>
                            <br />
                            {summaryData.strength.impact}
                            <br />
                            Example: {summaryData.strength.example}
                          </div>
                        }
                      >
                        <IconButton sx={{ color: "lightblue" }}>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        name="steps"
                        label="Number of Inference Steps (10 - 100)"
                        fullWidth
                        type="number"
                        value={formData.steps}
                        onChange={handleChange}
                        error={!!errors.steps}
                        helperText={errors.steps}
                      />
                      <Tooltip
                        title={
                          <div>
                            <strong>{summaryData.steps.parameter}</strong>
                            <br />
                            {summaryData.steps.impact}
                            <br />
                            Example: {summaryData.steps.example}
                          </div>
                        }
                      >
                        <IconButton sx={{ color: "lightblue" }}>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        name="seed"
                        label="Seed (Any Positive Integer)"
                        fullWidth
                        type="number"
                        value={formData.seed}
                        onChange={handleChange}
                        error={!!errors.seed}
                        helperText={errors.seed}
                      />
                      <Tooltip
                        title={
                          <div>
                            <strong>{summaryData.seed.parameter}</strong>
                            <br />
                            {summaryData.seed.impact}
                            <br />
                            Example: {summaryData.seed.example}
                          </div>
                        }
                      >
                        <IconButton sx={{ color: "lightblue" }}>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.uploadImageRequired}
                          onChange={handleToggleChange}
                        />
                      }
                      label="Upload Any Picture to Origami-fy It"
                    />
                  </Grid>
                  {formData.uploadImageRequired && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          border: "1px dashed grey",
                          borderRadius: "4px",
                          padding: "10px",
                          marginBottom: "10px",
                          textAlign: "center",
                        }}
                      >
                        {formData.image ? (
                          <img
                            src={
                              formData.image instanceof File
                                ? URL.createObjectURL(formData.image)
                                : formData.image.img
                            }
                            alt="Uploaded"
                            style={{ maxWidth: "100%" }}
                          />
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            Image Format PNG/JPEG/JPG (click to upload)
                          </Typography>
                        )}
                        <InputFileUpload handleFileUpload={handleFileChange} />
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Or
                        </Typography>
                        <Gallery onImageClick={onImageClick} />
                      </Box>
                      {errors.image && (
                        <Typography color="error" textAlign="center">{errors.image}</Typography>
                      )}
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ backgroundColor: "green" }}
                      >
                        Generate
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "flex-start", // Align content to the top
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {renderImage()}
                  {loading && (
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Times New Roman, sans-serif",
                        fontStyle: "italic",
                        marginTop: "10px",
                      }}
                    >
                      Loading... 
                    </Typography>
                  )}
                  {!loading && imageSrc !== placeholderImage && (
                    <>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveImage}
                        sx={{ mt: 1 }}
                      >
                        Download
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default App;
