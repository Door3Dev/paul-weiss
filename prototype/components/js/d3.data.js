var Clock = function (city, timeZone){
    this.city = city;
    this.timeZone = timeZone;
    this.toJson = function (){
        return ("{" +
            "\"city\":\"" + this.city + "\"," +
            "\"timeZome \":\"" + this.timeZone + "\"" +
        "}");
    };
};

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

Clock .fromJson = function (json){
    var obj = JSON.parse (json);
    return new Clock (obj.city, obj.timeZone);
};

//BASE 
var ClockData = [];

//ADD DATA
var a1 = new Clock ("WASHINGTON DC", "-5");
ClockData.push(a1);

var a2 = new Clock ("NEW YORK", "-5");
ClockData.push(a2);

var a3 = new Clock ("MOS", "+3");
ClockData.push(a3);

var a4 = new Clock ("DUB", "+3");
ClockData.push(a4);

var a5 = new Clock ("ABU", "+3");
ClockData.push(a5);

var a6 = new Clock ("CHI", "-6");
ClockData.push(a6);

var a7  = new Clock ("LONDON", "0");
ClockData.push(a7);

var a8 = new Clock ("LA", "-8");
ClockData.push(a8);

var a9 = new Clock ("TORONTO", "-5");
ClockData.push(a9);

var a10 = new Clock ("WILMINGTON", "-6");
ClockData.push(a10);

var a11 = new Clock ("BEIJING", "+8");
ClockData.push(a11);

var a12 = new Clock ("HONG KONG", "+8");
ClockData.push(a12);

var a13 = new Clock ("TOKYO", "+9");
ClockData.push(a13);


//EXAMPLE
//var json = dc.toJson();
//var clock = Clock.fromJson(json);
//var c = clock.city;
var practiceGroupPeopleData = [];
for (var i = 0; i < 100; i++) {
	practiceGroupPeopleData .push({
	    name: '<img src="/sites/bbk/SiteAssets/d3/images/sharepoint_user_icon.png" class="sp-user-profile" /> <a href="#">Alex Archer</a>',
	    title: 'Partner',
	    office: 'San Diego',
	    practice: 'Public Finance',
	    officeTel: '619) 463-2091',
	    officeTelExt: '12124',
	    mobile: '619) 462-2039',
	    barNo: '483920',
	    email: 'alex.archer@bbklaw.com',
	    secretary: '<a href="#">Abbie Blauser</a>',
	    secretaryExt: '12384'
	});
	practiceGroupPeopleData .push({
	    name: '<img src="/sites/bbk/SiteAssets/d3/images/sharepoint_user_icon.png" class="sp-user-profile" /> <a href="#">Christopher Bolton</a>',
	    title: 'Associate',
	    office: 'Los Angeles',
	    practice: 'Business',
	    officeTel: '728) 923-2342',
	    officeTelExt: '23423',
	    mobile: '619) 389-0923',
	    barNo: '2345424',
	    email: 'chris.bolton@bbklaw.com',
	    secretary: '<a href="#">Holly Webb</a>',
	    secretaryExt: '51852'
	});
	practiceGroupPeopleData .push({
	    name: '<img src="/sites/bbk/SiteAssets/d3/images/sharepoint_user_icon.png" class="sp-user-profile" /> <a href="#">Bill Fulford Christopher</a>',
	    title: 'Partner',
	    office: 'Riverside',
	    practice: 'Labor & Employment',
	    officeTel: '951) 389-0293',
	    officeTelExt: '23452',
	    mobile: '212) 928-2029',
	    barNo: '54353',
	    email: 'bill.fulfor@bbklaw.com',
	    secretary: '<a href="#">Linda Chu</a>',
	    secretaryExt: '24242'
	});
	practiceGroupPeopleData .push({
	    name: '<img src="/sites/bbk/SiteAssets/d3/images/sharepoint_user_icon.png" class="sp-user-profile" /> <a href="#">James Griffin</a>',
	    title: 'partner',
	    office: 'Sacramento',
	    practice: 'Municipal Law',
	    officeTel: '982) 923-0232',
	    officeTelExt: '2422',
	    mobile: '917) 928-0232',
	    barNo: '53532',
	    email: 'james.griffin@bbklaw.com',
	    secretary: '<a href="#">Dan Light</a>',
	    secretaryExt: '2342'
	});
}
var localPracticeGroupPeopleDataSource = new kendo.data.DataSource({
    data: practiceGroupPeopleData 
});
