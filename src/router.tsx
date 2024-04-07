import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader } from "./views/Products";
import NewProduct, { action as newProductAction} from "./views/NewProduct";
import EditProduct, { action as editProductAction, loader as editProductLoader } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductRow";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader
      },
      {
        path: 'products/new',
        element: <NewProduct />,
        action: newProductAction
      },
      {
        path: 'products/:id/edit',
        element: <EditProduct />,
        action: editProductAction,
        loader: editProductLoader
      },
      {
        path: 'products/:id/delete',
        action: deleteProductAction
      }
    ]
  }
])

export default router;