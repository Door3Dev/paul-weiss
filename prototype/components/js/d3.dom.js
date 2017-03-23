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

    //CHECK IF ALERT IS OPEN
    D3SPCoreDOM.Settings.Alert = $(D3SPCoreDOM.Settings.alertClass).filter(":visible").length > 0;

    //HIDE MODAL BACK ON SCROLL
    window.onscroll = function(e) {
        //IF THE MODAL IS VIDEO STOP
        if (!D3SPCoreDOM.Settings.VideoPlayerOpen) {
            $(D3SPCoreDOM.Settings.modalClass).modal('hide');
            $(D3SPCoreDOM.Settings.modalBgdrop).hide();
            e.preventDefault();
        }
    }

    //AFFIX NAV MODAL ON SCROLL
    $(D3SPCoreDOM.Settings.nav).affix({
        offset: $(D3SPCoreDOM.Settings.nav).position()
    });
    $(D3SPCoreDOM.Settings.navBg).affix({
        offset: $(D3SPCoreDOM.Settings.nav).position()
    });

    //HIDE OR SHOW THE SHAREPOINT MENU
    $(D3SPCoreDOM.Settings.ribbonID).mouseenter(function() {
        $(D3SPCoreDOM.Settings.SharePointMenuId).fadeIn();

    }).mouseleave(function() {
        $(D3SPCoreDOM.Settings.SharePointMenuId).fadeOut();
    });


    $(D3SPCoreDOM.Settings.modalDialog).mouseleave(function() {
        $(D3SPCoreDOM.Settings.modalClass).modal('hide');
    });

    $(D3SPCoreDOM.Settings.GradientFadeTable).mouseenter(function(e) {
        //$(e).removeClass("d3-gradient-table");
        var f = $(e.currentTarget).find('.d3-gradient-overflow');
        var g = $(e.currentTarget).find('.d3-gradient-table-inner');
        $(f).fadeOut();
        $(g).css("max-height", "");

    }).mouseleave(function(e) {
        $(e).addClass("d3-gradient-table");
        $(e).children('.d3-gradient-overflow').show();
        var f = $(e.currentTarget).find('.d3-gradient-overflow');
        var g = $(e.currentTarget).find('.d3-gradient-table-inner');
        $(f).fadeIn();
        $(g).css("max-height", "120px");
    });

    //ON THE AFFIX OF THE HEADER ADJUST THE DESIGN
    $(D3SPCoreDOM.Settings.nav).on('affix.bs.affix', function() {
        if (!$(window).scrollTop()) return false;
        D3SPCoreDOM.Settings.SharePointUiIsOn = $(D3SPCoreDOM.Settings.SharePointMenuId).filter(":visible").length > 0;
        $(D3SPCoreDOM.Settings.SharePointMenuId).hide();
        $(D3SPCoreDOM.Settings.logo).css("padding-top", "10px");
        $(D3SPCoreDOM.Settings.logo).css("height", "30");
        $(D3SPCoreDOM.Settings.searchResults).css("padding-top", "15px");
        $(D3SPCoreDOM.Settings.navBg).css("height", D3SPCoreDOM.Settings.h1);
        $(D3SPCoreDOM.Settings.header).css("height", D3SPCoreDOM.Settings.h1);
        $(D3SPCoreDOM.Settings.searchResultsBox).css("top", D3SPCoreDOM.Settings.h4);
        D3SPCoreDOM.Settings.on = true;
    });

    //ON THE AFFIX OFF OF THE HEADER ADJUST THE DESIGN
    $(D3SPCoreDOM.Settings.nav).on('affixed-top.bs.affix ', function() {
        // $(D3SPCoreDOM.Settings.logo).css("padding-top", "32px");
        $(D3SPCoreDOM.Settings.logo).css("height", "");
        //$(D3SPCoreDOM.Settings.searchResults).css("padding-top", "32px");
        $(D3SPCoreDOM.Settings.searchResults).css("height", "");
        $(D3SPCoreDOM.Settings.searchResultsBox).css("top", "150px");
        D3SPCoreDOM.Settings.on && $(D3SPCoreDOM.Settings.navBg).css("height", D3SPCoreDOM.Settings.h3);
        D3SPCoreDOM.Settings.on && $(D3SPCoreDOM.Settings.header).css("height", D3SPCoreDOM.Settings.h3);
        D3SPCoreDOM.Settings.on = false;
    });

    //for the FAQ panels takes the data-faq="id#" generated from list
    $(D3SPCoreDOM.Settings.FAQClass).click(function() {
          $($(this).next()).toggle();
        $($(this).children().first()).toggleClass('fa-caret-right fa-caret-down');
    });

    $(D3SPCoreDOM.Settings.modalClass).on('hide.bs.modal', function() {
        if ($(D3SPCoreDOM.Settings.searchResultsBox).filter(":visible").length > 0) {}
        $(D3SPCoreDOM.Settings.searchResultsBox).slideUp('fast');
    });

    //WHEN THE MODAL HIDES
    $(D3SPCoreDOM.Settings.modalClass).on('hidden.bs.modal', function() {});

    //WHEN THE ADER MENU MODAL DISPLAYS
    $(D3SPCoreDOM.Settings.modalClass).on('show.bs.modal', function() {
        D3SPCoreDOM.Settings.on ? D3SPCoreDOM.UI.SetNModal(D3SPCoreDOM.Settings.h1) : D3SPCoreDOM.UI.SetNModal(D3SPCoreDOM.Settings.h3);
        $(document).off('focusin.modal');
        $(D3SPCoreDOM.Settings.searchInputText).select();
    });

    //FADE THE NAV BG / MENU FROM ANY POSITION
    $(D3SPCoreDOM.Settings.modalClass).on('shown.bs.modal', function() {
        D3SPCoreDOM.Settings.on ? $(D3SPCoreDOM.Settings.modalBgdrop).animate({
            top: D3SPCoreDOM.Settings.h1,
        }, 100) : D3SPCoreDOM.UI.SetNModal(D3SPCoreDOM.Settings.h3);

        $(document).off('focusin.modal');
        $(D3SPCoreDOM.Settings.searchInputText).select();
    });


    //KENDO TAB
    $(D3SPCoreDOM.Settings.kendoTab).kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });

    //KENDO DATE PICKER
    $(D3SPCoreDOM.Settings.DatePicker).kendoDatePicker();


    $(D3SPCoreDOM.Settings.KendoProfileFilterBox).kendoDropDownList({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        headerTemplate: '<div class="dropdown-header k-widget k-header d3-profile-filter-droplist ">' +
            '<span>Photo</span>' +
            '<span>Contact info</span>' +
            '</div>',
        footerTemplate: 'Total #: instance.dataSource.total() # items found',
        valueTemplate: '<span class="selected-value" style="background-image: url(\'images/office-avatar.png\')"></span><span>#:data.ContactName#</span>',
        template: '' +
            '<div class="k-state-default media-right text-right"> <img src="images/office-avatar.png" class="pull-left img-responsive" ><div class="media-body"><p class="media-heading">#: data.ContactName #</p>#: data.CompanyName # </div></div>',
        dataSource: {
            transport: {
                read: {
                    dataType: "jsonp",
                    url: "https://demos.telerik.com/kendo-ui/service/Customers",
                }
            }
        },
        height: 400,
        width: 300
    });

    var dropdownlist = $(D3SPCoreDOM.Settings.KendoProfileFilterBox).data("kendoDropDownList");

    $(D3SPCoreDOM.Settings.KendoGridBrowseAllMyClientId).kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
                model: {
                    fields: {
                        OrderID: {
                            type: "number"
                        },
                        Freight: {
                            type: "number"
                        },
                        ShipName: {
                            type: "string"
                        },
                        OrderDate: {
                            type: "date"
                        },
                        ShipCity: {
                            type: "string"
                        }
                    }
                }
            },
            pageSize: 20,
            serverPaging: true,
            serverFiltering: true,
        },
        height: 550,
        filterable: {
            mode: "row"
        },
        pageable: true,
        columns: [{
                field: "OrderID",
                width: 225,
                filterable: {
                    cell: {
                        showOperators: false
                    }
                }
            },
            {
                field: "ShipName",
                width: 500,
                title: "Ship Name",
                filterable: {
                    cell: {
                        operator: "contains"
                    }
                }
            }, {
                field: "Freight",
                width: 255,
                filterable: {
                    cell: {
                        operator: "gte"
                    }
                }
            }, {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
            }
        ]
    });

    $(D3SPCoreDOM.Settings.KendoGridTimeEntry).kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: "http://spjoe/sites/d3white/_api/lists/getbytitle('TimeEntryGridList')/items",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("accept", "application/json;odata=verbose")
                    }
                }
            },
            schema: {
                data: function(data) {
                    return data.d && data.d.results ? data.d.results : [data.d];
                }
            },
            pageSize: 20
        },
        height: 550,
        groupable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
                field: "Title",
                title: "Title",
                width: 200
            },
            {
                field: "DaysLastEntered",
                title: "Days Last Entered"
            },
            {
                field: "MTD",
                title: "MTD"
            },
            {
                field: "AllClientMTD",
                title: "All Client MTD",
                width: 150
            },
            {
                field: "MTD",
                title: "MTD"
            },
            {
                field: "Timekeeper",
                title: "Timekeeper"
            }
        ]
    });

    

    $(".d3-multiselect").kendoMultiSelect({
        autoClose: false
    }).data("kendoMultiSelect");
    //$(selector).chosen(config[selector]);
    //Run on the office only page
    D3SPCoreDOM.UI.CraftClocks($(D3SPCoreDOM.Settings.ClockContainer));
    D3SPCoreDOM.UI.SetCityWeather();
   
    D3SPCoreDOM.UI.SetGradientTables();
    D3SPCoreDOM.UI.SetCharts();
    D3SPCoreDOM.UI.GetCurrentSpotlight();
    D3SPCoreDOM.UI.GetSecurityUpdate();
    D3SPCoreDOM.UI.SetHeaderUI();

    
    //add class to body if viewing as admin
    if($( "#ms-designer-ribbon" ).length){
        $("body").addClass("isAdmin");
    }

//    //shrink header on-scroll
//    $(window).scroll(function() {
//      if ($(document).scrollTop() > 100) {
//        $('.d3-navbar').addClass('shrink');
//      } else {
//        $('.d3-navbar').removeClass('shrink');
//      }
//    });


    //close alert header
    $(".d3-alert .close-button").on("click", () => {
        $("body").removeClass("hasAlert");
    });

    //show current time
    var time = moment(new Date()).format("dddd, MMMM DD, YYYY");
    $("#currenttime").html(time);
    
    //search box expansion
    $(".d3-search-box-input").on("blur", () => {
            setTimeout(()=>{
                if(!$(".search-results").is(":visible")){
                    $(".search-box").removeClass("active");
                }
            },150);
        });
    $(".d3-search-box-input").on("focus", () => {
        $(".search-box").addClass("active");
    });
    
    //ellipses for events
     $(".calendar-list-text").dotdotdot();
    
    //feedback
    $(".feedback a").on("click", () => {
        event.preventDefault();
        $(".feedback-modal").modal();
    });
     
    /// DEMO code
    
    //show alert
    $("#alertTest").on("click", () => {
        $("body").addClass("hasAlert");
    });
    
});