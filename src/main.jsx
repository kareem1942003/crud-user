import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Inputs from "./components/Inputs.jsx";
import Outputs from "./components/Outputs.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Outputs />} />
      <Route path="outputs" element={<Outputs />} />
      <Route path="inputs" element={<Inputs />} />
      <Route path="user/:userId" element={<UpdateUser />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
