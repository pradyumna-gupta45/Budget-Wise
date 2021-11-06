var menuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"] //appears only when user selects something on the webpage.
};

//function to check if the item is an integer or not
function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

chrome.contextMenus.create(menuItem);

//listening to the click event on the contextMenu
chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function(budget) {
                var newTotal = 0;

                //adding existing total(by retrieving it using chrome storage)
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }

                //adding what user enters 
                newTotal += parseInt(clickData.selectionText);

                //now set that back in chrome storage
                chrome.storage.sync.set({ 'total': newTotal }, function() {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit reached!",
                            message: "Uh oh, look's like you've reached your alloted limit."
                        };

                        //create notification using chrome API, notifOptions is the object here
                        chrome.notifications.create('limitNotif', notifOptions);

                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName) {
    chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() });
});