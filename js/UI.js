class UI {
    constructor() {
        this.popBtn = document.querySelector("#popButton");
        this.pushBtn = document.querySelector("#pushButton");
        this.navElem = document.querySelector("nav");
        this.userInputElm = document.querySelector("#userInput");
    }

    toggleNav(e) {
        e.preventDefault();
        //
        if (e.target.classList.contains("nav-link")) {
            //remove prev active status
            this.navElem.querySelector("a.active").classList.remove("active");

            if (e.target.id.indexOf("quickPop") !== -1) {
                e.target.classList.add("active");
                // IS_QUICK_POP = false;
                this.changeHeaderAndBtnLabel(true);
            } else {
                e.target.classList.add("active");
                // IS_QUICK_POP = false;
                this.changeHeaderAndBtnLabel(false);
            }
        }
    }

    changeHeaderAndBtnLabel(isQuickPopMode = true) {
        let headerElement = document.querySelector("header h1");
        document.querySelector("#userInput").focus();

        if (isQuickPopMode) {
            this.navElem.querySelector("#quickPop").classList.add("active")
            headerElement.innerText = "quick pop ordered list";
            this.pushBtn.textContent = "Push"
            this.popBtn.textContent = "Quick Pop";
        } else {
            this.navElem.querySelector("#quickPush").classList.add("active")
            headerElement.innerText = "quick push ordered list"
            this.pushBtn.textContent = "Quick Push"
            this.popBtn.textContent = "Pop";
        }
    }

    enableDisablePushBtnForEmptyInput(e) {
        if (e.target.value !== "") {
            this.pushBtn.classList.remove("disabled");
        } else {
            this.pushBtn.classList.add("disabled");
        }
    }

    enableDisablePopButton(isQuickPopMode) {
        if (isQuickPopMode) {
            this.enableDisablePopBtn(ui.userInputElm, quickPopList);//PopOrdered list
        } else {
            this.enableDisablePopBtn(ui.userInputElm, quickPushList);//PushOrdered list
        }
    }

    enableDisablePopBtn(inputElem, linkedList) {
        if (linkedList !== undefined) {
            if (linkedList.head === null) {
                this.popBtn.classList.add("disabled");
                inputElem.focus();
            } else {
                this.popBtn.classList.remove("disabled");
            }
        } else {
            this.popBtn.classList.add("disabled");
            inputElem.focus();
        }
    }

    showFeedback(value, msg) {
        let feedbackElement = document.querySelector("#feedback");
        feedbackElement.classList.remove("invalid-feedback");
        feedbackElement.style.display = "block";
        feedbackElement.classList.add("valid-feedback");
        feedbackElement.innerHTML = value + ` ${msg}`;
    }

    printListToConsole(isQuickPopMode) {
        if (isQuickPopMode && quickPopList != null) {
            quickPopList.printList(quickPopList.head);
        }
        if (!isQuickPopMode && quickPushList != null) {
            quickPushList.printList(quickPushList.head);
        }
    }

}


