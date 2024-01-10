
export function log() {
  return function (target: Object, propertyKey: string | symbol, descripter: TypedPropertyDescriptor<(num: number) => number>) {
    const originalMethor = descripter.value

    descripter.value = function (...args) {
      console.log(propertyKey as string + "调用了, 参数:", args)
      const res = originalMethor.apply(this, args)
      console.log(propertyKey as string + "调用完成, 结果:", res)
      return res
    }

    return descripter
  }
}
class Ops {
  public amount = 100
  @log()
  deposit(num: number) {
    console.log("用户存了" + num)
    this.amount += num
    return this.amount
  }

  @log()
  withdraw(num: number) {
    console.log("用户取了" + num)
    this.amount -= num
    return this.amount
  }
}

const ops = new Ops()
ops.deposit(100000)