import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

function App() {
  return (
    <div className=" absolute w-full h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
