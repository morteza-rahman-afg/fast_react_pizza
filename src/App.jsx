import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./Features/menu/Menu";
import Cart from "./Features/cart/Cart";
import Order, { loader as loaderOrder } from "./Features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./Features/order/CreateOrder";
import AppLayote from "./ui/AppLayote";
import Error from "./ui/Error";
const router = createBrowserRouter([
  {
    element: <AppLayote />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/:id",
        element: <Order />,
        loader: loaderOrder,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
