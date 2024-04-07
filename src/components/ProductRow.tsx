import { Link, Form, ActionFunctionArgs, redirect } from "react-router-dom"
import { Product } from "../types"
import { formatPrice } from "../helpers"
import { deleteProduct } from "../services/ProductService"

type ProductRowProps = {
  product: Product
}

export const action = async ({ params } : ActionFunctionArgs) => {
  console.log('Delete button clicked!')
  console.log('Product id:', params.id)
  
  await deleteProduct(+params.id!)
  
  return redirect('/')
}

const ProductRow = ({ product } : ProductRowProps) => {
  return (
    <tr className="border-b text-center text-xl text-zinc-700">
      <td>
        <p>{product.name}</p>
      </td>
      <td>
        <p>{formatPrice(product.price)}</p>
      </td>
      <td>
        <p className={`${product.availability ? 'text-black' : 'text-white bg-red-600'}`}>
          {product.availability ? 'Available' : 'Not Available'}
        </p>
      </td>
      <td className="flex justify-around items-center">
        <Link
          to={`/products/${product.id}/edit`}
          className="bg-blue-600 hover:bg-blue-800 text-white cursor-pointer px-4 text-xs uppercase font-bold rounded-sm"
        >
          Edit
        </Link>
        <Form
          method="POST"
          action={`/products/${product.id}/delete`}
          className="bg-red-600 hover:bg-red-800 text-white cursor-pointer px-4 text-xs uppercase font-bold rounded-sm"
          onSubmit={e => {
            if (!confirm('Do you want to delete this product?')) {
              e.preventDefault()
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </td>
    </tr>
  )
}

export default ProductRow
