class Stack {
    constructor() {
        this.items = []
    }

    push(item) {
        this.items.push(item)
    }

    pop() {
        return this.items.pop()
    }

    isEmpty() {
        return this.items.length === 0
    }
}

class Queue {
    constructor() {
        this.items = {}
        this.tail = 0
        this.head = 0
    }

    enqueue(item) {
        this.items[this.tail++] = item
    }

    dequeue() {
        if (this.tail === this.head) return undefined

        let element = this.items[this.head]
        delete this.items[this.head++]
        return element
    }

    isEmpty() {
        return Object.keys(this.items).length === 0
    }
}

module.exports = {
    Stack,
    Queue
};
