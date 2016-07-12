
function vypis(udaje){
	//$("#weather").html(Mustache.render($("#tmplPoc").html(),objectField));
	$("#weather").html(Mustache.render(tmplPoc,udaje));
	console.log(udaje);
}

$.getJSON( "http://api.openweathermap.org/data/2.5/weather",
           {q:"Bratislava",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
           vypis);


var tmplPoc = "Teplota: {{main.temp}}°C<br> Tlak: {{main.pressure}} Pa <br> Vlhkost: {{main.humidity}}%<br> Oblačnosť: {{clouds.all}}%";
//teplota zajtra
$.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily",
        {q:"Bratislava",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
        vypisZajtra);

var zajtra = "Teplota: {{list.0.temp.day}}°C<br> Tlak: {{list.0.pressure}} Pa <br> Vlhkost: {{list.0.humidity}}%<br> Oblačnosť: {{list.0.clouds}}% ";
function vypisZajtra(udaje){
	
	$("#weather_tommorow").html(Mustache.render(zajtra,udaje));
}

//teplota pozajtra

$.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily",
        {q:"Bratislava",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
        vypisPozajtra);

var pozajtra = "Teplota: {{list.1.temp.day}}°C<br> Tlak: {{list.1.pressure}} Pa <br> Vlhkost: {{list.1.humidity}}%<br> Oblačnosť: {{list.1.clouds}}%";
function vypisPozajtra(udaje){

	$("#weather_2").html(Mustache.render(pozajtra,udaje));
}

//teplota 3 dni
$.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily",
        {q:"Bratislava",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
        vypis3dni);

var tridni = "Teplota: {{list.2.temp.day}}°C<br> Tlak: {{list.2.pressure}} Pa <br> Vlhkost: {{list.2.humidity}}%<br> Oblačnosť: {{list.2.clouds}}% ";
function vypis3dni(udaje){
 console.log(udaje);
	$("#weather_3").html(Mustache.render(tridni,udaje));
}

//"Teplota: {{list.18.main.temp}}°C<br> Tlak: {{list.18.main.pressure}} Pa <br> Vlhkost: {{list.18.main.humidity}}%<br> Oblačnosť: {{list.18.clouds.all}}% ";
