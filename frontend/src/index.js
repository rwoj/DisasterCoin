import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { history } from './store/store'
import { ConnectedRouter } from 'react-router-redux'
import * as contracts from './contracts'

import { Connect } from 'uport-connect'

window.uport = new Connect('ReCover')

contracts.init().then(() => {
    ReactDOM.render(
      (<Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>),
      document.getElementById('root')
    )
    registerServiceWorker()
    // Now you can dispatch navigation actions from anywhere!
    // store.dispatch(push('/foo'))
})
