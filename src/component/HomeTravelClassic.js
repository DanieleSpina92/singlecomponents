import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const initialState = { name: "", description: "" };

export default function HomeTravelClassic() {
  const [todos, setTosos] = useState([]);
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    getTodos();
  }, []);



  const getTodos = async (dictListTodos) => {
    await fetch(
      "https://r2zkyb6sf5govdcmrc5ontnfy4.appsync-api.eu-west-1.amazonaws.com/graphql",
      {
        method: "POST",
        body: JSON.stringify({
          query:
            "query MyQuery { listTodos { nextToken items { id name description } }}",
          // query: dictListTodos,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-api-key": "da2-thaodleccnbrjjjseptspo7zli",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTosos(data.data.listTodos.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addTodo() {
    await fetch(
      "https://r2zkyb6sf5govdcmrc5ontnfy4.appsync-api.eu-west-1.amazonaws.com/graphql",
      {
        method: "POST",
        body: JSON.stringify({
          query: `mutation MyMutation {createTodo(input: {description: \"${formState.description}\", name: \"${formState.name}\"}) {id}}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-api-key": "da2-thaodleccnbrjjjseptspo7zli",
        },
      }
    ).catch((err) => {
      console.log(err.message);
    });
  }

  async function deleteSingleTodo(id) {
    await fetch(
      "https://r2zkyb6sf5govdcmrc5ontnfy4.appsync-api.eu-west-1.amazonaws.com/graphql",
      {
        method: "POST",
        body: JSON.stringify({
            //query: `mutation MyMutation {createTodo(input: {description: \"${formState.description}\", name: \"${formState.name}\"}) {id}}`,
            query: `mutation MyMutation {deleteTodo(input: {id: \"${id}\"}) {id}}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-api-key": "da2-thaodleccnbrjjjseptspo7zli",
        },
      }
    ).catch((err) => {
      console.log(err.message);
    });
  }

  return (
    <>
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
        <Button
          variant="contained"
          onClick={addTodo}
          style={{ height: "55px" }}
        >
          Create Todo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250, Width: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              <TableCell style={{ color: "white" }} align="left">
                ID
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                NAME
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                DESCRIPTION
              </TableCell>
              <TableCell style={{ color: "red" }} align="left">
                DELETE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {todo.id}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {todo.name}
                </TableCell>
                <TableCell align="left">{todo.description}</TableCell>
                <TableCell align="left">
                  <DeleteForeverIcon
                    onClick={() => deleteSingleTodo(todo.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
