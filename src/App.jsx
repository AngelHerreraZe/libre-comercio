import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import AppNavBar from './components/AppNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <div className="App">
      <HashRouter >
      <AppNavBar />
      {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/product/:id' element={<ProductDetail />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/purchases' element={<Purchases />}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App