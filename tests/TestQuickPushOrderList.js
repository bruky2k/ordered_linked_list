function testQuickPushOrderedList() {

    const quickPush = new QuickPushOrderedList(Comparator.compareInt);
    const array = createIntArr(100);
    //1
    console.log("Test push method: (Expected to be the ~same time for every push)");
    let pushRes =  getFirstAndLastPerformanceTime_pushMethod(array);
    console.log(pushRes.firstItem === pushRes.lastItem); //every push time expected to be the ~same

    //2
    console.log("Test pop method: (Expected different time on every pop, it needs to find the largest item on every pop)");
    //first pop
    let popResult1 =  getFirstAndLastItemPerformanceTime_popMethod(array);
    // secondPop
    let popResult2 =  getFirstAndLastItemPerformanceTime_popMethod(array);

    console.log(popResult1 !== popResult2);//Expected different time on every pop, it needs to find the largest item on every pop


    function getFirstAndLastPerformanceTime_pushMethod(arr){
        let res = {};
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
        quickPush.push(arr[i]);
        let end = performance.now();
        console.log(`This ${firstOrLast} item took ${end - start} ms to be pushed`);
        return  end - start;
    }

    function getFirstAndLastItemPerformanceTime_popMethod(ls) {
        //The time should stay constant on every pop
        let start = performance.now();
        let item = ls.pop();
        let end = performance.now();
        console.log(`${item}, took ${end - start} ms to be popped`);
    }
}


function createIntArr(size) {
    const res = [];
    for (let i = 0; i < size; i++) {
        res.push(i + Math.floor(Math.random() * 10));
    }
    return res
}
