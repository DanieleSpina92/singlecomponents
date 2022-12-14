import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, updateTodo } from "../../graphql/mutations";
import { onCreateTodo } from "../../graphql/subscriptions";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SetupItemEC2 from "./SetupItemEC2";
import {
  getTodosService,
  getTodosServiceWithFilter,
  insertTodoService
} from "../../services/service";
import FormEC2 from "../forms/FormEC2";
import ButtonFilter from "../buttons/ButtonFilter";


const SetupEC2 = () => {
  const [todos, setTodos] = useState([]);

  /* GET */
  function getTodos() {
    getTodosService().then((todosList) => {
      setTodos(todosList.items);
    });
  }

  function getTodosActiveWithFilter(isActive) {
    getTodosServiceWithFilter(isActive).then((todosList) => {
      setTodos(todosList.items);
    });
  }

  /* PARTE SUBSCRIPTION */
  let subscriptionOnCreate;
  function setupSubscriptions() {
    subscriptionOnCreate = API.graphql(graphqlOperation(onCreateTodo))
    .subscribe({
      next: (todo) => {
        setTodos([...todos, todo]);
      },
    });
  }

  useEffect(() => {
    getTodosActiveWithFilter("Active");
    setupSubscriptions();
    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, []);


  return (
    <>
     
      <br />
      <Box sx={{ "& button": { m: 1 } }}>
        <ButtonFilter
          statusEC2='Stopped' 
          label="Stopped EC2"
          variant="outlined"
          size="small"
          gridCallBackButtonFilter={getTodosActiveWithFilter}
        />
        <ButtonFilter 
          statusEC2='Active'
          label="Active EC2"
          variant="outlined"
          size="medium"
          gridCallBackButtonFilter={getTodosActiveWithFilter}
        />
        <ButtonFilter 
          label="All EC2"
          variant="outlined"
          size="large"
          gridCallBackButtonFilter={getTodos}
        />
      </Box>
      <Grid container spacing={3}>
        {todos.map((todo) => (
          <SetupItemEC2 key={todo.id} todo={todo} />
        ))}
      </Grid>
    </>
  );
};

export default SetupEC2;
