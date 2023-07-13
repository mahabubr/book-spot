import { RouterProvider } from "react-router-dom"
import router from "./router/route"

function App() {

  return (
    <div className="container w-11/12 mx-auto">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
