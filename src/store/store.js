import { configureStore } from '@reduxjs/toolkit'
import { logger } from './middleware/loger'
import taskReducer from './task'

function createStore () {
  return configureStore({
    reducer: taskReducer,
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