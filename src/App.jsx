import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { RecipesForm } from './pages/RecipesForm'
import { Recipes } from './pages/Recipes'

import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Header } from './components/Header'
import { PwReset } from './pages/PwReset'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
    <Header/>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/recipes' element={<Recipes />}></Route>
          <Route path='/addnew' element={<RecipesForm />}></Route>
          <Route path='/edit/:id' element={<RecipesForm />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/pwreset' element={<PwReset />}></Route>

      </Routes>
    </div>
  )
}

export default App
