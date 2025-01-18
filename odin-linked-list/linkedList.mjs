class LinkedList {
  #head;
  #tail;
  #size = 0;

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  get size() {
    try {
      return this.#size;
    } catch (error) {
      return 0;
    }
  }

  append(value) {
    if (this.#tail) {
      this.#tail.nextNode = new Node(value);
      this.#tail = this.#tail.nextNode;
      this.#size += 1;
    } else {
      this.#head = new Node(value);
      this.#tail = this.#head;
      this.#size += 1;
    }
  }

  prepend(value) {
    if (this.#head) {
      const currentHead = this.#head;
      this.#head = new Node(value, currentHead);
      console.log;
      this.#size += 1;
    } else {
      this.#head = new Node(value);
      this.#size += 1;
    }
  }

  at(index) {
    let count = 0;
    let current = this.#head;
    while (count < index) {
      current = current.nextNode;
      count += 1;
    }
    return current;
  }

  pop() {
    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
      this.#size = 0;
    } else {
      if (this.#tail) {
        let current = this.#head;
        let previous;
        while (current !== this.#tail) {
          previous = current;
          current = current.nextNode;
        }
        this.#tail = previous;
        previous.nextNode = null;
        this.#size -= 1;
      }
    }
  }

  // a traverse method should be implemented
  contains(argValue) {
    let current = this.#head;
    try {
      do {
        if (typeof current.value === "object") {
          if (argValue in current.value) return true;
        } else {
          if (current.value === argValue) return true;
        }
        current = current.nextNode;
      } while (current.nextNode !== null);
      return false;
    } catch (error) {
      return false;
    }
  }

  find(argValue) {
    let current = this.#head;
    let count = 0;
    try {
      do {
        if (typeof current.value === "object") {
          if (argValue in current.value) return count;
        } else {
          if (current.value === argValue) return count;
        }
        current = current.nextNode;
        count += 1;
      } while (current.nextNode !== null);
      return false;
    } catch (error) {
      return false;
    }
  }

  toString() {
    let stringed;
    try {
      if (typeof this.#head.value === "object") {
        stringed = `(${JSON.stringify(this.#head.value)}) -> `;
      } else {
        stringed = `(${this.#head.value}) -> `;
      }
      let current = this.#head;
      while (current.nextNode !== null) {
        current = current.nextNode;
        if (typeof current.value === "object") {
          stringed += `(${JSON.stringify(current.value)}) -> `;
        } else {
          stringed += `(${current.value}) -> `;
        }
      }
      stringed += `null`;
      return stringed;
    } catch (error) {
      return "emptied bucket";
    }
  }

  insertAt(value, index) {
    let count = 0;
    let current = this.#head;
    let previous = current;
    while (count < index) {
      previous = current;
      current = current.nextNode;
      count += 1;
    }
    previous.nextNode = new Node(value, current);
    this.#size += 1;
  }

  removeAt(index) {
    let count = 0;
    let current = this.#head;
    let previous = current;
    while (count < index) {
      previous = current;
      current = current.nextNode;
      count += 1;
    }
    previous.nextNode = current.nextNode;
    this.#size -= 1;
  }
}

class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export { LinkedList, Node };
