import React from "react";
import FormEC2 from "../forms/FormEC2";
import { insertTodoService } from "../../services/serviceDb";
import { Box } from "@mui/system";
import ButtonFilter from "../buttons/ButtonFilter";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsRugbyIcon from "@mui/icons-material/SportsRugby";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

const Admin = () => {
 
  return (
    <>
      <Box sx={{ "& button": { m: 1 } }}>
        <ButtonFilter
          style={{ borderRadius: "50%", border: "none" }}
          startIcon={<SportsSoccerIcon />}
          statusEC2="Stopped"
          variant="outlined"
          size="small"
        />
        <ButtonFilter
          style={{ borderRadius: "50%", border: "none" }}
          startIcon={<SportsRugbyIcon />}
          statusEC2="Stopped"
          variant="outlined"
          size="small"
        />
        <ButtonFilter
          style={{ borderRadius: "50%", border: "none" }}
          startIcon={<SportsTennisIcon />}
          statusEC2="Stopped"
          variant="outlined"
          size="small"
        />
      </Box>
      <FormEC2 gridCallBackFormEC2={insertTodoService} />
    </>
  );
};

export default Admin;
