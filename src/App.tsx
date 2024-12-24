import './App.css'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
function App() {

  return (
  <main>
<Router>
  <Routes>
    <Route path='/' element= {<LandingPage/>}/>
  </Routes>
</Router>
  </main>
  )
}

export default App
