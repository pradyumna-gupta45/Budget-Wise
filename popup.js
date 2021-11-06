$(function() {

    //to see the value in 'total' every time we click on extension OR..
    //we are making sure that anytime the user enters or opens the popup we are just making sure this total is already displayed.
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
        //(#limit is the id in popup.html)
    });

    //if user clicks submit button this event is listened
    $('#spendAmount').click(function() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            //add the amount which the user has added
            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            //setting this total back in chrome storage, & also check whether it is in limits or not
            chrome.storage.sync.set({ 'total': newTotal }, function() {
                if (amount && newTotal >= budget.limit) {
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh, look's like you've reached your alloted limit."
                    };
                    //create notification using chrome API,limitNotif is the id of the notification & notifOptions is the object here 
                    chrome.notifications.create('limitNotif', notifOptions);

                }
            });

            //updating our UI
            $('#total').text(newTotal);
            $('#amount').val('');



        });
    });
});