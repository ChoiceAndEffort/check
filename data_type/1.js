//基本数据类型
// Number ,String , Boolean ,Null,Undefined , symbol（符号）

//引用数据类型
  Object


//获取数据类型
// Number ,String , Boolean ,undefined使用typeof可以获取数据类型
//let a=null使用typeof 获取数据类型得到的是object



// null和undefined的区别
// 1.Undefined 的字面意思就是：未定义的值 。这个值的语义是，希望表示一个变量最原始的状态，而非人为操作的结果 。 


// 2.null 的字面意思是：空值 。这个值的语义是，希望表示一个对象被人为的重置为空对象，而非一个变量最原始的状态 。 在内存里的表示就是，栈中的变量没有指向堆中的内存对象。

// let a=123
// let b=false
// let c={}
// let d=function (params) {}
// let e=[]
// console.log('a',a instanceof Number);//false  number,string,boolean
// console.log('c',c instanceof Object);//true
// console.log('d',d instanceof Function);//true
// console.log('e',d instanceof Function);//true
// console.log(Object.prototype.toString.call(null))
// const a;
// let a={
//   b:28
// }
// a=1
// console.log(a)

function func(){
  var n=999;
  console.log(n)
}
func()
console.log(n); // n is not defined

