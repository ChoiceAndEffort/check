
class Receiver {
    amount: number = 0

    execute(...args: any) {
        const action = args[0]
        if (action == 'deposit') {
            this.amount += args[1]
        } else if (action == 'withdraw') {
            this.amount -= args[1]
        }
    }
    undo(...args: any) {
        const action = args[0]
        if (action == 'deposit') {
            this.amount -= args[1]
        } else if (action == 'withdraw') {
            this.amount += args[1]
        }
    }
}

class Command {
    public receiver: Receiver
    public args: any[]
    public executed: boolean = false
    constructor(receiver: Receiver, ...args: any) {
        this.receiver = receiver
        this.args = args
    }
    execute() {
        if (!this.executed) {
            this.receiver.execute(...this.args)
            this.executed = true
        }
    }
    undo() {
        if (this.executed) {
            this.receiver.undo(...this.args)
            this.executed = false
        }
    }
}


// const receiver = new Receiver()

// const command1 = new Command(receiver, "deposit", 100)
// const command2 = new Command(receiver, "deposit", 300)
// const command3 = new Command(receiver, "deposit", 10)

// const myHistory = [command1, command2, command3]

// myHistory.forEach(command => {
//     command.execute()
// });

// console.log(receiver)


type State = {
    amount: number
}

type Action = {
    type: "deposit" | "withdraw"
    num: number
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "deposit":
            return {
                amount: state.amount + action.num
            }
        case "withdraw":
            return {
                amount: state.amount - action.num
            }
        default: throw new Error("No this Action: " + action.type)
    }
}

const action1 = { type: "deposit" as const, num: 100 }
const action2 = { type: "deposit" as const, num: 300 }
const action3 = { type: "deposit" as const, num: 10 }


const myHistory = [action1, action2, action3]

let state: State = {
    amount: 0
}
myHistory.forEach(action => {
    state = reducer(state, action)
})

console.log(state)
