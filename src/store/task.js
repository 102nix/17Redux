import { createAction, createSlice } from '@reduxjs/toolkit'
import todosServices from '../services/todos.service'

const initialState = {
  entites: [],
  isLoading: true,
  error: null
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
      state.error = action.payload
      state.isLoading = false
    }
  }
})
const { actions, reducer: taskReducer } = taskSlice
const { update, remove, recived, taskRequested, taskRequestFailed } = actions

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosServices.fetch()
    dispatch(recived(data))
    console.log(data)
  } catch (error) {
    dispatch(taskRequestFailed(error.message))
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
export default taskReducer