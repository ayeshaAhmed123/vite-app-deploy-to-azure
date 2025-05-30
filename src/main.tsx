
import App from './App.tsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './shared/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)