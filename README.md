# Developing-Spatial-Services

This is the final assignment for the seminar "Developing Spatial Services", which teached about developing IT infrastructures for spatial purposes. As the participants are independent in form of the assignments type of web service, this project faces the creation of a HTML-based spatial quiz, which tests users capability of determining locations on a map to different asked points of interest. 


### Prerequisites

An active internet connection and the availability of a modern browser with localStorage support are necessary. 
Compatible are:

```
Google Chrome: 4
Firefox: 3.5
Internet Explorer: 8
Opera: 10.5
Safari: 4
```

### Installing


```
1. Download html + js files and extract them into the same folder
2. Open HTML file with compatible browser
```


## Running the Quiz

Before starting the Map Quiz, a simple name request is popping up. Fill in your name as it is required in case of a highscore.
Afterwards, the Quiz is asking for several points of interest which location shall be clicked on the basemap. The distance to real destination is calculated for each answer, therefore less distance = better result. If a new best score (lowest distance) is reached, the name of the popup prompt at the beginning is listed at the highscore-table on the left.
Trying the test again can be done via refreshing the browser (F5).

## HTML-Code explanation

Explain what these tests test and why

```
Give an example
```

## Javascript-Code explanation
### Map definition
Definition of Leaflet map with default coordinates and zoom level. The zoom-control is turned of because of distracting behaviour with the highscore-table. The tilelayer has to be provided with an URL-link and a complementary access_token, which grants access to the Leaflet library. On the other hand, the Leaflet map tile provider Mapbox can inspect the amount of requests. The current (15.09.2017) limitations for free access are: 50,000 map views / mo; 50,000 geocode requests / mo; 50,000 directions requests / mo. If more requests are needed a pricing model is required.
After defining the tilelayer, the specific maximum zoom-level (max. details) is customized as well as the map style, here satellite images. In the end, everything described above is added to the map with the "addTO"-expression.

```
<!-- Map preferences: -->
var mymap = L.map('mapid', {
	center: [48, 14],
	zoom: 4,
	zoomControl: false
})


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	id: 'mapbox.satellite'
}).addTo(mymap);
```
### Onload prompt

In order to get the name of the current user, a prompt is shown at the beginning of the quiz. In this prompt is a text-form, which insert is stored as a string in the variable "person". This variable has to be defined globally because a later request for displaying highscore-names is necessary. Per default, the name "Gerhard Mercator" is listed. After a correct completion of the text-form (not NULL), the user is greeted with an alert and the particular name is shown at the current score table.
To ensure that the prompt is only displayed after a full page load (html + map-tiles) the prompt-expression is packed into a "window.onload"-function.

```
var person= {};

window.onload = function(){	
	// add prompt to define active username after full page load
	person = prompt("Please enter your name", "Gerhard Mercator");
	if (person != null) {
		alert("Hello " + person + "! It's time to test your Geography skills...");
		document.getElementById("person").innerHTML = person;
	}
}
```

### Quiz questions declaration

