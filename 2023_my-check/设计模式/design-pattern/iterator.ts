class TreeNode {
  constructor(public value: number, public left?: TreeNode, public right?: TreeNode) { }
}

const root = new TreeNode(1, new TreeNode(2, new TreeNode(4, null, null), null), new TreeNode(3, null, null))


class Collection<T> {
  root: TreeNode

  constructor(root: TreeNode) {
    this.root = root
  }

  // [Symbol.iterator]() {
  //   let index = 0;
  //   const items = this.items;
  //   return {
  //     next() {
  //       if (index < items.length) {
  //         return { value: items[index++], done: false };
  //       } else {
  //         return { done: true };
  //       }
  //     }
  //   };
  // }
  *help(root: TreeNode) {
    if (root == null) return
    yield root.value
    yield* this.help(root.left)
    yield* this.help(root.right)
  }
  *[Symbol.iterator]() {
    yield* this.help(this.root)
  }
}

const collection = new Collection<number>(root);
// collection.add('item 1');
// collection.add('item 2');
// collection.add('item 3');

for (let item of collection) {
  console.log(item)
}
// const iterator = collection[Symbol.iterator]();
// let result = iterator.next();
// while (!result.done) {
//   console.log(result.value);
//   result = iterator.next();
// }