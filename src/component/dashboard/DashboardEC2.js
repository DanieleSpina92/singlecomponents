import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateTodo } from "../../graphql/subscriptions";
import { Grid } from "@mui/material";
import SetupDashboardItemEC2 from "./DashboardItemEC2";
import {
  getTodosService,
  getTodosMapService,
  getNumberMachineActiveInactiveService,
} from "../../services/service";

const DashboardEC2 = () => {
  const [todos, setTodos] = useState([]);
  const todosNames = [...new Set(todos.flatMap(({ name }) => name))].sort();

  /* GET */
  function getTodos() {
    getTodosService().then((todosList) => {
      setTodos(todosList.items);
    });
  }

  /* PARTE SUBSCRIPTION */
  let subscriptionOnCreate;
  function setupSubscriptions() {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(onCreateTodo)
    ).subscribe({
      next: (todo) => {
        setTodos([...todos, todo]);
      },
    });
  }

  useEffect(() => {
    getTodos();
    setupSubscriptions();
    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <hr />
        <Grid
          container
          spacing={3}
          style={{ display: "flex", marginTop: "50px" }}
        >
          {todosNames.map((todoName, index) => (
            <h3 key={index}>
              <SetupDashboardItemEC2
                todoName={todoName}
                numberMachineEC2={getTodosMapService(todos).get(todoName)}
                numberMachineActive={getNumberMachineActiveInactiveService(
                  todos,
                  todoName,
                  "Active"
                )}
                numberMachineInactive={getNumberMachineActiveInactiveService(
                  todos,
                  todoName,
                  "Stopped"
                )}
              />
            </h3>
          ))}
        </Grid>
      <hr />
    </>
  );
};

export default DashboardEC2;
