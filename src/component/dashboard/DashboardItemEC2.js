import { FormGroup, Grid, Paper } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const SetupDashboardItemEC2 = ({
  todoName,
  numberMachineEC2,
  numberMachineActive,
  numberMachineInactive,
}) => {
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
   ...theme.typography.body2,
    padding: theme.spacing(1),
   // textAlign: "center",
   marginRight: '30px',
   color: theme.palette.text.secondary,
    height: '120px',
  width: '300px',
  }));

  return (
    <>
      <Grid item xs={4}>
        <Item>
          <FormGroup>
          <div style={{display: 'flex'}}>
            <div
              style={{
               marginRight: '30px',
               paddingLeft: '40px'
              }}
            >
              <h1>{numberMachineEC2}</h1>
            </div>
            <div>
              <h6>{todoName}</h6>
              <p style={{ color: "#32de84" }}>{numberMachineActive} - Active</p>
              <p style={{ color: "red" }}>{numberMachineInactive} - Failed</p>
            </div>
            </div>
          </FormGroup>
        </Item>
      </Grid>
    </>
  );
};

export default SetupDashboardItemEC2;
