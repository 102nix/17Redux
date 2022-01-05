import { createSlice } from '@reduxjs/toolkit'
import todosServices from '../services/todos.service'
import { setError } from './errors'

const initialState = {
  entites: [],
  isLoading: true
}

const taskSlice = createSlice({
  name: 'task', 
  initialState, 
  reducers: {
    recived(state, action) {
      state.entites = action.payload
      state.isLoading = false
    },
    update(state,action) {
      const elementIndex = state.entites.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entites[elementIndex] = {...state.entites[elementIndex], ...action.payload}
    },
    remove(state, action) {
      return state.entites.filter(el => el.id !== action.payload.id)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    },
    taskCreate(state, action) {
      console.log(action.payload.state, action.payload.data)
      state.entites = [...action.payload.state, action.payload.data]
    }
  }
})
const { actions, reducer: taskReducer } = taskSlice
const { update, remove, recived, taskRequested, taskRequestFailed, taskCreate } = actions

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosServices.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFailed(error.message))
    dispatch(setError(error.message))
  }
}

export const taskCreated = (val, state) => async (dispatch) => {
  try {
    const data = await todosServices.create(val)
    dispatch(taskCreate({data, state}))
  } catch (error) {
    dispatch(taskRequestFailed(error.message))
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }))
}

export function titleChanged (id) {
  return update({ id, title: `New title for ${id}` })
}

export function taskDeleted (id) {
  return remove({ id })
}

export const getTasks = () => (state) => state.tasks.entites
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading
export default taskReducer