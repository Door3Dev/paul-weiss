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

