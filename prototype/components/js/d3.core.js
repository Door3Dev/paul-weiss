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
        self.WeatherLocation = null;
        self.clientContext = null;
        self.peopleManager = null;
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
    D3SPCoreDOM.clientContext.load(D3SPCoreDOM.website);
   
    var web = D3SPCoreDOM.clientContext.get_web();
    user = web.get_currentUser(); //must load this to access info.
    D3SPCoreDOM.clientContext.load(user);
    D3SPCoreDOM.clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);
}


var userProfileProperties;

function getUserProperties() {

    // Replace the placeholder value with the target user's credentials.
    var targetUser =  user.get_loginName();
    //targetUser = "d3\\joseph.loiacono";
    var peopleManager = new SP.UserProfiles.PeopleManager(D3SPCoreDOM.clientContext);
    var profilePropertyNames = ["Office"];
    var userProfilePropertiesForUser = 
        new SP.UserProfiles.UserProfilePropertiesForUser(
            D3SPCoreDOM.clientContext,
            targetUser,
            profilePropertyNames);
    userProfileProperties = peopleManager.getUserProfilePropertiesFor(
        userProfilePropertiesForUser);

    D3SPCoreDOM.clientContext.load(userProfilePropertiesForUser);
    D3SPCoreDOM.clientContext.executeQueryAsync(onRequestSuccess, onRequestFail);
}

function onRequestSuccess() 
{
	if(userProfileProperties.length > 0)
	{
		D3SPCoreDOM.WeatherLocation = userProfileProperties[0];
	 	D3SPCoreDOM.UI.SetProfileWeather(D3SPCoreDOM.WeatherLocation);
	}
}

function onRequestFail(sender, args) {
   var f= "Error: " + args.get_message();
}


function onRequestSucceeded() {
    //this might have to move back from UI 
    D3SPCoreDOM.UI.SetUserProfile(user); 
    SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', getUserProperties);
}

function onRequestFailed(sender, args) {
    //alert('Error: ' + args.get_message());
}