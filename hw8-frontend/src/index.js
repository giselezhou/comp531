import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { setupMain } from'./components/landing/authActions'
import Reducer from './reducers'
import App from './app'
import thunk from 'redux-thunk'
const logger = createLogger()


const store = createStore(Reducer, applyMiddleware(thunk))
store.dispatch(setupMain())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
