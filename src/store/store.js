import { configureStore, combineReducers } from '@reduxjs/toolkit'
import errorReducer from './errors'
import { logger } from './middleware/loger'
import taskReducer from './task'

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer
})

function createStore () {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
  }

  )
}
// taskReducer,
// compose(
//   middlewareEnhancer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export default createStore