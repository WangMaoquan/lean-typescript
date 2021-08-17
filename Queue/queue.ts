/**
 * 队列的核心是先进先出(FIFO)
 * 需要实现的功能: 
 *    1. 入队
 *    2. 出队
 *    3. 队列会否为空
 *    4. 返回队首
 *    5. 获取队列大小
 *    6. 清空队列
 *    7. 输出队列
 */


/**
 * 数组实现队列
 */

class ArrayQueue<T = any> {

  private items: T[];

  constructor() {
    this.items = [];
  }

  inQueue(item: T) {
    this.items.push(item);
  }

  outQueue(): T | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getFirst(): T | undefined{
    if (this.isEmpty()) {
      return undefined;
    } 
    return this.items[0];
  }

  clear() {
    this.items.length = 0;
  }

  getSize(): number {
    return this.items.length;
  }

  toString(): string {
    return this.items.toString();
  } 
}

/**
 * 测试
 */

// const numberArrayQueue = new ArrayQueue<number>();
// console.log(numberArrayQueue.getSize());
// numberArrayQueue.inQueue(1);
// console.log(numberArrayQueue.getFirst());
// numberArrayQueue.inQueue(2);
// numberArrayQueue.inQueue(3);
// numberArrayQueue.inQueue(4);
// console.log(numberArrayQueue.getSize());
// console.log(numberArrayQueue.toString());
// numberArrayQueue.clear();
// console.log(numberArrayQueue.getSize());


/**
 * 对象实现队列
 */

interface queueObject<T = any> {
  [key: number]: T
}

class ObjectQueue<T = any> {

  private item: queueObject<T>;

  private lastKey: number;

  private firstKey: number;

  constructor() {
    this.item = {};
    this.lastKey = 0;
    this.firstKey = 0;
  }

  inQueue(item: T) {
    this.item[this.lastKey] = item;
    this.lastKey++
  }

  outQueue(): T | undefined {
    if (this.lastKey === this.firstKey) {
      return undefined;
    }
    let result = this.item[this.firstKey];
    delete this.item[this.firstKey];
    this.firstKey++
    return result;
  }

  isEmpty(): boolean {
    return this.firstKey === this.lastKey
  }

  getFirst(): T | undefined{
    if (this.isEmpty()) {
      return undefined;
    } 
    return this.item[this.firstKey];
  }

  clear() {
    this.item = {};
    this.firstKey = 0;
    this.lastKey = 0;
  }

  getSize(): number {
    return this.lastKey - this.firstKey;
  }

  toString(): string {
    if (this.lastKey - this.firstKey === 0) {
      return "";
    }
    let result: string = "";
    Object.values(this.item).forEach(_v => {
      result = `${result + _v},`
    })
    return result;
  } 
}

/**
 * 测试
 */

// const numberObjectQueue = new ObjectQueue<number>();

// console.log(numberObjectQueue.getSize());
// console.log(numberObjectQueue.isEmpty());
// numberObjectQueue.inQueue(1);
// numberObjectQueue.inQueue(2);
// console.log(numberObjectQueue.getFirst());
// numberObjectQueue.inQueue(3);
// numberObjectQueue.inQueue(4);
// console.log(numberObjectQueue.outQueue());
// console.log(numberObjectQueue.getSize());
// console.log(numberObjectQueue.isEmpty());
// console.log(numberObjectQueue.toString());
// numberObjectQueue.clear();
// console.log(numberObjectQueue.getSize());


/**
 * 队列实现击鼓传花
 * 
 * 
 * 思路
 *   1. 声明一个函数，参数为：参与人员数组，多少次为一轮
 *   2. 函数内部实例化一个队列，声明淘汰人员列表变量。
 *   3. 将参与人员入队(参与人员围成一个圆圈)
 *   4. 模拟击鼓传花，以传进来的次数为条件遍历队列，将队列的队顶元素追加至队尾(如果你将花传给了旁边的人，你被淘汰的威胁就立刻解除了)。
 *   5. 传进来的次数遍历完成(鼓声停止)，队首元素出栈，将队首元素追加至淘汰人员列表中。
 *   6. 队列中只剩下一个元素时，剩余元素出队，返回胜利者和淘汰者列表。
 */

interface PassTheParcelResult {
  knockOutList: string[],
  winner: string;
} 

type PassTheParcelFun = (playerList: string[], count: number) => PassTheParcelResult

const passTheParcel: PassTheParcelFun = (playerList: string[] = [], count: number = 10) => {
  let knockOutList: string[] = [],
      winner: string;
  
  const queue = new ObjectQueue<string>();

  playerList.forEach(player => {
    queue.inQueue(player);
  })

  while(queue.getSize() > 1) {
    for(let i = 0; i < count; i++) {
      queue.inQueue(queue.outQueue()!);
    }
    knockOutList.push(queue.outQueue()!)
  }

  winner = queue.outQueue()!;

  return {
    knockOutList,
    winner
  }
}

const playList = ["张三","李四","王五","朱六","郝七","刘八","彭九"];
const {knockOutList, winner} = passTheParcel(playList,9);
for (let i = 0; i < knockOutList.length; i++){
    const name = knockOutList[i];
    console.log(`${name}，在击鼓传花游戏中被淘汰`);
}
console.log(`游戏胜利者: ${winner}`);
