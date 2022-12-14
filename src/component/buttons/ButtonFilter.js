import { Button } from "@mui/material";
import React from "react";

const ButtonFilter = ({
  startIcon,
  statusEC2,
  label,
  variant,
  size,
  gridCallBackButtonFilter,
  style,
}) => {
  
  const handleChange = (status) => {
    gridCallBackButtonFilter(status);
  };

  return (
    <Button
      startIcon={startIcon}
      variant={variant}
      size={size}
      onClick={() => handleChange(statusEC2)}
      style={style}
    >
      {label}
    </Button>
  );
};

export default ButtonFilter;
