// Implement and Explain what is LRU Caching ?
// Least Recently Used Cache

interface Node {
  next: Node | null;
  prev: Node | null;
  value: any;
}

export class LRUCache {
  private capacity: number;
  private head: Node | null;
  private length: number;
  private tail: Node | null;
  private map: Map<any, any> = new Map<any, any>();

  constructor(capacity) {
    this.capacity = capacity;
    this.head = null;
    this.map = new Map();
    this.length = 0;
    this.tail = null;
  }

  #removeNode(node: Node) {
    if (!node) return;
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.head) {
      this.head = node.next;
    }

    if (node === this.tail) [(this.tail = node.prev)];
  }

  get(key) {
    if (!this.map.has(key)) return null;

    const node = this.map.get(key);
    this.#removeNode(node);
    node.prev = null;
    node.next = this.head;
    if (this.head !== null) {
      this.head.prev = node;
    }
    this.head = node;
    return node.value;
  }

  put(key, value) {
    // Check if we have capacity to put
    if (this.length === this.capacity) {
      if (!this.map.has(key)) {
        this.#removeNode(this.tail!);
      }
    }

    // If the key is already in the LinkedList
    if (this.map.has(key)) {
      // 1. Remove the existing key
      this.#removeNode(this.map.get(key));
      this.length -= 1;
    }

    // 2. Put the key in the LinkedList
    // Whenever we will put a key, it will always be on the head
    const node = {
      next: this.head,
      prev: null,
      value,
    };

    // 3. Set the value in the mao
    this.map.set(key, node);

    if (this.head !== null) {
      this.head.prev = node;
    }
    this.head = node;

    if (this.tail === null) {
      this.tail = node;
    }
    this.length += 1;
  }
}
