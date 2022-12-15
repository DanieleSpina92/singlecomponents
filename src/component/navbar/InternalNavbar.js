import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const InternalNavbar = ({elements , action}) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#AADB1E"}} position="static">
        <Toolbar>
          {elements.map((el, index) => (
            <Typography style={{ margin: "10px" }} key={index}>
              <Link 
                style={{ color: "#808080" }} 
                to={"#"+el.toLowerCase()}
                onClick={()=> action(el)} 
                className="Link"
                
              >
                {el}
              </Link>
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );

};

export default InternalNavbar;
