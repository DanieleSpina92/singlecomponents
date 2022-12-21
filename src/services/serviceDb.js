import { API, graphqlOperation } from "aws-amplify";
import { listTodos, getTodo } from "../graphql/queries";
import { createTodo, updateTodo, deleteTodo } from "../graphql/mutations";
import { onCreateTodo, onUpdateTodo, onDeleteTodo } from "../graphql/subscriptions";

/************** SUBSCRIPTIONS ***************************/


// onCreateTodo
export function insertTodoSubscriptionService(callBackFunction) {
  let subscriptionOnCreate;
  try {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(onCreateTodo)
    ).subscribe({
      next: (todo) => {
       callBackFunction(todo)
      },
    });
    return subscriptionOnCreate;
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}

// onUpdateTodo
export async function updateTodoSubscriptionService(formState) {
  try {
    
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}

// onDeleteTodo
export async function deleteTodoSubscriptionService(formState) {
  try {
    
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}


/************** MUTATIONS ***************************/
export async function insertTodoService(formState) {
  try {
    if (!formState.name || !formState.description || !formState.status)
    return;
    const todo = { ...formState };
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}

export async function updateTodoService(todo) {
  try {
    const todoDetails = {
      id: todo.id,
      _version: todo._version,
      status: todo.status == "Active" ? "Stopped" : "Active",
    };
    await API.graphql({
      query: updateTodo,
      variables: { input: todoDetails },
    });
  } catch (err) {
    console.log("error creating todo:", err);
  }
}


export async function deleteTodoService(id, version) {
  try {
    const todoDetails = {
      id: id,
      _version: version
    };
    await API.graphql({ query: deleteTodo, variables: {input: todoDetails}});
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}

/************** QUERIES ***************************/

export async function getTodosService() {
  try {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    if(todoData){
      let ProcessResults = todoData;
      return ProcessResults.data.listTodos;
  }
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}


export async function getTodoItemService() {
  try {
    const todoData = await API.graphql(graphqlOperation(getTodo));
    if(todoData){
      let ProcessResults = todoData;
      return ProcessResults.data.listTodos;
  }
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}

export async function getTodosServiceWithFilter(isActive) {
  try {
    const todoData = await API.graphql(graphqlOperation(listTodos, {
      filter: {
          status: {
            eq: isActive === "Active" ? "Active" : "Stopped"
          }
      }
    }));
    if(todoData){
      let ProcessResults = todoData;
      return ProcessResults.data.listTodos;
  }
  } catch (err) {
    console.log("error fetching todos: ", err);
  }
}


/************** UTILS ***************************/
export function getTodosMapService(todos) {
  return new Map(todos.map((i) => [i.name, todos.filter((item) => item.name === i.name).length]));
}  


export function getNumberMachineActiveInactiveService(todos, name, typeStatus) {
  const todosOrderByName = [...new Set(todos)].sort();
  const todosActiveInactiveMap = new Map(
    todosOrderByName.map((i) => [
      i.name,
      countTodosActiveInactive(i.name, typeStatus, todosOrderByName),
    ])
  );
  return todosActiveInactiveMap.get(name);
}


function countTodosActiveInactive(name, status, todosOrderByName) {
  return todosOrderByName
    .filter((item) => item.status === status)
    .filter((item) => item.name === name).length;
}

