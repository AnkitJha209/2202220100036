
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
  import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import GetStockInfo from './pages/GetStockInfo.tsx'
import GetCorrelation from './pages/GetCorrelation.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='' element={<GetStockInfo/>}/>
    <Route path='get-correlation' element={<GetCorrelation/>}/>
  </Route>
))
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
