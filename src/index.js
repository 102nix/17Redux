import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { Provider, useSelector, useDispatch } from "react-redux"
import configureStore from "./store/store"
import { titleChanged, taskDeleted, completeTask, getTasks } from './store/task'

const store = configureStore()

const App = (params) => {
  const state = useSelector((state) => state.entites)
  const isLoading = useSelector((state) => state.isLoading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    console.log(taskId)
    dispatch(taskDeleted(taskId))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map(el => <li key={el.id}>
          <p>{el.title}</p>
          <p>{`Completed: ${el.completed}`}</p>
          <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
          <button onClick={() => changeTitle(el.id)}>Change title</button>
          <button onClick={() => deleteTask(el.id)}>Delete task</button>
          <hr/>
        </li>)}
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
