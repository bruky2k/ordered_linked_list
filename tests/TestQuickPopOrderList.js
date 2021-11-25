function testQuickPopOrderedList() {
    const quickPop = new QuickPopOrderedList(Comparator.compareInt);
    const array = createIntArr(100);
    //1
    console.log("Test push method: (Pushing the last item expected to be slower then firstItem)");
    let pushRes =  getFirstAndLastItemPerformanceTime_pushMethod(array); //res { first: xx, last xx}

    console.log(pushRes.firstItem < pushRes.lastItem); //lastItem expected to be slower then firstItem (expected true)


    //2
    console.log("Test pop method: (Expected ~same time on every pop)");
    getFirstAndLastItemPerformanceTime_pushMethod(array);
    //pop head
    let popResult1 =  getFirstAndLastPerformanceTime_popMethod(array);
    //pop head.next
    let popResult2 =  getFirstAndLastPerformanceTime_popMethod(array);

    console.log(popResult1 === popResult2);//Expected ~same time on every pop (expected to print true)

    function getFirstAndLastPerformanceTime_popMethod(ls) {
        //The time should stay constant on every pop
        let start = performance.now();
        let item = ls.pop();
        let end = performance.now();
        console.log(`${item}, took ${end - start} ms to be popped`);
    }

    function getFirstAndLastItemPerformanceTime_pushMethod(arr){
        const res = {};
        for (let i = 0; i < arr.length; i++) {
            //The time will change according to the size of the list
            if (i === 0) {
                res.firstItem = InsertArrItem(arr, i, "first");
            }
            if (i === arr.length - 1) {
                res.lastItem = InsertArrItem(arr, i, "last");
            }
        }
        return res;
    }

    function InsertArrItem(arr, i, firstOrLast) {
        let start = performance.now();
        quickPop.push(arr[i]);
        let end = performance.now();
        console.log(`This ${firstOrLast} item took ${end - start} ms to be pushed`);
        return  end - start;
    }
}

function createIntArr(size) {
    const res = [];
    for (let i = 0; i < size; i++) {
        res.push(i + Math.floor(Math.random() * 10));
    }
    return res
}
