class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;

        this.head = null;
        // this.compareFunc = compareFunc;
    }

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
