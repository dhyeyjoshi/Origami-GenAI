import React, { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import { Typewriter } from 'react-simple-typewriter';

const HeaderText = () => {
  const [eskenaziDone, setEskenaziDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEskenaziDone(true);
    }, 3000); // Adjust timing to match the end of the "Eskenazi School" typewriter effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        padding: "10px 0",
        backgroundColor: "white", // Adjust background color if needed
        paddingLeft: "0px", // Add left margin space
      }}
    >
      <Typography
        variant="h6"
        sx={{ 
          fontFamily: "Arial, sans-serif", 
          fontSize: "30px",
          marginBottom: "-5px",
          marginLeft: "20px", // Harshly reduce the spacing between contents
          display: "flex",
          alignItems: "center",
        }}
      >
        {!eskenaziDone ? (
          <Typewriter
            words={['Eskenazi School']}
            loop={1} // Run only once
            cursor={false}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onDone={() => setEskenaziDone(true)}
          />
        ) : (
          <Link 
            href="https://eskenazi.indiana.edu/" 
            target="_blank" 
            underline="none"
            sx={{ color: "black" }}
          >
            Eskenazi School
          </Link>
        )}
        {/* Add the infinite blinking cursor */}
        <Typewriter
          words={['|']}
          loop={0} // Infinite loop
          typeSpeed={500}
          deleteSpeed={500}
          delaySpeed={0}
        />
      </Typography>
      <Typography
        variant="h6"
        sx={{ 
          fontFamily: "Arial, sans-serif", 
          fontWeight: "bold", 
          fontSize: "30px",
          marginTop: "-5px",
          marginLeft: "20px", // Harshly reduce the spacing between contents
        }}
      >
        <Link 
          href="https://eskenazi.indiana.edu/" 
          target="_blank" 
          underline="none"
          sx={{ color: "black" }}
        >
          <Typewriter
            words={['of Art, Architecture + Design']}
            loop={0} // Infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000} // Adjust delay to sync with the previous line
          />
        </Link>
      </Typography>
      {/* Add a black line below the header text */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "black",
          marginTop: "10px", // Adjust the margin as needed
        }}
      ></Box>
    </Box>
  );
};

export default HeaderText;
