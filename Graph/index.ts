/**
 * 图的表示
 *   1 邻接矩阵  二维数组存储 不推荐理由 图的顶点数量可变, 二维数组不灵活
 *   2. 邻接表   数组每一项是一个链表
 *   3. 关联矩阵 行表示顶点, 列表示边  顶点能到边为1 两个顶点到同一边都为1
 */

/**
 * 使用数组加Map实现
 *  实现添加顶点
 *  实现添加边
 *  输出图
 */

type AdjListMap = Map<string, Set<string>>;

class Graph {
  private vertices: string[];
  private adjList: AdjListMap;
  private isDirect: boolean;
  constructor(isDirect = false) {
    this.vertices = [];
    this.adjList = new Map();
    this.isDirect = isDirect;
  }
  addVertex(v: string) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
    }
  }
  addEdge(v1: string, v2: string) {
    if (this.vertices.includes(v1) || this.vertices.includes(v2)) {
      console.log(
        `请在下面的顶点中, 选择正确的顶点: ${this.addEdge.toString()}`,
      );
    }
    this.saveMap(this.adjList, v1, v2);

    if (!this.isDirect) {
      this.saveMap(this.adjList, v2, v1);
    }
  }
  getVertices(): string[] {
    return this.vertices;
  }
  getAdjList(): AdjListMap {
    return this.adjList;
  }
  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = Array.from(this.adjList.get(this.vertices[i])!);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }
  private saveMap(map: AdjListMap, from: string, to: string) {
    if (map.has(to)) {
      let data = map.get(from)!;
      data.add(to);
      map.set(from, data);
    } else {
      map.set(from, new Set([to]));
    }
  }
}

// const graph = new Graph();
// const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
// for (let i = 0; i < vertices.length; i++) {
//     graph.addVertex(vertices[i]);
// }
// graph.addEdge("A", "B");
// graph.addEdge("A", "C");
// graph.addEdge("A", "D");
// graph.addEdge("C", "D");
// graph.addEdge("C", "G");
// graph.addEdge("D", "G");
// graph.addEdge("D", "H");
// graph.addEdge("B", "E");
// graph.addEdge("B", "F");
// graph.addEdge("E", "I");

// console.log(graph.toString());
