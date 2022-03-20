import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Routes/home/home.component'
import NavBar from './Routes/navigation/navbar.component'
import Authentication from './Routes/authentication/authentication.component'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<Authentication />} />
      </Route>
    </Routes>
  )
}

const Shop = () => {
  return <div>This is shop component</div>
}

export default App
