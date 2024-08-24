// import * as React from "react";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import { styled } from "@mui/system";

// const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
//   overflow: "hidden",
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "scale(1.1)",
//     zIndex: 1,
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
// }));

// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

// export default function ImageListGallery({ onImageClick }) {
//   return (
//     <ImageList
//       sx={{
//         width: "100%",
//         height: 450,
//         cursor: "pointer",
//       }}
//       variant="quilted"
//       cols={4}
//       rowHeight={121}
//     >
//       {itemData.map((item) => (
//         <StyledImageListItem
//           key={item.img}
//           cols={item.cols || 1}
//           rows={item.rows || 1}
//           onClick={() => onImageClick(item)}
//         >
//           <img
//             {...srcset(item.img, 121, item.rows, item.cols)}
//             alt={item.title}
//             loading="lazy"
//           />
//         </StyledImageListItem>
//       ))}
//     </ImageList>
//   );
// }

// const itemData = [
//   {
//     img: "../origami_images/IMG_6626.JPEG",
//     title: "Breakfast",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//     author: "@arwinneil",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//     cols: 2,
//   },
// ];
import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { styled } from "@mui/system";
import axios from "axios";

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
    zIndex: 1,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

export default function ImageListGallery({ onImageClick }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://149.165.154.177/api/images");
        setImages(response.data);
        console.info("Fetched images:", response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <ImageList
      sx={{
        width: "100%",
        height: 450,
        cursor: "pointer",
      }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {images.map((img, index) => (
        <StyledImageListItem
          key={index}
          cols={1}
          rows={1}
          onClick={() => onImageClick({ img })}
        >
          <img
            src={`http://149.165.154.177${img}`}
            alt={`Origami design ${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              console.error(`Failed to load image: http://149.165.154.177${img}`);
              e.target.src = "fallback-image-url.jpg"; // Optionally set a fallback image
            }}
            loading="lazy"
          />
        </StyledImageListItem>
      ))}
    </ImageList>
  );
}
