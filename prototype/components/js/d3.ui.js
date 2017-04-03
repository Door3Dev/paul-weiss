var d3UI = function(SharePointSiteURL, SharePointRestAPI, framework) {
    var self = this;
    self.framework = framework;
    self.On = false;
    self.Alert = false; //the safety alert is off by default
    self.SharePointUI = false; //if the sharepoint UI is open
    self.SharePointRestAPI = SharePointRestAPI;
    self.SharePointSiteURL = SharePointSiteURL;
    self.EditMode = false;
    self.VideoPlayerOpen = false;
    self.inDesignMode = function() {
        self.EditMode = (window.MSOWebPartPageFormName != undefined) &&
            ((document.forms[window.MSOWebPartPageFormName] && document.forms[window.MSOWebPartPageFormName].MSOLayout_InDesignMode &&
                ("1" == document.forms[window.MSOWebPartPageFormName].MSOLayout_InDesignMode.value)) || (document.forms[window.MSOWebPartPageFormName] &&
                document.forms[window.MSOWebPartPageFormName]._wikiPageMode && ("Edit" == document.forms[window.MSOWebPartPageFormName]._wikiPageMode.value)));
        return self.EditMode || false;
    };

    self.SearchHandler = function() {
        if (self.inDesignMode()) {
            console.log('I Dont run in Edit mode 6');

        } else {
            
            //search code goes here
            
            
            
            //toggle display
            var input = $(D3SPCoreDOM.Settings.searchBox),
                results = $(D3SPCoreDOM.Settings.searchResultsBox),
                background = $(D3SPCoreDOM.Settings.backgroundOverlay);
            
            if(results.hasClass('show')){
                input.removeClass("active");
                results.removeClass('show');
                background.removeClass('show');
            } else{
                input.addClass("active");
                results.slideDown({duration:250})
                background.addClass('show');
            }
        }
    };
    
    self.RemoveSearchHistoryItem = function(id) {
        alert("Removed search history item with ID: " + id);
    };
    
    self.OnBackgroundOverlayClicked = function() {
        //hide background
        $(D3SPCoreDOM.Settings.backgroundOverlay).removeClass('show');
        
        //give focus to textbox if search results was open
        if($(D3SPCoreDOM.Settings.searchResultsBox).css('display') != "none"){
            $(D3SPCoreDOM.Settings.searchInputText).focus();
        }
        
        //hide any elements that use a background that may be showing
        $('.hasBackground').removeClass('show').css("display", "none");
    };

    self.SetUserProfile = function(user) {
        if (self.inDesignMode()) {
            console.log('I Dont run in Edit mode 7');

        } else {
        D3SPCoreDOM.user = user;
        D3SPCoreDOM.Settings.SPUserName = user.get_title();
        $(D3SPCoreDOM.Settings.SPUser).text("Welcome, " + D3SPCoreDOM.Settings.SPUserName);
        $(D3SPCoreDOM.Settings.SPUserProfileIconID).attr('src', D3SPCoreDOM.Settings.SPUserProfileIcon);
        
          
        }
    };



   self.SetGradientTables = function(){
        $(D3SPCoreDOM.Settings.GradientTable).each(function(i,e){
            var rateLimit = parseInt($(e).attr('data-limit'));
            var height = D3SPCoreDOM.Settings.GradientTableRowHeight;
            var computer = rateLimit * height;
            $(e).find(D3SPCoreDOM.Settings.GradientTableInner).css("max-height", computer + "px");
            $(e).find(D3SPCoreDOM.Settings.GradientTableOverflow).css("height", computer + "px");
        });
    };
    
    
    self.CraftClocks = function(domElement) {
        if (self.inDesignMode()) 
        {
             console.log('I Dont run in Edit mode 1');
        } 
        else 
        {
            //first figure out how many clocks were rendering
            var clocks = $(domElement).find(D3SPCoreDOM.Settings.ClockClass);
            if (clocks.length > 1) 
            {
                //loop all the clocks in the list and render based on the skin css class
                for (i = 0; i < clocks.length; i++) {
                    var city;
                    var element = clocks[i];
                    city = $(element).attr("data-ref");
                    var clockData = $.grep(ClockData, function(item, g) {
                        return item.city === city;
                    });
                    
                    if(clockData.length === 1)
                    {
                        clockData = clockData[0];
                        var mode = ($(element).hasClass(D3SPCoreDOM.Settings.ClockAnalogMode)) ? D3SPCoreDOM.Settings.ClockAnalogMode : D3SPCoreDOM.Settings.ClockDigtalMode;
                        $(element).removeClass(mode);
                        var cItem = $(document.createElement("div")).attr({
                                    id: (mode + i),
                                    class: D3SPCoreDOM.Settings.ClockItemClassName, title: city,
                                    }).append(D3SPCoreDOM.Settings.ClockItemBaseHtml(i, mode));
                        if(mode !==D3SPCoreDOM.Settings.ClockAnalogMode){
                               $(element).append(city);
                            $(element).append(cItem);
                                 
                        }else{
                             $(element).append(cItem);
                                    $(element).append(city);
                        }
                                
                        //this renders the clock
                        $(cItem).clock({
                            offset: clockData.timeZone,
                            type: mode
                        }); 
                    
                    }
                }
            }
        }
    };
    
    
    self.SetWeathIcon = function(code)
    {
         switch(code){
            case 0: 
            return "wi-tornado";
            break;
            case 1:
            return "wi-storm-warning";
            break;
             case 2:
            return "wi-hurricane";
            break;
             case 3:
            return "wi-thunderstorm";
            break;
             case 4:
            return "wi-storm-showers";
            break;
             case 5:
            return "wi-rain-mix";
            break;
              case 6:
            return "wi-sleet";
            break;
              case 7:
            return "wi-snow";
            break;
              case 8:
            return "wi-sprinkle";
            break;
              case 9:
            return "wi-sprinkle";
            break;
              case 10:
            return "wi-rain";
            break;
              case 11:
            return "wi-showers";
            break;
              case 12:
            return "wi-showers";
            break;
              case 13:
            return "wi-snow";
            break;
             case 14:
            return "wi-snow-wind";
            break;
             case 15:
            return "wi-snow-wind";
            break;
             case 16:
            return "wi-snow";
            break;
             case 17:
            return "wi-hail";
            break;
             case 18:
            return "wi-sleet";
            break;
             case 19:
            return "wi-dust";
            break;
             case 20:
           return "wi-fog";
            break;
             case 21:
            return "wi-day-haze";
            break;
             case 22:
            return "wi-smoke";
            break;
             case 23:
            return "wi-cloudy-gusts";
            break;
             case 24:
            return "wi-cloudy-windy";
            break;
            case 25:
           return "wi-snowflake-cold";
            break;
            case 26:
           return "wi-cloudy";
            break;
            case 27:
           return "wi-night-alt-cloudy";
            break;
            case 28:
            return "wi-day-cloudy";
            break;
            case 29:
           return "wi-night-alt-partly-cloudy";
            break;
            case 30:
            return "wi-day-sunny-overcast";
            break;
            case 31:
            return "wi-night-clear";
            break;
            case 32:
           return "wi-day-sunny";
            break;
            case 33:
           return "wi-night-clear";
            break;
            case 34:
           return "wi-day-sunny";
            break;
            case 35:
           return "wi-day-rain-mix";
            break;
            case 36:
           return "wi-hot";
            break;
            case 37:
           return "wi-thunderstorm";
            break;
            case 38:
           return "wi-thunderstorm";
            break;
            case 39:
           return "wi-thunderstorm";
            break;
            case 40:
           return "wi-thunderstorm";
            break;
            case 41:
           return "wi-day-snow";
            break;
            case 42:
           return "wi-snow-wind";
            break;
            case 43:
           return "wi-day-snow";
            break;
            case 44:
           return "wi-cloudy";
            break;
            case 45:
           return "wi-storm-showers";
            break;
            case 46:
           return "wi-storm-showers";
            break;
            case 47:
           return "wi-storm-showers";
            break;
            case 3200:
            return "wi-na";
            break;  
        }
    }
    
    
    self.SetProfileWeather = function() 
    {    
    		city = D3SPCoreDOM.WeatherLocation;
		 $.simpleWeather({
	                location: city ,
	                woeid: '',
	                unit: 'f',
	                success: function(weather) {
	                      	html = '<p>';
					        html += ' <i class="wi ' + self.SetWeathIcon(parseInt(weather.code)) + '"></i> &nbsp;';
					        html += weather.currently; 
					        html += ',  ' + weather.temp + '&deg; ' + weather.units.temp + '';
					        html += '</p>';
					        	$(D3SPCoreDOM.Settings.UserWeatherBox).html(html);
	                        },
	                error: function(error) {
	                  $(D3SPCoreDOM.Settings.CityWeatherBox).html('<span style="font-size:10px">Unavailable Please Reload.</span>');
	                }
	              });
    }
    
    self.SetCityWeather = function(city) {
        if (false)//self.inDesignMode()) 
        {
            console.log('I Dont run in Edit mode 2');
        } 
        else 
        {
        	if(!city)
        	{
        	  city =  $(D3SPCoreDOM.Settings.CityWeatherBox).attr("data-city");
        	}
            $.simpleWeather({
                location: city ,
                woeid: '',
                unit: 'f',
                success: function(weather) {
                      html = '';
                      html += '<ul class="d3-weather-detail">';
                    
                      html += '<li> '+weather.city+', '+ weather.region+'</li>';
                      html += '<li class="currently"><small>'+weather.currently+'</small><br/>'+weather.temp+'&deg;'+weather.units.temp+'<i class="wi ' + self.SetWeathIcon(parseInt(weather.code)) + '"></i></li>';
                      //html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li>';
                      html += '</ul>';
                      $(D3SPCoreDOM.Settings.CityWeatherBox).html(html);
                },
                error: function(error) {
                  $(D3SPCoreDOM.Settings.CityWeatherBox).html('<span style="font-size:10px">Unavailable Please Reload.</span>');
                }
              });
        }
    }; 
    
    
    self.GetListData = function(url, listname, complete, failure)
	{
    	$.ajax({
				url: url + "/_api/web/lists/getbytitle('" + listname + "')/items",
				//(" + id + ")"
				method: "GET",
				headers: { "Accept": "application/json; odata=verbose" },
				success: function (data) {
					// Returning the results
					console.log(typeof(complete));
					console.log(typeof(self.SpotLightComplete));
					complete(data);
				},
				error: function (data) {
					failure(data);
				}
				});
			
    };
		
	self.GetSecurityUpdate = function()
	{
		self.GetListData("http://akins2016/sites/pw","SECURITY UPDATES", self.SecurityListComplete);
    };
	self.GetCurrentSpotlight = function()
	{
	 self.GetListData("http://akins2016/sites/pw","Company Spotlight", self.SpotLightComplete);
	};
	
	self.SecurityListComplete = function(data)
	{
		var d = $('.security-updates');
		$.each(data.d.results, function(i,e){
	       $(d).append("<div class=\"update\"><h4>{0}<br></h4><p>{1}</p></div>".format(e.Created, e.Title));
		});
	};	
	
	self.SpotLightComplete = function(data)
	{
		if(data.d.results.length >0)
		{
			$(D3SPCoreDOM.Settings.SpolitLightContentHtml).children('.title').html(data.d.results[0].Title);
			$(D3SPCoreDOM.Settings.SpolitLightContentHtml).children('p').html(data.d.results[0].SpotLightContent);
		}
	};	

  	self.ListFailure = function(data)
	{
  		
  	};	
    
    //UPDATE THIS
    self.SetHeaderUI = function(){
       var w = window.location.pathname;
        $(".d3-navbar").find('li').removeClass('active');
        if(w.indexOf("ServiceDirectory") != -1){
            $('.service').toggleClass('active');
        }
        if(w.indexOf("homepage") != -1){
               $('.home').toggleClass('active');
        }
        if(w.indexOf("office") != -1){
               $('.office').toggleClass('active');
        }
         if(w.indexOf("employee-profile") != -1){
               $('.firm').toggleClass('active');
        }
         if(w.indexOf("resources") != -1){
               $('.resource').toggleClass('active');
        }
        
    }
    
  
    //highlights the active menu link for the current page
    self.ActiveNavMenuLink = function(index) {
        $(".paulweiss .nav.navbar-nav li").removeClass("active");
        $(".paulweiss .nav.navbar-nav li:nth-child(" + index + ")").addClass("active");
    };
};