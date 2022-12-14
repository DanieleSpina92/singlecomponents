import { Box } from "@mui/material";
import React from "react";
import ButtonFilter from "../buttons/ButtonFilter";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsRugbyIcon from "@mui/icons-material/SportsRugby";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
const Mytask = () => {
  function getTodosActive(isActive) {}

  return (
    <div style={{backgroundColor: '#AADB1E'}}>
      <Box sx={{ "& button": { m: 1 } }}>
        <ButtonFilter
          style={{ borderRadius: "50%", border: "none" }}
          startIcon={<SportsSoccerIcon />}
          statusEC2="Stopped"
          //label="Stopped EC2"
          variant="outlined"
          size="small"
          gridCallBackButtonFilter={getTodosActive}
        />
        <ButtonFilter
          style={{ borderRadius: "50%", border: "none" }}
          startIcon={<SportsRugbyIcon />}
          statusEC2="Stopped"
          //label="Stopped EC2"
          variant="outlined"
          size="small"
          gridCallBackButtonFilter={getTodosActive}
        />
        <ButtonFilter
          style={{ borderRadius: "50%", border: "none" }}
          startIcon={<SportsTennisIcon />}
          statusEC2="Stopped"
          //label="Stopped EC2"
          variant="outlined"
          size="small"
          gridCallBackButtonFilter={getTodosActive}
        />
      </Box>
    </div>
  );
};

export default Mytask;
