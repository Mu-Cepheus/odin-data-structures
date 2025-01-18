import * as LinkedL from "../odin-linked-list/linkedList.mjs";

class Hashmap {
  #loadFactor = 0.75;
  #capacity = 16;
  #buckets = new Array(this.#capacity);
  #currentCount = 0;

  get map() {
    return this.#buckets;
  }

  get capacity() {
    return this.#capacity;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.#capacity;
    }

    return hashCode;
  }

  expand() {
    this.#capacity *= 2;
    //call entries() to get all entries, put in var
    let oldEntries = this.entries();
    this.#currentCount = 0;
    this.#buckets = new Array(this.#capacity);
    for (const [key, value] of oldEntries) {
      this.set(key, value);
    }
  }

  set(key, value) {
    //hash the key
    let index = this.hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const obj = {};
    obj[key] = value;
    //use the code for bucket address
    if (this.#buckets[index]) {
      let found = this.#buckets[index].find(key);
      if (found !== false) {
        if (found > 0) this.#buckets[index].insertAt(obj, found);
        else if (found === 0 && this.#buckets[index].size === 1) {
          this.#buckets[index].pop();
          this.#buckets[index].append(obj);
        }
      } else {
        if (this.#currentCount + 1 > this.#capacity * this.#loadFactor)
          this.expand();
        index = this.hash(key);
        if (index < 0 || index >= this.#buckets.length) {
          throw new Error("Trying to access index out of bounds");
        }
        try {
          this.#buckets[index].append(obj);
          this.#currentCount += 1;
        } catch (error) {
          this.#buckets[index] = new LinkedL.LinkedList();
          this.#buckets[index].append(obj);
          this.#currentCount += 1;
        }
      }
      //store key value pair using linked list
    } else {
      if (this.#currentCount + 1 > this.#capacity * this.#loadFactor)
        this.expand();
      index = this.hash(key);
      if (index < 0 || index >= this.#buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
      this.#buckets[index] = new LinkedL.LinkedList();
      this.#buckets[index].append(obj);
      this.#currentCount += 1;
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.#buckets[index]) {
      return this.#buckets[index];
    } else {
      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.#buckets[index].contains(key);
  }

  remove(key) {
    if (this.has(key)) {
      //feed find to remove at
      const index = this.hash(key);
      if (this.#buckets[index].size === 1) {
        //ERROR: HE IS AWARE
        //NOT ERROR: COMPOSITION IN OOP
        this.#buckets[index].pop();
      } else {
        this.#buckets[index].removeAt(this.#buckets[index].find(key));
      }
      this.#currentCount -= 1;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.#currentCount;
  }

  clear() {
    this.#currentCount = 0;
    this.#buckets = new Array(this.#capacity);
  }

  keys() {
    let keys = [];
    for (const bucket of this.#buckets) {
      if (bucket) {
        try {
          let currentNode = bucket.head;
          for (let i = 0; i < bucket.size; i++) {
            keys.push(Object.keys(currentNode.value));
            currentNode = currentNode.nextNode;
          }
        } catch (error) {
          continue;
        }
      }
    }
    return keys.flat();
  }

  values() {
    let values = [];
    for (const bucket of this.#buckets) {
      if (bucket) {
        try {
          let currentNode = bucket.head;
          for (let i = 0; i < bucket.size; i++) {
            values.push(Object.values(currentNode.value));
            currentNode = currentNode.nextNode;
          }
        } catch (error) {
          continue;
        }
      }
    }
    return values.flat();
  }

  entries() {
    let entries = [];
    for (const bucket of this.#buckets) {
      if (bucket) {
        try {
          let currentNode = bucket.head;
          for (let i = 0; i < bucket.size; i++) {
            let entry = [];
            entry.push(Object.keys(currentNode.value));
            entry.push(Object.values(currentNode.value));
            currentNode = currentNode.nextNode;
            entry = entry.flat();
            entries.push(entry);
          }
        } catch (error) {
          continue;
        }
      }
    }
    return entries;
  }
}

// let bro = new LinkedL.LinkedList();
// bro.append("testing");
// bro.prepend("attention");
// console.log(`${JSON.stringify(bro.head)} ${bro.size}`);
// console.log(`${JSON.stringify(bro.at(1))}`);
// bro.pop();
// console.log(`${JSON.stringify(bro.head)} ${bro.size}`);
// console.log(bro.contains("attention"));
// console.log(bro.find("attention"));
// console.log(bro.toString());
// bro.prepend("testing");
// console.log(bro.toString());

// // example uses class syntax - adjust as necessary
// const list = new LinkedL.LinkedList();

// list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");
// console.log(list.toString());
// list.insertAt("octopus", 2);
// console.log(list.toString());
// list.removeAt(3);
// console.log(list.toString());

let ash = new Hashmap();
ash.set("Joe", "Many");
ash.set("Bro", "me");
console.log(ash.map.toString());
console.log(ash.get("Joe").toString());
console.log(ash.has("Bro"));
console.log(ash.has("Brother"));
console.log(ash.has("Joe"));
console.log(ash.length());
ash.remove("Bro");
console.log(ash.map.toString());
ash.remove("Joe");
console.log(ash.map.toString());
console.log(ash.length());
console.log(ash.keys());
console.log(ash.values());
console.log(ash.entries());

// const test = new Hashmap(); // or HashMap() if using a factory

// test.set("apple", "red");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray");
// test.set("frog", "green");
// test.set("grape", "purple");
// test.set("hat", "black");
// test.set("ice cream", "white");
// test.set("jacket", "blue");
// test.set("kite", "pink");
// test.set("lion", "golden");
// console.log(test.map.toString());
// console.log(test.capacity);

// test.set("kite", "juniper");
// console.log(test.length());
// console.log(test.entries());
// console.log(test.map.toString());
// console.log(test.capacity);

// test.set("moon", "silver");
// console.log(test.capacity);
// console.log(test.length());
// console.log(test.entries());
// console.log(test.map.toString());
