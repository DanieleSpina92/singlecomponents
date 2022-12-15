import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { createTodo } from "../graphql/mutations";

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
