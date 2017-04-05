import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './app'

const logger = createLogger()


const store = createStore(Reducer, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
