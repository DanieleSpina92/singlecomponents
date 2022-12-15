import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateTodo } from "../../graphql/subscriptions";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import SetupItemEC2 from "./SetupItemEC2";
import {
  getTodosService,
  getTodosServiceWithFilter,
} from "../../services/serviceDb";
import ButtonFilter from "../buttons/ButtonFilter";
import InternalNavbar from "../navbar/InternalNavbar";


const SetupEC2 = () => {

  const [todos, setTodos] = useState([]);

  /* GET */
  function getTodos() {
    getTodosService().then((todosList) => {
      setTodos(todosList.items);
    });
  }

  function getTodosActiveInactiveWithFilter(isActive) {
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
    getTodosActiveInactiveWithFilter("Active");
    setupSubscriptions();
    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, []);


  const listLinks = ["Event", "Gallery", "Audio" ]
  const [showEvent, setEvent] = useState(true)
  const [showGallery, setGallery] = useState(false)
  const [showAudio, setAudio] = useState(false)

  return (
    <>
     <div>
      <InternalNavbar elements={listLinks} action={internalActive}></InternalNavbar>
      {
        showEvent &&
        <div>Component Event</div>
      }
      {
        showGallery &&
        <div>Component Gallery</div>
      }
      {
        showAudio &&
        <div>Component Audio</div>
      }
     </div>
      <br />


      <Box sx={{ "& button": { m: 1 } }}>
        <ButtonFilter
          statusEC2='Stopped' 
          label="Stopped EC2"
          variant="outlined"
          size="small"
          gridCallBackButtonFilter={getTodosActiveInactiveWithFilter}
        />
        <ButtonFilter 
          statusEC2='Active'
          label="Active EC2"
          variant="outlined"
          size="medium"
          gridCallBackButtonFilter={getTodosActiveInactiveWithFilter}
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
  function internalActive(text) {
    switch (text) {
      case listLinks[0]:
        setEvent(true)
        setGallery(false)
        setAudio(false)
        break;
      case listLinks[1]:
        setEvent(false)
        setGallery(true)
        setAudio(false)
        break;
      case listLinks[2]:
        setEvent(false)
        setGallery(false)
        setAudio(true)
        break;
      default:
        break;
    }
  }
};

export default SetupEC2;
