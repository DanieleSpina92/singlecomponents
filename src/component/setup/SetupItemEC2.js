import React from "react";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Person2Icon from "@mui/icons-material/Person2";
import { updateTodo } from "../../graphql/mutations";
import { API } from "aws-amplify";

const SetupItemEC2 = ({ todo }) => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  async function updateTodoElement() {
    try {
      const todoDetails = {
        id: todo.id,
        _version: todo._version,
        status: todo.status == "Active" ? "Stopped" : "Active",
      };
      const updatedTodo = await API.graphql({
        query: updateTodo,
        variables: { input: todoDetails },
      });
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <Grid item xs={4}>
      <Item>
        <Person2Icon
          style={{
            border: "3px solid grey",
            borderRadius: "50%",
            marginRight: "80px",
          }}
        />

        <FormGroup style={{ marginRight: "100px" }}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
        </FormGroup>

        <FormGroup style={{ position: "relative", top: "-0.5em" }}>
          <FormControlLabel
            control={
              <Switch
                checked={todo.status == "Active" ? true : false}
                onClick={() => updateTodoElement()}
                color={todo.status == "Active" ? "success" : "warning"}
              />
            }
          />
          <div></div>
        </FormGroup>
      </Item>
    </Grid>
  );
};

export default SetupItemEC2;
