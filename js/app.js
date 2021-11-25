
//VARIABLES
let IS_QUICK_POP = true;

// init ui class
const ui = new UI();

let quickPopList = new QuickPopOrderedList(Comparator.compareInt);
let quickPushList = new QuickPushOrderedList(Comparator.compareInt);

//EVENT LISTENERS
window.addEventListener("load", () => {
    ui.changeHeaderAndBtnLabel(true); // quick pop mode on start

    ui.navElem.addEventListener("click", (e) => {
        IS_QUICK_POP = e.target.id.indexOf("quickPop") >= 0;
        ui.toggleNav(e);
    });

    ui.popBtn.addEventListener("click", popItem);
    ui.pushBtn.addEventListener("click", pushItem);

    ui.userInputElm.addEventListener("input", enableDisablePushButton);
    ui.userInputElm.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            pushItem(e);
        }
    })
})

//prints list to console
document.querySelector("#printListBtn").addEventListener("click", () => {
    ui.printListToConsole(IS_QUICK_POP);
});

//FUNCTIONS
function popItem(e) {
    if (IS_QUICK_POP) {
        // console.log("quick pop");
        popAndDisplayItem(quickPopList, quickPopList.head, "quick pop");
        //check if pop button needs to be disabled
        ui.enableDisablePopButton(true);
    } else {
        // console.log("slow pop");
        popAndDisplayItem(quickPushList, quickPushList.head, "slow pop");
        ui.enableDisablePopButton(false);
    }
}

function popAndDisplayItem(linkedList, sortedOrHead, msg) {
    if (linkedList !== undefined && sortedOrHead !== null) {
        let poppedItem = linkedList.pop();
        document.querySelector("#resultOutput p").innerHTML += `${poppedItem} `;
        ui.showFeedback(poppedItem, msg);
        console.log(poppedItem + ` ${msg}`);
    }
}

function pushItem(e) {
    const inputElement = document.querySelector("#userInput");
    if (IS_QUICK_POP) {
        pushAndDisplayMsg(quickPopList, inputElement, "slow push");
    } else {
        pushAndDisplayMsg(quickPushList, inputElement, "quick push");
    }

    //clear UI output on push -> updates the list
    let outputElement = document.querySelector("#resultOutput p");
    outputElement ? outputElement.innerHTML = "" : "";

    inputElement.focus();
    ui.enableDisablePopButton(IS_QUICK_POP);
    enableDisablePushButton(e);
}

function pushAndDisplayMsg(linkedList, inputElement, msg) {
    if (inputElement.value !== null) {
        linkedList.push(inputElement.value);

        ui.showFeedback(inputElement.value, msg);
        console.log(inputElement.value + ` ${msg}`);

        inputElement.value = "";
    }
}

function enableDisablePushButton(e) {
    ui.enableDisablePushBtnForEmptyInput(e)
}