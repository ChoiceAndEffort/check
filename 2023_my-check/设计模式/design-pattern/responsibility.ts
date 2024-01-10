type MyRequest = string

class Handle {
	constructor(private nextHandle?: Handle) { }
	setNextHandle(nextHandle: Handle) {
		this.nextHandle = nextHandle
	}
	handleRequest(req: MyRequest) {
		if (this.nextHandle) {
			this.nextHandle.handleRequest(req)
		}
	}
}

class Handle1 extends Handle {
	handleRequest(req: string) {
		// 请求来的时候做的事
		console.log("Handle1 开始处理 " + req)
		// 不满足用户已登录
		// if (!user.hasLogin) { return }
		super.handleRequest(req)
		// 请求处理完做的事
		console.log("Handle1 处理完毕 " + req)
	}
}

class Handle2 extends Handle {
	handleRequest(req: string) {
		// 请求来的时候做的事
		console.log("Handle2 开始处理 " + req)
		super.handleRequest(req)
		// 请求处理完做的事
		console.log("Handle2 处理完毕 " + req)
	}
}

const handle1 = new Handle1()
const handle2 = new Handle2()

handle1.setNextHandle(handle2)


handle1.handleRequest("request 1")
handle1.handleRequest("request 2")
handle1.handleRequest("request 3")

