abstract class Button {
    public text = ""
    onClick() {
        console.log(this.text + " clicked!")
    }
}
class PrimaryButton extends Button {
    public type = "primary"
    public text = "Primary Button"
}

class SecondaryButton extends Button {
    public type = "secondary"
    public text = "Secondary Button"
}

function buttonFactory(type: "primary" | "secondary") {
    switch (type) {
        case "primary":
            return new PrimaryButton()
        case "secondary":
            return new SecondaryButton()
        default:
            throw new Error(`unknow button type ${type}`)
    }
}

const btn = buttonFactory("secondary")
btn.onClick()
