import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
import Products from './pages/products/Products'
import ProductDetail from './pages/product-detail'
function App() {

  return (
  <main>
<Router>
  <Routes>
    <Route path='/' element= {<LandingPage/>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/products/:id' element = {<ProductDetail/>}/>
  </Routes>
</Router>
  </main>
  )
}

export default App
