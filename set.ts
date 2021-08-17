/**
 * 集合
 *   集合中不允许有重复值 set集合中 键值键名是一样滴
 * 实现方法: 
 *    1. 判断元素是否在集合中
 *    2. 向集合添加元素
 *    3. 删除集合中的元素
 *    4. 清空集合
 *    5. 打印集合
 *    6. 获取集合大小
 * 
 * 集合运算: 
 *    1. 并集
 *    2. 交集
 *    3. 差集
 *    4. 子集
 */

interface SetItems {
  [key: string]: any
}

class MySet {
  private items: SetItems;
  private length: number;
  constructor() {
    this.items = {};
    this.length = 0;
  }

  has(value: any): boolean {
    return Object.prototype.hasOwnProperty(value);
  }

  add(value: any) {
    if (this.has(value)) {
      return;
    }
    this.items[value] = value;
    this.length++;
  }

  remove(value: any): boolean {
    if (this.has(value)) {
      delete this.items[value];
      this.length--;
      return true;
    }
    return false;
  }

  size(): number {
    return this.length;
  }

  clear() {
    this.items = {};
    this.length = 0;
  }

  values(): any[] {
    let result: any[] = [];
    Object.values(this.items).forEach(_v => {
      result.push(_v);
    })
    return result;
  }

  union(otherSet: MySet): MySet {
    const unionSet = new MySet();
    this.values().forEach(mv => {
      unionSet.add(mv);
    });
    otherSet.values().forEach(ov => {
      unionSet.add(ov);
    });
    return unionSet;
  }

  intersection(otherSet: MySet): MySet {
    const intersectionSet = new MySet();
    const myValues = this.values();
    const otherValues = otherSet.values();
    let bigValues = myValues;
    let smallValues = otherValues;
    if (myValues.length < otherValues.length) {
      bigValues = otherValues;
      smallValues = myValues;
    }
    smallValues.forEach(sv => {
      if (bigValues.includes(sv)) {
        intersectionSet.add(sv);
      }
    })
    return intersectionSet;
  }

  // 差集是 当前集合除去鱼otherSet并集后 剩余的元素
  difference(otherSet: MySet): MySet {
    const differenceSet = new MySet();
    this.values().forEach(mv => {
      if (!otherSet.has(mv)) {
        differenceSet.add(mv);
      }
    })
    return differenceSet;
  }

  isSubSet(otherSet: MySet): boolean {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubSet = this.values().every(mv => {
      return otherSet.has(mv);
    })
    return isSubSet;
  }
}
