/**
 * 栈的核心是后进先出(LIFO)
 * 需要实现的功能
 *    1. 入栈
 *    2. 出栈
 *    3. 获取栈顶元素
 *    4. 判断是否为空栈
 *    5. 清空栈内元素
 *    6. 获取栈大小
 *    7. 输出栈内元素
 */


/**
 * 使用数组实现
 */

class ArrayStack<T = any> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  public push(item: T) {
    this.items.push(item);
  }

  public pop(): T | undefined {
    return this.items.pop();
  }

  public getTop(): T | undefined {
    return this.items[this.items.length - 1];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public clear() {
    this.items.length = 0;
  }

  public getSize(): number {
    return this.items.length;
  }

  public toString(): string {
    return this.items.toString();
  }
}

/**
 * 测试
 */

// const numberArrayStack = new ArrayStack<number>();
// console.log(numberArrayStack.isEmpty())
// numberArrayStack.push(1);
// numberArrayStack.push(2);
// numberArrayStack.push(3);
// numberArrayStack.push(4);
// console.log(numberArrayStack.getTop())
// console.log(numberArrayStack.getSize())
// console.log(numberArrayStack.isEmpty())
// console.log(numberArrayStack.toString())
// numberArrayStack.clear();
// console.log(numberArrayStack.getSize())
// console.log(numberArrayStack.isEmpty())


/**
 * 使用对象实现
 */

interface stackObject<T = any> {
  [key: number]: T
}

class ObjectStack<T = any> {

  private items: stackObject<T>;

  private count: number;

  constructor() {
    this.items = {};
    this.count = 0;
  }

  push(item: T) {
    this.items[this.count] = item;
    this.count++;
  }

  pop(): T | undefined {
    if (this.count === 0) {
      return undefined
    }
    const result: T | undefined = this.items[this.count]
    delete this.items[this.count];
    this.count--
    return result;
  }

  getTop(): T | undefined {
    if (this.count === 0) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  getSize(): number {
    return this.count;
  }

  toString(): string {
    if (this.count === 0) {
      return "";
    }
    let result: string = "";
    Object.values(this.items).forEach(_v => {
      result = `${result + _v},`
    })
    return result;
  }
}


/**
 * 测试
 */

// const numberObjectStack = new ObjectStack<number>();
// console.log(numberObjectStack.isEmpty())
// numberObjectStack.push(1);
// numberObjectStack.push(2);
// numberObjectStack.push(3);
// numberObjectStack.push(4);
// console.log(numberObjectStack.getTop())
// console.log(numberObjectStack.getSize())
// console.log(numberObjectStack.isEmpty())
// console.log(numberObjectStack.toString())
// numberObjectStack.clear();
// console.log(numberObjectStack.getSize())
// console.log(numberObjectStack.isEmpty())