class MyEvent {

    private eventMap: Record<string, Array<Function>> = {}

    addEvent(eventName: string, callback: Function) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = []
        }
        this.eventMap[eventName].push(callback)
    }
    removeEvent(eventName: string, callback: Function) {
        if (!this.eventMap[eventName]) {
            return
        }
        this.eventMap[eventName] = this.eventMap[eventName].filter(i => i != callback)
    }

    triggerEvent(eventName: string, ...data: any) {
        if (!this.eventMap[eventName]) {
            return
        }

        this.eventMap[eventName].forEach(cb => cb(...data))
    }
}

const myEvent = new MyEvent()

myEvent.addEvent("click", (...data) => console.log("click 1", data))
myEvent.addEvent("click", () => console.log("click 2"))
const click3Cb = () => console.log("click 3")
myEvent.addEvent("click", click3Cb)
myEvent.removeEvent("click", click3Cb)


myEvent.addEvent("move", () => console.log("move 1"))
myEvent.addEvent("move", () => console.log("move 2"))
myEvent.addEvent("move", () => console.log("move 3"))

myEvent.triggerEvent("click", "a", "b")