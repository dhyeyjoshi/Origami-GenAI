import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "20px 0",
        marginTop: "20px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "960px", // Reduced max-width
          width: "100%",
          paddingLeft: ".9375rem", // Padding inline
          paddingRight: ".9375rem", // Padding inline
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "25px",
          }}
        >
          <img
            src="//assets.iu.edu/brand/3.3.x/iu-sig-formal.svg"
            alt="Indiana University"
            style={{ width: "225px", height: "75px" }}
          />
        </Box>
        <Typography variant="body2" color="textSecondary" component="p" sx={{ fontSize: '13px' }}>
          <Link
            href="https://accessibility.iu.edu/"
            target="_blank"
            rel="noopener"
            sx={{ color: "#990000", textDecoration: "none", mx: 1 }}
            style={{ margin: "0 5px" }}
          >
            Accessibility
          </Link>
          |
          <Link
            href="https://privacy.iu.edu/"
            target="_blank"
            rel="noopener"
            sx={{ color: "#990000", textDecoration: "none", mx: 1 }}
            style={{ margin: "0 5px" }}
          >
            Privacy Notice
          </Link>
          |
          <Link
            href="https://copyright.iu.edu/"
            target="_blank"
            rel="noopener"
            sx={{ color: "#990000", textDecoration: "none", mx: 1 }}
            style={{ margin: "0 5px" }}
          >
            Copyright
          </Link>
          © 2024 Developed by
          <Link
            href="https://eskenazi.indiana.edu/faculty/directory/wu-jiangmei.html"
            target="_blank"
            rel="noopener"
            sx={{ color: "#990000", textDecoration: "none", mx: 1 }}
            style={{ margin: "0 5px" }}
          >
            Jiangmei Wu
          </Link>
          with 
          <Link
            href="https://www.linkedin.com/in/dhyey-joshi12/"
            target="_blank"
            rel="noopener"
            sx={{ color: "#990000", textDecoration: "none", mx: 1 }}
            style={{ margin: "0 5px" }}
          >
            Dhyey Joshi
          </Link>.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
