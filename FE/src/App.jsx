import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/Client/Home";

const routes = createBrowserRouter([
  //client routes
  {
    element: (<MainLayout />),
    children: [
      {
        path: "/",
        element: <HomePage />,
      }
    ]
  },
  
]);

// Kích hoạt future flag
const routerWithFutureFlag = {
  ...routes,
  future: {
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
  },
};


function App() {
  return <RouterProvider router={routerWithFutureFlag} />;
}

export default App;
