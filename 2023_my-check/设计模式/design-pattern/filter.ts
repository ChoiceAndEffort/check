class Filter<T> {
    constructor(private criteria: (i: T) => boolean) { }
    meetCriteria(elems: Array<T>) {
        return elems.filter(i => this.criteria(i))
    }
}

class PriceFilter extends Filter<Product>{
    constructor(price: number) {
        super(i => i.price > price)
    }
}

class BrandFilter extends Filter<Product>{
    constructor(brand: "A" | "B" | "C") {
        super(i => i.brand == brand)
    }
}

type Product = {
    name: string
    price: number,
    brand: "A" | "B" | "C"
}

const products: Array<Product> = [
    { name: "Product A", price: 10, brand: "A" },
    { name: "Product B", price: 20, brand: "A" },
    { name: "Product C", price: 30, brand: "A" },
    { name: "Product D", price: 40, brand: "B" },
    { name: "Product E", price: 50, brand: "B" },
    { name: "Product F", price: 60, brand: "C" },
    { name: "Product G", price: 70, brand: "C" },
]

const priceFilter = new PriceFilter(40)
const brandFilter = new BrandFilter("C")


const filteredPrice = priceFilter.meetCriteria(products)
const res = brandFilter.meetCriteria(filteredPrice)

console.log(res)


const result = products.filter(i => i.price > 40).filter(i => i.brand == "C")
console.log(result)