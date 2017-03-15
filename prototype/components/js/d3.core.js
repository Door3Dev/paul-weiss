//refactor into coreDOM
//var clientContext;
//var website;
var personProperties;
var userProfileProperty;
var user;

var D3SPCoreDOM = {
    create: function() {
        console.log('D3 Start');
        var self = this;
        self.user = null;
        self.website = null;
        self.clientContext = null;
        //LOAD SP Data context if available
        if (typeof SP != 'undefined') {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);
        }
    },
    startRecord: function() {
        var self = this;
        self.isRecording = true;
    },
    stopRecord: function() {
        var self = this;
        self.isRecording = false;
    }
};

function sharePointReady() {
    D3SPCoreDOM.clientContext = SP.ClientContext.get_current();
    D3SPCoreDOM.website = D3SPCoreDOM.clientContext.get_web();
    D3SPCoreDOM.clientContext.load(website);
    SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function() {
        D3SPCoreDOM.clientContext.load(user, 'Include(Title,Value)');
        var peopleManager = new SP.UserProfiles.PeopleManager(D3SPCoreDOM.clientContext);
        personProperties = peopleManager.getPropertiesFor(D3SPCoreDOM.user);
        userProfileProperty = peopleManager.getUserProfilePropertyFor(user, "PictureURL");
    });
    var web = D3SPCoreDOM.clientContext.get_web();
    user = web.get_currentUser(); //must load this to access info.
    D3SPCoreDOM.clientContext.load(user);
    D3SPCoreDOM.clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);
}

function onRequestSucceeded() {
    //this might have to move back from UI 
    D3SPCoreDOM.UI.SetUserProfile(user);
}

function onRequestFailed(sender, args) {
    //alert('Error: ' + args.get_message());
}