/**
 * 频繁修改 => 推荐链表
 * 频繁访问 => 推荐数组
 */

/**
 *  链表实现:
 *     链表长度
 *     一个节点 节点中的next 存着下一个节点的地址 value存储 着当前节点的值
 *  需要实现的方法:
 *     1. 链表尾部添加元素
 *     2. 移除链表指定位置的元素
 *     3. 获取链表指定位置的元素
 *     4. 链表任意位置插入元素
 *     5. 根据元素获取该元素在链表中的位置
 *     6. 移除链表中的指定元素
 *     7. 获取量表长度
 *     8. 判断链表是否为空
 *     9. 获取链表头部元素
 *     10. 获取链表中所有元素
 */

class LinkNode<T = any> {
  value: T;
  next: null | LinkNode<T>;

  constructor(val: T) {
    this.value = val;
    this.next = null;
  }
}

class LinkList<T = any> {
  protected length: number;
  protected head: LinkNode<T> | null;
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(val: T) {
    const node = new LinkNode(val);
    if (this.isEmpty()) {
      // 链表本身是一个空链表
      this.head = node; // 插入head
    } else {
      let current = this.head; // 递归找到最后一个节点
      while (current!.next != null) {
        current = current!.next;
      }
      current!.next = node; // 将最后一个节点的next指向添加的节点
    }
    this.length++; // 链表长度增加
  }

  removeAt(pos: number = 0): T | undefined {
    pos = pos | 0; // 1.1 => 1 | -1 => -1 | 'anc' => 0 |  []  => 0 | ({}) => 0 | (-1.5646) => -1 ....
    if (pos < 0 || pos > this.length || this.isEmpty()) {
      // 如果输入的值为负数或者 大于了链表长度  或者空链表 返回undefined
      return undefined;
    }
    let current = this.head; //拿到head
    if (pos === 0) {
      // pos = 0 说明 将head.next 指向 head.next.next
      this.head = current!.next;
    } else {
      let prev = this.getNodeAt(pos - 1)!; // 拿到 需要删除节点之前的节点
      current = prev.next; // 拿到 被删除的节点
      prev.next = current!.next; // 将prev的next 指向被删除节点的next
    }
    this.length--;
    return current!.value;
  }

  getNodeAt(pos: number = 0): LinkNode | undefined | null {
    pos = pos | 0;
    if (pos < 0 || pos > this.length || this.isEmpty()) {
      return undefined;
    }
    let current = this.head;
    for (let i = 0; i < pos && current != null; i++) {
      current = current.next;
    }
    return current;
  }

  insertNode(pos: number = 0, val: T): boolean {
    pos = pos | 0;
    if (pos < 0 || pos > this.length) {
      return false;
    }
    const node = new LinkNode(val);
    if (pos === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const prev = this.getNodeAt(pos - 1);
      node.next = prev!.next;
      prev!.next = node;
    }
    this.length++;
    return true;
  }

