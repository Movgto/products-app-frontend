import { Form, Link, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { updateProduct, getProductById } from "../services/ProductService"
import { Product } from "../types"

export const action = async ({request, params} : ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData())
  console.log("Form action triggered!")

  let error = ''

  if (Object.values(data).includes('')) {
    error = 'All fields must be filled'
  }

  if (error.length) return error

  await updateProduct(data, +params.id!)

  return redirect('/')
}

export const loader = async ({ params } : LoaderFunctionArgs) => {

  const product = await getProductById(+params.id!)

  return product
}

const AvailabilityOptions = [
  {
    name: 'Available',
    value: 'true'
  },
  {
    name: 'Not available',
    value: 'false'
  }
]

const EditProduct = () => {
  const error = useActionData() as string
  const product = useLoaderData() as Product

  console.log(error)

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-slate-600 text-2xl font-bold">Edit Product</h2>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white p-2 rounded-sm"
        >
          Go to Products
        </Link>
      </div>
      <Form className="mt-3 flex flex-col gap-2" method="POST">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. chocolate, tv screen, computer, etc."
            className="bg-slate-100 p-2"
            defaultValue={product.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="font-bold">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"            
            min="0"
            placeholder="e.g. 29.99"
            className="bg-slate-100 p-2"
            defaultValue={product.price}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="availability" className="font-bold">Price</label>
          <select        
            name="availability"
            id="availability"
            defaultValue={product?.availability.toString()}
            className="bg-slate-100 p-2"
          >
            {AvailabilityOptions.map(item => (
              <option value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value="Save"
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white p-2 w-full rounded-sm font-bold"
        />
      </Form>
    </div>
  )
}

export default EditProduct