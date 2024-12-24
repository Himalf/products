import './App.css'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
import Products from './pages/products/Products'
function App() {

  return (
  <main>
<Router>
  <Routes>
    <Route path='/' element= {<LandingPage/>}/>
    <Route path='/products' element={<Products/>}/>
  </Routes>
</Router>
  </main>
  )
}

export default App
