import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { Provider } from 'react-redux'
import { store } from './rtk/store/store'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App><RouterProvider router={router} /></App>
    </Provider>
  </StrictMode>
)
