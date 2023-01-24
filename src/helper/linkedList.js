//Node
class Node {
  constructor(elm, next = null, prev = null) {
    this.element = elm;
    this.next = next;
    this.prev = prev;
  }
}

class DoubleLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  //Add new element
  append = function (element) {
    let node = new Node(element),
      current = this.head,
      previous;

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  };

  //Add element
  insert = function (position, element) {
    //Check of out-of-bound values
    if (position >= 0 && position <= this.length) {
      let node = new Node(element),
        current = this.head,
        previous,
        index = 0;

      if (position === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      } else if (position === this.length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        node.next = current;
        previous.next = node;

        //New
        current.prev = node;
        node.prev = previous;
      }

      this.length++;
      return true;
    } else {
      return false;
    }
  };

  //Remove element at any position
  removeAt = function (position) {
    //look for out-of-bounds value
    if (position > -1 && position < this.length) {
      let current = this.head,
        previous,
        index = 0;

      //Removing first item
      if (position === 0) {
        this.head = current.next;

        //if there is only one item, update tail //NEW
        if (length === 1) {
          this.tail = null;
        } else {
          this.head.prev = null;
        }
      } else if (position === this.length - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        //link previous with current's next - skip it
        previous.next = current.next;
        current.next.prev = previous;
      }

      this.length--;
      return current.element;
    } else {
      return null;
    }
  };

  //Get the indexOf item
  indexOf = function (elm) {
    let current = this.head,
      index = -1;

    //If element found then return its position
    while (current) {
      if (elm === current.element) {
        return ++index;
      }

      index++;
      current = current.next;
    }

    //Else return -1
    return -1;
  };

  //Find the item in the list
  isPresent = (elm) => {
    return this.indexOf(elm) !== -1;
  };

  //Delete an item from the list
  delete = (elm) => {
    return this.removeAt(this.indexOf(elm));
  };

  //Delete first item from the list
  deleteHead = function () {
    this.removeAt(0);
  };

  //Delete last item from the list
  deleteTail = function () {
    this.removeAt(this.length - 1);
  };

  //Print item of the string
  toString = function () {
    let current = this.head,
      string = "";

    while (current) {
      string += current.element + (current.next ? "\n" : "");
      current = current.next;
    }

    return string;
  };

  //Convert list to array
  toArray = function () {
    let arr = [],
      current = this.head;

    while (current) {
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  };

  //Check if list is empty
  isEmpty = function () {
    return this.length === 0;
  };

  //Get the size of the list
  size = function () {
    return this.length;
  };

  //Get the head
  getHead = function () {
    return this.head;
  };

  //Get the tail
  getTail = function () {
    return this.tail;
  };
}

export { Node, DoubleLinkedList };
