class Singleton {
    static instance: Singleton | null = null

    prop1 = "111"
    prop2 = "222"
    constructor() {
        if (Singleton.instance != null) {
            return Singleton.instance
        }
        Singleton.instance = this
    }
}

const instance1 = new Singleton()
instance1.prop2 = "000"
const instance2 = new Singleton()
const instance3 = new Singleton()

console.log(instance1 == instance2)


class Singleton2 {
    static instance: Singleton2 | null = null

    static getInstance() {
        if (Singleton2.instance != null) {
            return Singleton2.instance
        }
        return Singleton2.instance = new Singleton2()
    }
    prop1 = "111"
    prop2 = "222"
    private constructor() {
    }
}

const obj = Singleton2.getInstance()
const obj2 = Singleton2.getInstance()
console.log(obj == obj2)

// 不允许使用
// const obj3 = new Singleton2()

