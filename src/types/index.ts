import { object, string, number, boolean, Output, array } from 'valibot'

export const DraftProduct = object({
  name: string(),
  price: number()
})

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean()
})

export const ProductArraySchema = array(ProductSchema)

export type Product = Output<typeof ProductSchema>