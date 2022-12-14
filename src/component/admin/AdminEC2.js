import React from 'react'
import FormEC2 from '../forms/FormEC2'
import { insertTodoService } from "../../services/service";
const Admin = () => {
  return (
    <FormEC2 
        gridCallBackFormEC2={insertTodoService}
      />
  )
}

export default Admin