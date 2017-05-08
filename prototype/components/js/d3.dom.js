//Start D3SP Core
var D3SPCoreDOM = Object.create(D3SPCoreDOM);
D3SPCoreDOM.create();
$(document).ready(function() {


    //INITIALIZE UI
    d3UI.prototype = Object.create(null);
    d3UI.prototype.constructor = d3UI;
    $(D3SPCoreDOM).extend(d3UI);

    //INITIALIZE SETTINGS
    Settings.prototype = Object.create(null);
    Settings.prototype.constructor = Settings;
    $(Settings).extend(D3SPCoreDOM);

    //SP SETTINGS SETUP
    var Setting = {
        Settings: new Settings()
    };
    $.extend(D3SPCoreDOM, Setting);

    //UI SETUP
    var UI = {
        UI: new d3UI()
    };
    $.extend(D3SPCoreDOM, UI);

      //KENDO DATE PICKER
    $(D3SPCoreDOM.Settings.DatePicker).kendoDatePicker();
    
    //for the FAQ panels takes the data-faq="id#" generated from list
    $(D3SPCoreDOM.Settings.FAQClass).click(function() {
          $($(this).next()).toggle();
        $($(this).children().first()).toggleClass('fa-caret-right fa-caret-down');
    });
    
    $(D3SPCoreDOM.Settings.ToolClass).mouseenter(function() {
     var src = $(this).children().first().attr('src');
        if(src){
            var newsrc = (src.indexOf("white")===-1) ? src.replace('.png', "-white.png")  : src ;
            $(this).children().first().attr('src', newsrc);  
        }
    });
    
     $(D3SPCoreDOM.Settings.ToolClass).mouseleave(function() {
        var src = $(this).children().first().attr('src');
         if(src){
            var newsrc = (src.indexOf("white")===-1) ?  src : src.replace('-white.png','.png');
            $(this).children().first().attr('src', newsrc);
         }
    });
    
    $(D3SPCoreDOM.Settings.Photogrid + ' li').mouseenter(function() {
     $('.photo-overlay').toggleFade();
    });
    
     $(D3SPCoreDOM.Settings.Photogrid+ ' li').mouseleave(function() {
        $('.photo-overlay').toggleFade();
    });
    
    
 
    //Run on the office only page
    D3SPCoreDOM.UI.CraftClocks($(D3SPCoreDOM.Settings.ClockContainer));
    D3SPCoreDOM.UI.SetCityWeather();
   
    D3SPCoreDOM.UI.SetGradientTables();
    D3SPCoreDOM.UI.GetCurrentSpotlight();
    D3SPCoreDOM.UI.GetSecurityUpdate();
    D3SPCoreDOM.UI.SetHeaderUI();

    
    //add class to body if viewing as admin
    if ($(D3SPCoreDOM.Settings.SharePointMenuId).length) {
    $("body").addClass("isAdmin");
    }



    //close alert header
    $(".d3-alert .close-button").on("click", function() {
        $("body").removeClass("hasAlert");
    });

    //show current time
    var time = moment(new Date()).format("dddd, MMMM DD, YYYY");
    $("#currenttime").html(time);
    
   //search box expansion
     $(D3SPCoreDOM.Settings.searchInputText).on("blur", function() {
      setTimeout(function() {
       if (!$(D3SPCoreDOM.Settings.searchResultsBox).is(":visible")) {
        $(D3SPCoreDOM.Settings.searchResults).removeClass("active");
       }
      }, 150);
     });
     $(D3SPCoreDOM.Settings.searchInputText).on("focus", function() {
      $(D3SPCoreDOM.Settings.searchResultsBox).addClass("active");
     });

     //ellipses for events
     $(D3SPCoreDOM.Settings.CalendarListText).dotdotdot();

    
    //feedback
    $(".feedback a").on("click", function(event) {
        event.preventDefault();
        $(".feedback-modal").modal();
    });
     
    /// DEMO code
    
    //show alert
    $("#alertTest").on("click", function() {
        $("body").addClass("hasAlert");
    });
     $(D3SPCoreDOM.Settings.KendoGridPracticeGroupPeopleId).kendoGrid({
        dataSource: localPracticeGroupPeopleDataSource,
        schema: {
            model: {
                fields: {
                    article: {
                        type: "string"
                    }, 
                    source: {
                        type: "string"
                    },
                    location: {
                        type: "string"
                    }                 
                }
            }
        },
        pageSize: 20,
        serverPaging: false,
        serverFiltering: false,
		sortable: {
		    mode: "single",
		    allowUnsort: true
		},
		filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    startswith: "Starts with",
                                    eq: "Is equal to",
                                    neq: "Is not equal to"
                                }
                            }
                        },
        pageable: false,
        columns: [
        	{
                field: "article",
                width: '424px',
                title: "ARTICLE",
                encoded: false,
                
                filterable: {
                    ui: titleFilter
               }
            },
            {
                field: "source",
                width: '212px',
                title: "SOURCE"
            }, 
            {
                field: "location",
                width: '212px',
                title: "LOCATION"
            }
             ]
    });
    
function titleFilter(element) {
                    element.kendoAutoComplete({
                        dataSource: localPracticeGroupPeopleDataSource
                    });
                    $(element).append("<br/>");
                  
                }
});