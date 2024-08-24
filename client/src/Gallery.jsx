import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageListGallery from "./ImageListGallery";

export default function Gallery({ onImageClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageClick = (image) => {
    onImageClick(image);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Choose From Gallery
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: "80vh",
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Choose Your Favorite Origami Modular Design!
          </Typography>
          <ImageListGallery onImageClick={handleImageClick} />
        </Box>
      </Modal>
    </div>
  );
}
