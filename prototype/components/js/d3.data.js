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

Clock .fromJson = function (json){
    var obj = JSON.parse (json);
    return new Clock (obj.city, obj.timeZone);
};

//BASE 
var ClockData = [];

//ADD DATA
var dc = new Clock ("DC", "+5");
ClockData.push(dc);

var nyc = new Clock ("NYC", "-5");
ClockData.push(nyc);

var mos = new Clock ("MOS", "+2");
ClockData.push(mos);

var dub = new Clock ("DUB", "+12");
ClockData.push(dub);

var dub = new Clock ("ABU", "+12");
ClockData.push(dub);

var dub = new Clock ("CHI", "-6");
ClockData.push(dub);

var lon = new Clock ("LON", "0");
ClockData.push(lon);

var la = new Clock ("LA", "-8");
ClockData.push(la);
//EXAMPLE
var json = dc.toJson();
var clock = Clock.fromJson(json);
var c = clock.city;

