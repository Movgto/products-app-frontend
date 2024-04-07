import { DraftProduct, Product, ProductArraySchema, ProductSchema } from "../types"
import { coerce, safeParse, number, parse } from 'valibot'
import axios from "axios"
import { toBoolean } from "../helpers"

type AddProductArgs = {
  [k: string]: FormDataEntryValue
}

export const addProduct = async (data : AddProductArgs) => {
  console.log(data)

  try {
    const result = safeParse(DraftProduct, {
      name: data.name,
      price: +data.price
    })

    console.log(result)

    if (result.success) {
      console.log("Product validation success!")
      const url = `${import.meta.env.VITE_API_URL}/products`
      await axios.post(url, data)
      
    } else throw new Error('Product validation failed')
  } catch (err) {
    console.log(err)
  }
}

export const updateProduct = async (data : AddProductArgs, id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`

    const NumberSchema = coerce(number(), Number)
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString())
    })

    if (result.success) {
      console.log('Product updated successfully!')
      await axios.put(url, result.output)
    } else {
      throw new Error('Something went wrong while trying to get the product')
    }
  } catch (err) {
    console.log(err)
  }
}

export const deleteProduct = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products`
    const { data } = await axios.get(url)

    const result = safeParse(ProductArraySchema, data.data)

    if (result.success) {
      return result.output
    } else {
      throw new Error('Something went wrong when trying to get the products data')
    }
  } catch(err) {
    console.log(err)
  }
}

export const getProductById = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`
    const { data } = await axios.get(url)

    const result = safeParse(ProductSchema, data.data)

    if (result.success) {
      return result.output
    } else {
      throw new Error('Something went wrong while trying to get the product')
    }
  } catch (err) {
    console.log(err)
  }
}