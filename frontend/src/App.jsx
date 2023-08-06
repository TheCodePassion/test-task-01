import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/global.scss'
import HomeScreen from './screens/HomeScreen'
import AddProfileScreen from './screens/AddProfileScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/profile/:userId" element={<ProfileScreen />} />
        <Route path="/add-profile" element={<AddProfileScreen />} />
      </Routes>
    </Router>
  )
}

export default App
