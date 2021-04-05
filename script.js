if (window.webkitNotifications) {
  console.log('Your browser supports Notifications');
} else {
  console.log("Your browser doesn't support Notifications =(");
}

var Notifications = {
    requestPermission: function(callback) {
        window.webkitNotifications.requestPermission(callback);
    }
};
   
$(function() {
    $('#enable').click(function() {
        Notifications.requestPermission(function() {
            alert('Permission Granted');
        })
    });
});

var Notifications = {
    requestPermission: function(callback) {
        window.webkitNotifications.requestPermission(callback);
    },
       
    showNotification: function(){
        // Checking if the permission was given
         if (window.webkitNotifications.checkPermission() > 0) {
                // In not, asks again for permission
                Notifications.requestPermission(function() {
                    Notifications.showNotification();
                });
         }
         else {
                // Otherwise, creates the notification and sends it
                var notification = window.webkitNotifications.createNotification("http://userserve-ak.last.fm/serve/64s/318711.jpg", "Hello!", "This is the message");
                notification.show();
         }
    }
};

//Notifications.show("http://userserve-ak.last.fm/serve/64s/318711.jpg", "Here, we'll put the notification message");


var Notifications = {
    apiAvailable: function() {
        if(window.webkitNotifications) {
            return true;
        } else {
            return false;
        }
    },
   
    isAuthorized: function() {
        if (!this.apiAvailable()) return false;
   
        return window.webkitNotifications.checkPermission() > 0 ? false : true;
    },
   
    authorize: function(callback) {
        var self = this;
        if (!this.apiAvailable()) return false;
   
        window.webkitNotifications.requestPermission(function() {
            if (self.isAuthorized()) {
                callback();
            }
        });
    },
   
    show: function(url, title, body) {
        if (!this.apiAvailable()) return false;
   
        var self = this;
   
        if (this.isAuthorized()) {
            var popup = window.webkitNotifications.createNotification(url, title, body);
            popup.show();
            setTimeout(function(){
                popup.cancel();
            }, 5000);
        } else {
            this.authorize(function() { 
                //console.log(arguments); 
                self.show(url, title, body); 
            });
        }
    },
       
    checkForPermission: function() {
        if (!this.isAuthorized()) this.callForPermission();
    },
       
    callForPermission: function() {
           
        var authorizeBox = jQuery('').addClass('notifications-authorize')
                                            .html('')
                                           
        jQuery('body').append(authorizeBox);
           
        jQuery('div.notifications-authorize input').click(function(){
            jQuery(this).remove(); 
            Notifications.authorize();
        });
    }
};
   
$(function() {
    Notifications.checkForPermission();
});
