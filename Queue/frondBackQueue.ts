/**
 * 双端队列
 *
 * 介绍:
 *        双端队列是一种允许我们同时从前端和后端添加和移除元素的特殊队列。
 *    双端队列同时遵守了先进先出和后进先出的原则，所以可以说它是一种把队列和栈相结合的一种数据结构。
 *    现实中用到双端队列的例子有很多，例如电影院、餐厅排队的队伍。排队买电影票的人当他买到电影票后，离开了队伍，
 *    此时他想咨询一些其他小问题时，他可以直接去队伍的最前面咨询问题。排在队伍后面的人，临时有其他事情无法买票，他就会从队伍的末尾离开。
 *    在计算机科学中，存储一系列的撤销操作就用到了双端队列，每当用户在软件中进行了一个操作，该操作就会被存储在一个双端队列中，
 *    当用户点撤销操作时，该操作会从队列的末尾弹出，在进行了预先定义的一定数量的操作后，最下执行的操作就会从队首移除。
 *
 * 思路:
 *       双端队列相比队列多了两端都可以出入元素，因此普通队列中的获取队列大小、清空队列、队列判空、获取队列中的所有元素这些方法同样存在于双端队列中且实现代码与之相同。
 *   由于双端队列两端都可以出入元素，那么我们需要实现以下函数：
 *   队首添加元素，添加元素时需要判断队列是否为空，以及队首元素是否为0。
 *   队尾添加元素，等同于队列的入队操作。
 *   获取队首元素，等同于队列的获取队首元素
 *   获取队尾元素，等同于栈的获取栈顶操作。
 *   删除队首元素，等同于出队操作。
 *   删除队尾元素，等同与出战操作。
 *   观察上述我们要实现的函数后，我们发现双端队列除了队首添加元素与之前我们实现的差别很大，其他的函数我们之前都已经实现过了，所以此处仅讲解队首添加元素的实现。
 *   想了解其他函数的具体实现请移步我的另一篇文章：数组实现栈与对象实现栈的区别
 *   队首添加元素的实现思路如下：
 *   如果队列为空，直接调用队尾添加元素函数。
 *   如果队首元素key大于0，则需要将当前队首元素key-1，然后将当前元素放入队列中。
 *   如果队首元素key等于0，则需要将队列中的元素整体向后移动一位，空出0号key出来，队首元素重新赋值为0，然后将当前元素放入0号key中。
 */

class ArrayFrontBackQueue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  addFront(item: T) {
    if (this.isEmpty()) {
      this.addBack(item);
    }
    this.items.unshift(item);
  }

  addBack(item: T) {
    this.items.push(item);
  }

  removeFront(): T | undefined {
    return this.items.shift();
  }

  removeBack(): T | undefined {
    return this.items.pop();
  }

  getFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  getBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  clear() {
    this.items.length = 0;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  toString(): string {
    return this.isEmpty.toString();
  }
}

interface queueObject<T> {
  [key: number]: T;
}

class ObjectFrondBackQueue<T> {
  private item: queueObject<T>;
  private frondKey: number;
  private backKey: number;

  constructor() {
    this.item = {};
    this.frondKey = 0;
    this.backKey = 0;
  }

  addFront(value: T) {
    if (this.isEmpty()) { // 如果整个队列为空 相当于尾添加
      this.addBack(value);
    } else {
      // 首查 需要将之前的frondkey到backKey往后移动
      for (let i = this.backKey; i > this.frondKey; i--) {
        this.item[i] = this.item[i - 1];
      }
      this.backKey++; // 移动之后 之前的backKey值已经存储 值了 所以需要自增
      this.item[this.frondKey] = value; // 将添加的值放入frondKey对应的值
    }
  }

  addBack(value: T) {
    this.item[this.backKey] = value;
    this.backKey++;
  }

  getFrond(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.item[this.frondKey];
  }

  getBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.item[this.backKey];
  }

  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.item[this.frondKey]; // 拿到首值
    delete this.item[this.frondKey];// 删除这个值
    this.frondKey++; // frondkey后移
    return result;
  }

  removeBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.backKey--; // back自减之后的键值 就是尾的值
    const result = this.item[this.backKey]; // 拿到
    delete this.item[this.backKey]; // 删除
    return result; // 返回
  }

  isEmpty(): boolean {
    return this.frondKey === this.backKey;
  }

  clear() {
    this.item = {};
    this.backKey = 0;
    this.frondKey = 0;
  }

  size(): number {
    return this.backKey - this.frondKey;
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }
    let result = '';
    Object.values(this.item).forEach((_v) => {
      result = `${result + _v},`;
    });
    return result;
  }
}

/**
 * 测试
 */

// const numberOFBQ = new ObjectFrondBackQueue<number>();

// console.log(numberOFBQ.isEmpty());
// console.log(numberOFBQ.size());
// numberOFBQ.addFront(1);
// numberOFBQ.addFront(2);
// console.log(numberOFBQ.isEmpty());
// console.log(numberOFBQ.size());
// numberOFBQ.addBack(3);
// console.log(numberOFBQ.toString());
// console.log(numberOFBQ.getBack());
// console.log(numberOFBQ.getFrond());
// numberOFBQ.addFront(5);
// console.log(numberOFBQ.size());
// console.log(numberOFBQ.toString());
// numberOFBQ.addBack(5);
// console.log(numberOFBQ.toString());
// numberOFBQ.removeFront();
// console.log(numberOFBQ.toString());
// numberOFBQ.removeBack();
// console.log(numberOFBQ.toString());
// console.log(numberOFBQ.size())
// numberOFBQ.clear();
// console.log(numberOFBQ.toString());
// console.log(numberOFBQ.size())

/**
 * 双端队列检测回文串
 *
 * 思路:
 *    1. 声明一个函数，参数为：要进行检测的字符串
 *    2. 去除字符串的空格并将其全转为小写字母
 *    3. 遍历字符串，将字符串的每个字符加入双端队列中。
 *    4. 遍历队列，队首出队和队尾出队
 *    5. 判断队首和队尾的字符是否相等，如果不想等则回文结果为false
 *    6. 如果队列的大小大于1且会问结果为true则继续比对队首元素和队尾元素
 */

type IsPalindromeFun = (sourceStr: string) => boolean;

const isPalindrome: IsPalindromeFun = (sourceStr: string) => {
  sourceStr = sourceStr || '';
  sourceStr = sourceStr.replace(/\s*/g, '');
  if (sourceStr.length === 0) {
    return false;
  }
  const frondBackQueue = new ObjectFrondBackQueue<string>();
  const lowerStr = sourceStr.toLocaleLowerCase();
  let isEqual = true;
  let firstChar, lastChar;
  for (let i = 0; i < lowerStr.length; i++) {
    frondBackQueue.addBack(lowerStr.charAt(i));
  }
  while (frondBackQueue.size() > 1 && isEqual) {
    firstChar = frondBackQueue.removeFront();
    lastChar = frondBackQueue.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
};

console.log(isPalindrome("ancnc"));
console.log(isPalindrome("abcba"));
console.log(isPalindrome("abccba"));
