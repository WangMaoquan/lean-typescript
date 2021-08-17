class Sort {
  private array: number[];

  constructor(source: number[] = []) {
    this.array = source;
  }

  /**
   * 冒泡排序
   * 时间复杂度 O(n²)
   * 稳定性: 稳定
   *
   * 思路:
   *   冒泡排序 将一轮遍历的最大值 像冒泡一样放在当前遍历的末尾的方法
   *   外层循环控制 遍历
   *   内层循环控制 比较 交换位置
   */
  bubbleSort(array: number[] = this.array) {
    const { length } = array;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (this.baseCompare(array[j], array[j + 1]) === 1) {
          this.baseSwap(array, j, j + 1);
        }
      }
    }
  }

  /**
   * 选择排序
   * 时间复杂度 O(n^2)
   * 稳定性 最不稳定的
   *
   * 思路: 默认第一个元素最小 然后 拿着与后面的元素比较 如果找到比当前的还小的 两个交换  然后 继续
   *   外层循环控制 遍历
   *   内层循环控制 往后找比当前的最小值 然后交换  说它不稳定 也就是这一步的时候不问题
   */
  selectionSort(array: number[] = this.array) {
    const { length } = array;
    let indexMin = 0;
    for (let i = 0; i < length; i++) {
      indexMin = i;
      for (let j = i; j < length; j++) {
        if (this.baseCompare(array[indexMin], array[j]) === 1) {
          indexMin = j;
        }
      }
      if (i !== indexMin) {
        this.baseSwap(array, i, indexMin);
      }
    }
  }

  /**
   * 插入排序
   * 时间复杂度 O(N^(1/2))
   * 空间复杂度 O(1)
   * 稳定性: 稳定
   *
   * 思路: 默认第一个元素已经处于有序的状态, 然后开始遍历 每次遍历 都需要将当前位置之前的元素 处于有序的状态
   *   外层循环控制 遍历
   *   内层循环控制 当前位置与之前的元素的大小的比较
   */
  insertionSort(array: number[] = this.array) {
    const { length } = array;
    let temp: number;
    for (let i = 1; i < length; i++) {
      let j = i;
      temp = array[i];
      // 如果前一个比当前的还大  则往前放
      while (j > 0 && this.baseCompare(array[j - 1], temp) === 1) {
        array[j] = array[j - 1];
        j--;
      }
      // 将保存的值 放到正确位置
      array[j] = temp;
    }
  }

  /**
   * 归并排序
   * 时间复杂度 O(nlogn)
   * 空间复杂度 O(n)
   * 稳定性 稳定
   *
   * 思路
   *    将一个数组切割成较小的数组, 直到最后每个数组只有一个元素为止.然后再将这些小数组 归并成为大数组
   *    主函数 递归切割 大数组
   *       出口:  数组长度为1 了 就退出
   *       怎么切割:  取数组中间值
   *       合并数组: 辅助函数 baseMerge 将小数组排序合并返回
   *
   * @param array 待排序数组
   */
  mergeSort(array: number[] = this.array): number[] {
    if (array.length > 1) {
      const { length } = array;
      // 获取中间值
      const middle = Math.floor(length / 2);
      // 递归填充左右数组
      const left = this.mergeSort(array.slice(0, middle));
      const right = this.mergeSort(array.slice(middle, length));
      // 合并左右数组
      array = this.baseMerge(left, right);
    }
    return array;
  }

  /**
   * 快速排序
   *
   * 思路
   *    需要让 baseValue的 左边的值 都比这个baseValue小 右边的值 都比这个baseValue大
   *    然后把 左边的值 当成最开始的 那个数组, 然后重复上面的步骤,  右边的值同样也是
   * @param array
   */
  quickSort = (array: number[] = this.array) => {
    return this.baseQuick(array);
  };

  /**
   * baseSwap 方法
   * @param array
   * @param a 下标 a
   * @param b 下标 b
   */

  private baseSwap = (array: number[], a: number, b: number) => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };

  /**
   * 比较
   * @param a 待比较值a
   * @param b 待比较值b
   */

  private baseCompare = (a: number, b: number): number => {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  };

  /**
   * baseMerge 我都觉得我注释好随意 哈哈哈哈
   * @param left 左边的数组
   * @param right 右边的数组
   */

  private baseMerge(left: number[], right: number[]) {
    let i = 0; // left 数组 下标
    let j = 0; // right 数组 下标
    const result: number[] = []; // 返回的结果数组
    while (i < left.length && j < right.length) {
      // left 和 right 都是已经排序好的数组 所以 这里进行的两个数组元素的大小顺序插入进 result
      result.push(
        this.baseCompare(left[i], right[j]) === -1 ? left[i++] : right[j++],
      );
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
  }

  /**
   *
   * @param array
   * @param left
   * @param right
   */

  private baseQuick = (
    array: number[],
    left: number = 0,
    right: number = array.length - 1,
  ) => {
    if (left >= right) {
      //如果左边的索引大于等于右边的索引说明整理完毕
      return;
    }
    let i = left;
    let j = right;
    const baseVal = array[j]; // 取无序数组最后一个数为基准值
    while (i < j) {
      //把所有比基准值小的数放在左边大的数放在右边
      while (i < j && this.baseCompare(array[i], baseVal) === -1) {
        //找到一个比基准值大的数交换
        i++;
      }
      array[j] = array[i]; // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
      while (j > i && this.baseCompare(array[j], baseVal) === 1) {
        //找到一个比基准值小的数交换
        j--;
      }
      array[i] = array[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    array[j] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    this.baseQuick(array, left, j - 1); // 将左边的无序数组重复上面的操作
    this.baseQuick(array, j + 1, right); // 将右边的无序数组重复上面的操作
  };
}

/**
 * 二分查找
 * 传入的是一个排序好了的 数组
 * @param array
 */

const binarySearch = (array: number[], target: number): number | null => {
  let low = 0;
  let high = array.length - 1;
  const compareFn = (a: number, b: number): number => {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midValue = array[mid];
    if (compareFn(midValue, target) === -1) {
      low = mid + 1;
    } else if (compareFn(midValue, target) === 1) {
      // 如果中间值大于目标值,向其左边继续找
      high = mid - 1;
    } else {
      // 中间值等于目标值，元素找到，返回mid即当前元素在数组的位置
      return mid;
    }
  }
  return null;
};
