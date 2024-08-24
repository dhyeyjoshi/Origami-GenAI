// import React from "react";
// import "./NavBar.css";
// import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

// const NavBar = () => {
//   return (
//     <AppBar position="static" sx={{ boxShadow: 1, width: "100%" }}>
//       <Container maxWidth={false} disableGutters>
//         <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <img
//               src="https://assets.iu.edu/brand/3.3.x/trident-large.png"
//               alt="IU Logo"
//               style={{ width: "50px", height: "50px" }}
//             />
//             <Typography
//               variant="h6"
//               component="a"
//               href="https://bloomington.iu.edu/index.html"
//               target="_blank"
//               rel="noopener noreferrer"
//               sx={{
//                 fontWeight: "bold",
//                 textDecoration: "none",
//                 "&:hover": { textDecoration: "underline" },
//               }}
//             >
//               Indiana University Bloomington
//             </Typography>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default NavBar;

import React from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#990000", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "960px", margin: "0 auto" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="//assets.iu.edu/brand/3.3.x/trident-large.png"
            alt="IU Logo"
            style={{ width: "50px", height: "50px", marginRight: "8px" }}
          />
          <Link 
            href="https://bloomington.iu.edu/index.html" 
            target="_blank" 
            rel="noopener"
            underline="none"
            sx={{
              fontFamily: "Century gothic, sans-serif",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "inherit",
              '&:hover': {
                color: "#FFFFFF", // Change text color on hover
                textShadow: "0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF", // Add glow effect
              },
            }}
          >
            Indiana University Bloomington
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
