class Rectangle {
    constructor(public width: number, public heigth: number) {
    }
    get area() {
        return this.width * this.heigth
    }
    get round() {
        return 2 * (this.width + this.heigth)
    }
}

const rect = new Rectangle(10, 2)
console.log(rect.area)

rect.width = 8

console.log(rect.area)