class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;

        //first node in list
        this.head = null;
        // this.compareFunc = compareFunc;
    }

    /* Function to print linked list */
    printList(head) {
        if(head != null){
            let list = "";
            while (head != null) {
                list += `${head.val}, `;
                head = head.next;
            }
            console.log(list);
        }else {
            console.log("The list is empty");
        }
    }
}
