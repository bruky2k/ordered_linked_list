
//VARIABLES
let IS_QUICK_POP = true;

const popBtn = document.querySelector("#popButton");
const pushBtn = document.querySelector("#pushButton");
let navElem = document.querySelector("nav");

//For example -  UI that compare integers
let quickPopOrderedLinkedList = new QuickPopOrderedList(Comparator.compareInt);
let quickPushOrderedLinkedList = new QuickPushOrderedList(Comparator.compareInt);

//EVENT LISTENERS
//DOMContentLoaded / load?
window.addEventListener("load", changeHeaderAndBtnLabel);
navElem.addEventListener("click", toggleNavLinks);

document.querySelector("#popButton").addEventListener("click", popItem);
document.querySelector("#pushButton").addEventListener("click", pushItem);

document.querySelector("#userInput").addEventListener("input", enableDisablePushButton);
document.querySelector('#userInput').addEventListener('keypress',  (e) => {
    if (e.key === 'Enter') {
        pushItem(e);
    }
});

//console log list
document.querySelector("#printListBtn").addEventListener("click", () => {
    if(IS_QUICK_POP && quickPopOrderedLinkedList != null){
        quickPopOrderedLinkedList.printList(quickPopOrderedLinkedList.head)
    }
    if(!IS_QUICK_POP && quickPushOrderedLinkedList != null){
        quickPushOrderedLinkedList.printList(quickPushOrderedLinkedList.head)
    }
});


//FUNCTIONS
//on input change disable enable buttons
function enableDisablePushButton(e){
    if(e.target.value !== ""){
        pushBtn.classList.remove("disabled");
    }else {
        pushBtn.classList.add("disabled");
    }
}

function enableDisablePopButton(){
    const inputElement = document.querySelector("#userInput");

    if(IS_QUICK_POP) {
        enableDisablePopBtn(inputElement, quickPopOrderedLinkedList);
    }else {
        if (quickPushOrderedLinkedList !== undefined) {
            if (quickPushOrderedLinkedList.head === null) {
                popBtn.classList.add("disabled");
                inputElement.focus();
            } else {
                popBtn.classList.remove("disabled");
            }
        } else {
            popBtn.classList.add("disabled");
            inputElement.focus();
        }
    }
}

function enableDisablePopBtn(inputElement, linkedList) {
    if (linkedList !== undefined) {
        if (linkedList.head === null) {
            popBtn.classList.add("disabled");
            inputElement.focus();
        } else {
            popBtn.classList.remove("disabled");
        }
    } else {
        popBtn.classList.add("disabled");
        inputElement.focus();
    }
}


function popItem(e){
    if(IS_QUICK_POP){
        // console.log("quick pop");
        popAndDisplayItem(quickPopOrderedLinkedList, quickPopOrderedLinkedList.head,"quickly");
        //check if pop button needs to disabled
        enableDisablePopButton();
    }else {
        // console.log("slow pop");
        popAndDisplayItem(quickPushOrderedLinkedList, quickPushOrderedLinkedList.head, "slowly");
        enableDisablePopButton();
    }

}

function popAndDisplayItem(linkedList, sortedOrHead, msg) {
    if(linkedList !== undefined && sortedOrHead !== null){
        let item = linkedList.pop();

        document.querySelector("#resultOutput p").innerHTML += `${item} ` ;

        console.log(item + ` ${msg} popped`);
    }
}


function pushItem(e){
    const inputElement = document.querySelector("#userInput");
    if(IS_QUICK_POP){
        // console.log("slow push");
        pushAndDisplayMsg(quickPopOrderedLinkedList, inputElement, "slowly");
    }else {
        // console.log("quick push");
        pushAndDisplayMsg(quickPushOrderedLinkedList, inputElement, "quickly");
    }

    //clear UI output on push -> updates the list
    let outputElement = document.querySelector("#resultOutput p");
    if(outputElement){
        outputElement.innerHTML = "";
    }

    //easy for user
    inputElement.focus();
    //enable pop btn
    enableDisablePopButton();
    //disable push btn
    enableDisablePushButton(e);
}

function pushAndDisplayMsg(linkedList, inputElement, msg) {
    if(inputElement.value !== null){
        linkedList.push(inputElement.value);

        // feedbackElement.classList.remove("invalid-feedback");
        // feedbackElement.style.display = "block";
        // feedbackElement.classList.add("valid-feedback");
        // feedbackElement.innerHTML = inputElement.value + ` ${msg} pushed`;
        console.log(inputElement.value + ` ${msg} pushed`);

        //clear input's value after pushing
        inputElement.value = "";
    }
}


function toggleNavLinks(e) {

    e.preventDefault();

    //
    if(e.target.classList.contains("nav-link")){
        //remove prev active status
        navElem.querySelector("a.active").classList.remove("active");

        if(e.target.id.indexOf("quickPop") !== -1){
            e.target.classList.add("active");
            IS_QUICK_POP = true;
            changeHeaderAndBtnLabel();
        }else {
            e.target.classList.add("active");
            IS_QUICK_POP = false;
            changeHeaderAndBtnLabel();
        }
    }
}

function changeHeaderAndBtnLabel() {
    let headerElement = document.querySelector("header h1");
    document.querySelector("#userInput").focus();

    if(IS_QUICK_POP){
        navElem.querySelector("#quickPop").classList.add("active")
        headerElement.innerText = "quick pop ordered list";
        pushBtn.textContent = "Push"
        popBtn.textContent = "Quick Pop";
    }else {
        navElem.querySelector("#quickPush").classList.add("active")
        headerElement.innerText = "quick push ordered list"
        pushBtn.textContent = "Quick Push"
        popBtn.textContent = "Pop";
    }
}
