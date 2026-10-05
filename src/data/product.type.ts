export type ProductListItem = {
    pid: number
    name: string
    price: number
    imageUrl: string
    hasStock: boolean
}

export type ProductDetail = {
    pid: number
    name: string
    price: number
    imageUrl: string
    description: string
    stock: number | null
}

