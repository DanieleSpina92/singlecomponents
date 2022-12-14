import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

const FormEC2 = ({ gridCallBackFormEC2 }) => {
  const initialState = { name: "", description: "", status: "" };
  const [formState, setFormState] = useState(initialState);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const handleChange = () => {
    gridCallBackFormEC2(formState);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Name"
        onChange={(event) => setInput("name", event.target.value)}
        value={formState.name}
      />
      <TextField
        label="description"
        onChange={(event) => setInput("description", event.target.value)}
        value={formState.description}
        placeholder="Description"
      />
      <TextField
        label="status"
        onChange={(event) => setInput("status", event.target.value)}
        value={formState.status}
        placeholder="Status"
      />
      <Button variant="contained" onClick={handleChange} style={{ height: "55px" }}>
        Create EC2 Machine
      </Button>
    </Box>
  );
};

export default FormEC2;
