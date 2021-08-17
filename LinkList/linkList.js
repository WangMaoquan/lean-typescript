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
var LinkNode = /** @class */ (function () {
    function LinkNode(val) {
        this.value = val;
        this.next = null;
    }
    return LinkNode;
}());
var LinkList = /** @class */ (function () {
    function LinkList() {
        this.head = null;
        this.length = 0;
    }
    LinkList.prototype.add = function (val) {
        var node = new LinkNode(val);
        if (this.isEmpty()) {
            this.head = node;
        }
        else {
            var current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    };
    LinkList.prototype.removeAt = function (pos) {
        if (pos === void 0) { pos = 0; }
        pos = pos | 0; // 1.1 => 1 | -1 => -1 | 'anc' => 0 |  []  => 0 | ({}) => 0 | (-1.5646) => -1 .... 
        if (pos < 0 || pos > this.length) {
            return undefined;
        }
        var current = this.head;
        if (pos === 0) {
            this.head = current.next;
        }
        else {
            var prev = this.getNodeAt(pos - 1); // 拿到 需要删除节点之前的节点
            current = prev.next; // 拿到 被删除的节点
            prev.next = current.next; // 将prev的next 指向被删除节点的next
        }
        this.length--;
        return current.value;
    };
    LinkList.prototype.getNodeAt = function (pos) {
        if (pos === void 0) { pos = 0; }
        pos = pos | 0;
        if (pos < 0 || pos > this.length) {
            return undefined;
        }
        var current = this.head;
        for (var i = 0; i < pos && current != null; i++) {
            current = current.next;
        }
        return current;
    };
    LinkList.prototype.insertNode = function (pos, val) {
        if (pos === void 0) { pos = 0; }
        pos = pos | 0;
        if (pos < 0 || pos > this.length) {
            return false;
        }
        var node = new LinkNode(val);
        if (pos === 0) {
            node.next = this.head;
            this.head = node;
        }
        else {
            var prev = this.getNodeAt(pos - 1);
            node.next = prev.next;
            prev.next = node;
        }
        this.length++;
        return true;
    };
    LinkList.prototype.getPos = function (val) {
        if (this.isEmpty()) {
            return -1;
        }
        var current = this.head;
        for (var i = 0; i < this.length && current != null; i++) {
            if (val === current.value) {
                return i;
            }
            current = current.next;
        }
        return -1;
    };
    LinkList.prototype.removeValue = function (val) {
        var pos = this.getPos(val);
        if (pos === -1) {
            return false;
        }
        this.removeAt(pos);
        return true;
    };
    LinkList.prototype.size = function () {
        return this.length;
    };
    LinkList.prototype.getHead = function () {
        return this.head;
    };
    LinkList.prototype.isEmpty = function () {
        return this.head == null;
    };
    LinkList.prototype.toString = function () {
        if (this.isEmpty()) {
            return '';
        }
        var current = this.head.next;
        var result = "" + this.head.value;
        for (var i = 0; i < this.length && current != null; i++) {
            result += "," + current.value;
            current = current.next;
        }
        return result;
    };
    return LinkList;
}());
var numberLinkList = new LinkList();
console.log(numberLinkList.size());
console.log(numberLinkList.getHead());
numberLinkList.add(1);
numberLinkList.add(2);
numberLinkList.add(3);
console.log(numberLinkList.size());
console.dir(numberLinkList.getHead());
numberLinkList.add(4);
numberLinkList.insertNode(4, 5);
console.log(numberLinkList.toString());
console.log(numberLinkList.getPos(3));
console.log(numberLinkList.removeValue(3));
console.log(numberLinkList.removeAt(3));
console.log(numberLinkList.toString());