  getPos(val: T): number {
    if (this.isEmpty()) {
      return -1;
    }
    let current = this.head;
    for (let i = 0; i < this.length && current != null; i++) {
      if (val === current.value) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  removeValue(val: T): boolean {
    const pos = this.getPos(val);
    if (pos === -1) {
      return false;
    }
    this.removeAt(pos);
    return true;
  }

  size(): number {
    return this.length;
  }

  getHead(): LinkNode | null {
    return this.head;
  }

  isEmpty(): boolean {
    return this.head == null;
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }
    let current = this.head!.next;
    let result = `${this.head!.value}`;
    for (let i = 0; i < this.length && current != null; i++) {
      result += `,${current.value}`;
      current = current.next;
    }
    return result;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }
}

// const numberLinkList = new LinkList<number>();
// console.log(numberLinkList.size());
// console.log(numberLinkList.getHead())
// numberLinkList.add(1);
// numberLinkList.add(2);
// numberLinkList.add(3);
// console.log(numberLinkList.size());
// console.dir(numberLinkList.getHead())
// numberLinkList.add(4);
// numberLinkList.insertNode(4, 5);
// console.log(numberLinkList.toString());
// console.log(numberLinkList.getPos(3))
// console.log(numberLinkList.removeValue(3));
// console.log(numberLinkList.removeAt(3));
// console.log(numberLinkList.toString());

/**
 * 双向链表
 */
class DoublyLinkNode<T = any> {
  prev: DoublyLinkNode<T> | null;
  value: T;
  next: null | DoublyLinkNode<T>;
  constructor(val: T) {
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkList<T = any> {
  protected tail: DoublyLinkNode<T> | null;
  protected head: DoublyLinkNode<T> | null;
  protected length: number;
  constructor() {
    this.head = null;
    this.length = 0;
    this.tail = null;
  }

  add(val: T) {
    const node = new DoublyLinkNode(val);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node; // 原本尾巴 的next 默认为空 因为是尾插  所以 next指向新的节点
      node.prev = this.tail; // 新插入节点的prev指向 tail
      this.tail = node; // 将tail重新赋值
    }
  }
  removeAt(pos: number = 0): T | undefined {
    pos = pos | 0;
    if (pos < 0 || pos > this.length || this.isEmpty()) {
      return undefined;
    }
    if (pos === 0) {
      this.head = this.head!.next;
      this.head!.prev = null;
    } else if (pos === length) {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      let current = this.getNodeAt(pos)!;
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
    }
  }

  getNodeAt(pos: number = 0): DoublyLinkNode | undefined | null {
    pos = pos | 0;
    if (pos < 0 || pos > this.length || this.isEmpty()) {
      return undefined;
    }
    let current = this.head;
    for (let i = 0; i < pos && current != null; i++) {
      current = current.next;
    }
    return current;
  }

  insertNode(pos: number, val: T): boolean {
    pos = pos | 0;
    if (pos < 0 || pos > this.length) {
      return false;
    }
    const node = new DoublyLinkNode(val);
    if (this.isEmpty() || pos === this.length) {
      this.add(val);
    } else if (pos === 0) {
      node.next = this.head;
      this.head!.prev = node;
      this.head = node;
    } else {
      let current = this.getNodeAt(pos)!;
      let previous = current.prev!;
      previous.next = node;
      node.prev = previous;
      node.next = current;
      current.prev = node;
    }
    this.length++;
    return true;
  }

  getPos(val: T): number {
    if (this.isEmpty()) {
      return -1;
    }
    let current = this.head;
    for (let i = 0; i < this.length && current != null; i++) {
      if (val === current.value) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  removeValue(val: T): boolean {
    const pos = this.getPos(val);
    if (pos === -1) {
      return false;
    }
    this.removeAt(pos);
    return true;
  }

  size(): number {
    return this.length;
  }

  getHead(): DoublyLinkNode | null {
    return this.head;
  }

  isEmpty(): boolean {
    return this.head == null;
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }
    let current = this.head!.next;
    let result = `${this.head!.value}`;
    for (let i = 0; i < this.length && current != null; i++) {
      result += `,${current.value}`;
      current = current.next;
    }
    return result;
  }

  getTail(): DoublyLinkNode | null {
    return this.tail;
  }

  clear() {
    this.head = null;
    this.length = 0;
    this.tail = null;
  }
}

/**
 * 循环链表
 *
 * 大部分方法 都是差不多的 其可以直接继承 LinkList 重写一下其中的不一样的方法就好了
 */

class CircularLinkList<T = any> {
  protected length: number;
  protected head: null | LinkNode;
  constructor() {
    this.length = 0;
    this.head = null;
  }

  add(val: T) {
    const node = new LinkNode(val);
    if (this.isEmpty()) {
      this.head = node;
      node.next = this.head.next;
    } else {
      let current = this.head!;
      while (current!.next != null) {
        current = current!.next;
      }
      current.next = node;
      node.next = this.head;
    }
    this.length++;
  }

  removeAt(pos: number = 0): T | undefined {
    pos = pos | 0;
    if (pos < 0 || pos > this.length || this.isEmpty()) {
      return undefined;
    }
    let current = this.head!;
    if (pos === 0) {
      if (this.length === 1) {
        this.head = null;
      } else {
        let removeNode = this.head!;
        current = this.getNodeAt(this.length - 1)!;
        this.head = this.head!.next;
        current.next = this.head;
        current = removeNode;
      }
    } else {
      let prev = this.getNodeAt(pos - 1)!;
      current = prev.next!;
      prev.next = current.next;
    }
    this.length--;
    return current.value;
  }

  getNodeAt(pos: number = 0): LinkNode | undefined | null {
    pos = pos | 0;
    if (pos < 0 || pos > this.length || this.isEmpty()) {
      return undefined;
    }
    let current = this.head;
    for (let i = 0; i < pos && current != null; i++) {
      current = current.next;
    }
    return current;
  }

  insertNode(pos: number, val: T): boolean {
    pos = pos | 0;
    if (pos < 0 || pos > this.length) {
      return false;
    }
    const node = new LinkNode(val);
    if (pos === 0) {
      if (this.isEmpty()) {
        this.head = node;
        node.next = this.head;
      } else {
        node.next = this.head;
        const tail = this.getNodeAt(this.size() - 1)!;
        tail.next = node;
        this.head = node;
      }
    } else {
      const prev = this.getNodeAt(pos - 1);
      node.next = prev!.next;
      prev!.next = node;
    }
    this.length++;
    return true;
  }

  getPos(val: T): number {
    if (this.isEmpty()) {
      return -1;
    }
    let current = this.head;
    for (let i = 0; i < this.length && current != null; i++) {
      if (val === current.value) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  removeValue(val: T): boolean {
    const pos = this.getPos(val);
    if (pos === -1) {
      return false;
    }
    this.removeAt(pos);
    return true;
  }

  getHead(): LinkNode | null {
    return this.head;
  }

  isEmpty(): boolean {
    return this.head == null;
  }

  size(): number {
    return this.length;
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }
    let current = this.head!.next;
    let result = `${this.head!.value}`;
    for (let i = 0; i < this.length && current != null; i++) {
      result += `,${current.value}`;
      current = current.next;
    }
    return result;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }
}

/**
 * 有序链表
 *
 * 有序链表相当于链表多了一个排序插入的操作
 */
const defaultCompareFunc = (a: number, b: number) => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
};

class OrderLinkList extends LinkList<number> {
  protected baseCompare: Function;
  constructor(compareFun: Function = defaultCompareFunc) {
    super();
    this.baseCompare = compareFun;
  }
  getPos(val: number): number {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.baseCompare(val, current.value);
      if (comp === -1) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
  insertNode(val: number): boolean {
    if (this.isEmpty()) {
      return super.insertNode(0, val);
    }
    const prevPos = this.getPos(val);
    return super.insertNode(prevPos, val)
  }
}