The most important part of a quiz is its questions. Therefore, an array with questions as strings is defined as variable. Depending on the order of the array their specific result coordinates are defined in another variable ("answercoordinates") to which the distance is calculated later. For enlightening the user in case of unawareness of the correct answer a popup is shown with a short answertext, as well as the others defined as a variable ("answertext"). To create a visual impression of the scenery, a small image of the current answer is shown on the left. The URL-links to these images is stored as an array as well.
```
<!-- Quizquestions -->
var myquestions = [
	"",
	"An welchem Ort liegt das Domizil der Queen?",
	"Wo befindet sich die größte Bodenerhöhung Europas?",
	"Von wo begann Christopher Columbus seine Überfahrt zum amerikanischen Kontinent 1492?",
	"Wo befindet sich der längste Tunnel der Erde?",
	"Wo steht ein legendäres neolithisches Bauwerk aus großen Steinen, dessen Verwendungszweck unbekannt ist?",
	"In welcher Stadt liegt der Geburtsort von Galileo Galilei?"
];


// Koordinaten der Quizresultate
var answercoordinates = [
	[],
	[49.410502, 8.715364],
	[51.501317, -0.141557],
	[43.352253, 42.426246],
	[37.200312, -6.898533],
	[46.563048, 8.576577],
	[51.178808, -1.826236],
	[43.714182, 10.398632]
]

// Antworttext für Popup
var answertext = [
	"",
	"Das Heidelberger Schloss liegt ",
	"Der Buckingham Palace liegt ",
	"Der Mount Elbrus liegt ",
	"Palos de la Frontera liegt ",
	"Der Gotthard-Basistunnel befindet sich ",
	"Das Stonehenge-Denkmal befindet sich ",
	"Galileis Geburtsort Pisa befindet sich "
]

var questionimages = [
	"http://www.8thingstodo.com/wp-content/uploads/2013/03/Schloss-Heidelberg-Famous-Castle-in-Germany.jpg",
	"https://media-cdn.holidaycheck.com/w_1024,h_768,c_fit,q_80/ugc/images/6ff0d60c-25d9-3163-9ce0-30914651b751",
	"http://kavkazskitur.com/image/elbrus-north/new/images/40.jpg",
	"http://static.panoramio.com/photos/large/16154574.jpg",
	"http://static.panoramio.com/photos/large/1637193.jpg",
	"https://www.awesomestories.com/images/user/b1d86393fa.jpg",
	"https://wallpapercave.com/wp/0znYF3E.jpg"	
]
```
### Progressbar

At the bottom of the page, a progressbar is displayed which informs the users about the current number of asked questions and the total amount of questions. In order to move the bar by click, the "move"-function is initiated. Therefore, the width of the green bar (on top of the grey bar) is dependent on the questioncounter (current question number) and the length of the questions array (total amount of questions). 
```
// Progressbar
function move() {
	var elem = document.getElementById("myBar");   
	var width = 1;
	var id = setInterval(frame, 10);
	function frame() {
		if (width >= 100) {
			elem.innerHTML = 'Ende';
			clearInterval(id);
		} 
		else {
			width = 100*(questioncounter/myquestions.length); 
			elem.style.width = width + '%'; 
			elem.innerHTML = questioncounter + "/" + myquestions.length;
		}
	}
}
mymap.on('click', move);
```

### Distance calculation

The following function tries to evaluate the current position of the click-location on the basemap. Therefore, the Latitude and Longitude values have to be redefined with every click (e.latlng). These coordinates have to be summarized to a turf.point, which is necessary for upcoming distance calculations ("frompoint"). A distance calculation has to be made between two turf points, in that case, a point from the answer array has to be created depending which question is currently asked ("to"). Turf provides a distance method, it uses the Haversine formula to account for global curvature. Although the distance is now completely calculated, minor manipulations are required. The output type of the distance method is string, though the result is needed in integer for adding the particular current distance by click ("shortdistance").
Thus the current result is computed, a popup with the variable is added with a note. Additionally, the counter for current total distance on the left table is updated via "counter += shortdistance". 
```
// Klickfunktion
function onMapClick(e) {
	questioncounter += 1;
	lat = e.latlng.lat;
	lng = e.latlng.lng;
	var frompoint = turf.point([lat, lng]);
	var to = turf.point(answercoordinates[questioncounter]);
	var distance = turf.distance(frompoint, to);
	var shortdistance = parseInt(distance.toFixed(2));
	popup
		.setLatLng(e.latlng)
		.setContent(answertext[questioncounter] + shortdistance + " km entfernt")
		.openOn(mymap);
	var add = (function() {
		return function() {
			console.log(counter)
			return counter += shortdistance;
		}
	})();
```


## Built With

* [Leaflet](http://leafletjs.com/) - JavaScript library for interactive maps
* [Turf](http://turfjs.org/) - Advanced geospatial analysis for browsers (here: distance query)
* [JQuery](https://jquery.com/) - Event-handling HTML-Javascript documents


## Authors

* **Julian Krauth** - *Universität Heidelberg, Master Geographie* - 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
