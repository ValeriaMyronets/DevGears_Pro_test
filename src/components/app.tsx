import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { useAuth0 } from "@auth0/auth0-react";

const router = createRouter({
  routeTree,
  context: { isAuthenticated: undefined! },
});

function App() {
  const authentication = useAuth0();
  return <RouterProvider router={router} context={{ isAuthenticated: authentication.isAuthenticated }} />;
}

export default App;
