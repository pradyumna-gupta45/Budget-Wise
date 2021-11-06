$(function() {

    //to see the value in 'limit' every time we click on extension
    chrome.storage.sync.get('limit', function(budget) {
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(function() {
        var limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({ 'limit': limit }, function() {
                close(); //to close the current tab (hence after adding limit we get back to the previous page)
            });
            //to see limit on screen ,set chrome.storage.sync.get in popup.js, go...
        }
    });

    $('#resetTotal').click(function() {
        chrome.storage.sync.set({ 'total': 0 }, function() {

            var notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Resetting Total",
                message: "Total has been reset to 0."
            };

            //create notification using chrome API, notifOptions is the object here
            chrome.notifications.create('resetNotif', notifOptions);

        });
    });
});