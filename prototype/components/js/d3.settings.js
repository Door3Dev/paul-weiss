var Settings = function(name) {
	var self = this;
	self.name = name;
	self.h1 = "185px"; 
	self.h2 = "292px"; 
	self.h3 = "239px";
	self.h4 = "428px"; 
	//the heights for the header in both the affixed and default states
	self.SharePointMenuId = "#ms-designer-ribbon";
	//DOM classes
    self.searchBox = ".search-box";
	self.searchResultsBox = ".search-results";
	self.searchInputText = ".d3-search-box-input";
	self.modalContent = ".d3-modal-content"; 
	self.searchResults =".d3-search-box"; 
	self.modalClass = ".d3-menu-modal";
	self.modalBgdrop = ".modal-backdrop";
	self.modalDialog = ".d3-modal-dialog";
	self.alertClass = ".d3-alert";
	self.ribbonID = "#ribbon-hover";
	self.FAQClass= ".faq-click";
    self.backgroundOverlay= ".background-overlay"
    //CLOCK
	self.ClockContainer = ".d3-clock-container";
    self.ClockDigtalMode = "digital"; //default
    self.ClockAnalogMode = "analog"; //default
    self.ClockClass = ".d3-office-clock";
    self.ClockItemClassName = "d3-clock-item";
    self.ClockItemBaseHtml = function(i, type){ 
        
        return ("<ul id=\"" + type + i + "\" class=\"" + type + "\"><li class=\"hour\"></li><li class=\"min\"></li> " + ((type==="digital") ? "<li class=\"meridiem\"></li>" : "") + "</ul>"); 
    }
	
    
    self.logo = ".logo";
	self.header = ".d3-header";
	//DOM id
	self.navBg = "#navbg";
	self.nav = "#nav";
	self.kendoTab = "#tabstrip";
	self.SPUser = "#SPUser";
	self.SPUserName = "Default";
	self.SPUserProfileIconID = ".d3-sharepoint-user-icon";
	self.SPUserProfileIcon = "http://spjoe/sites/d3white/SiteAssets/d3/images/sharepoint_user_icon.png";
    self.modalOptions = null;
    self.VideoModalPlayer = "#VideoModalPlayer";
    self.DatePicker = ".d3-datepicker";
    self.KendoGridBrowseAllMyClientId = "#browse-all-my-clients";
    self.KendoGridTimeEntry = "#time-entry";
    self.GradientFadeTable = ".d3-fade-effect";
    self.GradientTable = ".d3-gradient-table";
    self.GradientTableInner = ".d3-gradient-table-inner";
    self.GradientTableOverflow = ".d3-gradient-overflow";
    self.GradientTableRowHeight = 40;
    self.DashboardLineChartId = ".d3-dashboard-chart-line";
    self.KendoChartFeesBilled = ".d3-fees-billed-chart";
    
     self.UserWeatherBox = ".d3-weather-header";
    self.CityWeatherBox = ".d3-city-weather-box";
    self.KendoProfileFilterBox = ".d3-profile-filter";
    self.KendoWorkInProgress = ".d3-work-in-progress";
     self.SpolitLightContentHtml = ".side-spotlight";
    self.ToolClass = ".tool";
    self.KendoGridPracticeGroupPeopleId = ".practice-group-people-grid";
    self.Photogrid = ".photo-grid";
    self.NewsModal = ".content-modal";
    self.NewModalContentContainerId = '.modal-content';
    self.NewsModalContentId = ".modal-content-hidden";
};
