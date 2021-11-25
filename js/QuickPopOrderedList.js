class QuickPopOrderedList extends ListNode {
    constructor(compareFunc) {
        super(null, null);
        this.compareFunc = compareFunc;
    }

    pop() {
        const retValue = this.head.val;
        this.head = this.head.next;
        return retValue;
    }

    push(val) {
        //allocate node
        const newNode = new ListNode(val);

        //link the old list off the new node
        newNode.next = this.head;
        //should order after push.
        this.compareAndInsert(newNode);
    }

    compareAndInsert(newNode) {
        //insert new node in already ordered list is maybe better...
         //in case we insert the head of list
        if (this.head == null || this.compareFunc(this.head.val, newNode.val) <= 0) { //when a<b or a=b
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            /* Locate the node before the point of insertion */
            //
            while (current.next != null && this.compareFunc(current.next.val, newNode.val) > 0) { // as long as a>b
                current = current.next;
            }
            newNode.next = current.next;//curr.next.next
            current.next = newNode;
        }
    }

}


