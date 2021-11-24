class QuickPushOrderedList extends ListNode {

    constructor(compareFunc) {
        super(null, null);

        this.compareFunc = compareFunc;
    }

    pop() {
        let prev = null;
        let curr = this.head;
        let largestVal = this.head.val;

        while (curr != null) {
            if (this.compareFunc(curr.val, largestVal) > 0) {
                largestVal = curr.val;
            }
            prev = curr;
            curr = curr.next;
        }
        return this.deleteNode(this.head, largestVal);
    }


    push(val) {
        //allocate node
        const newNode = new ListNode(val);
        //link the old list off the new node
        newNode.next = this.head;
        //move the head to point to the new node
        this.head = newNode;
    }

    deleteNode(head, target) {
        //target is the head
        if (this.compareFunc(head.val, target) === 0) {
            this.head = head.next
            return head.val;
        }

        let prev = null;
        let curr = head
        while (curr !== null) {
            if (this.compareFunc(curr.val, target) === 0) {
                prev.next = curr.next;
                return curr.val;
            }
            prev = curr;
            curr = curr.next;
        }
    }

    // printList(head) {
    //     while (head != null) {
    //         console.log(head.val + " ");
    //         head = head.next;
    //     }
    // }
}