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
            var input = $(D3SPCoreDOM.Settings.searchInputText),
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
    
    self.RemoveSearchHistoryItem = (id) => {
        alert("Removed search history item with ID: " + id);
    };
    
    self.OnBackgroundOverlayClicked = () => {
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

 //MARK FOR REMOVE
    self.FilterSearch = function(text) {
        var filter, ul, li, a, i;
        filter = text.value.toUpperCase();
        ul = $(text).next();
        li = $(ul).children("li");

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    };
 //MARK FOR REMOVE
    self.VideoModal = function(element) {

        if (self.inDesignMode()) {
                console.log('I Dont run in Edit mode 6');
        } else {
            if (!self.VideoPlayerOpen) {

                self.VideoPlayerOpen = true;
                //IMPORTANT ORDER show default bootstrap then modifiy.
                $(D3SPCoreDOM.Settings.VideoModalPlayer).modal(D3SPCoreDOM.Settings.modalOptions);
                //D3SPCoreDOM.UI.SetNModal(D3SPCoreDOM.Settings.h3);
            } else {

            }

        }
    };
 //MARK FOR REMOVE
    self.CloseVideoModal = function() {
        self.VideoPlayerOpen = false;
        //order is important
        $(D3SPCoreDOM.Settings.modalBgdrop).removeAttr('style');
        $(D3SPCoreDOM.Settings.modalBgdrop).hide();
        $(D3SPCoreDOM.Settings.VideoModalPlayer).modal('toggle');

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
    
    //MARK FOR REMOVE
    self.SetCharts = function() {
                   $(D3SPCoreDOM.Settings.KendoWorkInProgress).kendoChart({
                title: {
                    text: ""
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "bar"
                },
                series: [{
                    name: "Total Visits",
                    data: [56000, 63000, 74000, 91000, 117000, 138000]
                }, {
                    name: "Unique visitors",
                    data: [52000, 34000, 23000, 48000, 67000, 83000]
                }],
                valueAxis: {
                    max: 140000,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                categoryAxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });

    		$(D3SPCoreDOM.Settings.KendoChartFeesBilled).kendoChart({

            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "bar"
            },
            series: [{
                name: "BILLED",
                data: [56000, 63000, 74000, 91000, 117000, 138000]
            }, {
                name: "RECIEVED",
                data: [52000, 34000, 23000, 48000, 67000, 83000]
            }],
            valueAxis: {
                max: 140000,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                },
                labels: {
                    rotation: "auto"
                }
            },
            categoryAxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            }
        });
        $(D3SPCoreDOM.Settings.DashboardLineChartId).kendoChart({
            title: {
                text: "Gross domestic product growth \n /GDP annual %/"
            },
            legend: {
                position: "bottom"
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                type: "line",
                style: "smooth"
            },
            series: [{
                name: "India",
                data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
            },{
                name: "World",
                data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
            },{
                name: "Russian Federation",
                data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
            },{
                name: "Haiti",
                data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
            }],
            valueAxis: {
                labels: {
                    format: "{0}%"
                },
                line: {
                    visible: false
                },
                axisCrossingValue: -10
            },
            categoryAxis: {
                categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value #"
            }
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
  
};