import { RouterProvider } from "react-router-dom"
import router from "./router/route"

function App() {

  return (
    <div className="mx-auto">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
