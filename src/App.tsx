import { RouterProvider } from "react-router-dom"
import router from "./router/route"
import { useAppDispatch } from "./redux/hook"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import auth from "./config/firebase.config"
import { setLoading, setUser } from "./redux/features/user/userSlice"
import { ToastContainer } from "react-toastify"

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        dispatch(setUser(user.email))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    })
  },[dispatch])

  return (
    <div className="mx-auto">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
