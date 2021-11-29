
/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image"
 * clas
 */

const hidePage = `body > :not(.beastify-image) {
                    display: none;
                }`;

function listenForClicks() {
    document.addEventListener("click", (e) => {

        function beastNameToURL(beastName){
            switch (beastName) {
                case "Frog":
                    return browser.runtime.getURL("beasts/frog.jpg");
                case "Snake":
                    return browser.runtime.getURL("beasts/snake.jpg");
                case "Turtle":
                    return browser.runtime.getURL("beasts/turtle.jpg");
            }
        }
        
        /** 
         * Insert the page-hiding CSS into the active tabe,
         * then get the beast URL and
         * send a "beastify" message to content script in
         * the active ta
         */
        function beastify(tabs) {
            browser.tabs.insertCSS({code: hidePage}).then(() => {
                let url = beastNameToURL(e.target.textContent);
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "beastify",
                    beastURL: url
                });
            });
        }

        function reset(tabs) {
            browser.tabs.removeCSS({code: hidePage}).then(() => {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "reset",
                });
            })
        }

        function reportError(error){
            console.error("Could not beastify: $(error)");
        }

        /**
         * Get the active tab and calls
         * beastify() or reset() as appropraite
         */
        if (e.target.classList.contains("beast")) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(beastify)
                .catch(reportError);
        }
        else if (e.target.classList.contains("reset")) { 
            browser.tabs.query({active: true, currentWindow: true})
                .then(reset)
                .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error("Failed to execute beastify content script: ${error.message}");
}

browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
