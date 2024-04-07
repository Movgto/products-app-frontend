import { Link, useLoaderData } from "react-router-dom"
import { getProducts } from "../services/ProductService"
import { Product } from "../types"
import ProductRow from "../components/ProductRow"

export const loader = async () => {
  const products = await getProducts()
  return products
}

const Products = () => {
  const products = useLoaderData() as Product[]

  console.log(products)

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-slate-600 text-2xl font-bold">Products</h2>
        <Link
          to="/products/new"
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white p-2 rounded-sm"
        >
          New Product
        </Link>
      </div>

      <table className="w-full mt-4">
        <thead className="bg-slate-900">
          <tr className="text-white text-xl font-bold">
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Price</p>
            </th>
            <th>
              <p>Availability</p>
            </th>
            <th>
              <p>Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(pro => (
            <ProductRow product={pro} key={pro.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Products
