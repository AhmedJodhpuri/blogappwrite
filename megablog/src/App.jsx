import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
// import './index.css';
// import './'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  //when the alpplication loads, ask useeffect of the user is loggedin or not
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => { 
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
     })
    .finally(
      () => setLoading(false)
    )
  } , [])
  
  return !loading ? 
  (<div className='bg-slate-400 min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>

  )
  : null;
}

export default App
