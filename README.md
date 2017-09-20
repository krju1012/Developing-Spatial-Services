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

### HTML-Head
The HTML code defines the style and the user interface of the webservice. Here, the "head"-section describes the title and associated links to libraries which are required for the Javascript part of the quiz. For this assignment the three libraries Leaflet, Turf and JQuery are needed.
```
<!DOCTYPE html>
<html>

  <head>

    <title>LatLon Quiz</title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw==" crossorigin="" />  
  <script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js" integrity="sha512-mNqn2Wg7tSToJhvHcqfzLMU6J4mkOImSPTxVZAdo+lcPlk+GhZmYgACEe0x35K7YzW1zJ7XyJV/TT1MrdXvMcA==" crossorigin=""></script>
  <script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
<!--   <script src="https://d3js.org/d3.v4.min.js"></script>  -->

  </head>
  ```
### HTML-Body

The HTML body contains all contents of the page including text, images or containers. For example, in this assignment a table is set with interactive text (highscore-table), therefore an "ID" has to be defined in order to be picked up inside the Javascript code. Other than that, changing image URLs can be declared as well (here with static size).
```
<body>
<div id='mapid'>
	<div id="myProgress">
		<div id="myBar">
		</div>
	</div>

<!-- Headertext -->
<!-- <font color="white"><h1>Welcome to the world of LatLon Quizzing!</h1></font> -->
<!-- Counter Table -->
	<div id="counter-table">
		<table class="tg">
			<tr>
				<th class="tg-yw4l">Name</th>
				<th class="tg-yw4l">Aktuelle Gesamtdistanz</th>
			</tr>
			<tr>
				<td class="tg-yw4l" id="person"></td>
				<td class="tg-yw4l" id="counter" >0</td>
			</tr>
		</table>

<!-- Highscore Table -->
	<div id="highscore-table">
		<table class="tg">
			<tr>
			<!-- <th class="tg-yw4l"> Rang</th> -->
				<th class="tg-yw4l"> Name</th>
				<th class="tg-yw4l"> Beste Gesamtdistanz</th>
			</tr>
			<tr>
			<!-- <td class="tg-yw4l" >1</td> -->
				<td class="tg-yw4l" id="scorename"></td>
				<td class="tg-yw4l" id="highscoreList"></td>
			</tr>
		<!-- <tr> -->
		<!-- <td class="tg-yw4l" >2</td> -->
		<!-- <td class="tg-yw4l" id="scorename2"></td> -->
		<!-- <td class="tg-yw4l" id="highscoreList2"></td> -->
		<!-- </tr> -->
		<!-- <tr> -->
		<!-- <td class="tg-yw4l" >3</td> -->
		<!-- <td class="tg-yw4l" id="scorename3"></td> -->
		<!-- <td class="tg-yw4l" id="highscoreList3"></td> -->
		<!-- </tr> -->
		</table>
		<div id="question">
			<span id="content">
				<p>Wo befindet sich das Heidelberger Schloss ?</p>
			</span>
		</div>
		
			<img id= "image" src ="http://www.8thingstodo.com/wp-content/uploads/2013/03/Schloss-Heidelberg-Famous-Castle-in-Germany.jpg" 
			height="262" width="350"
			/>		
		</div>
	</div>
</div>
```
### CSS code

The Cascading Styles Sheet defines how the HTML-elements mentioned above are placed on the page. In this assignment in particular, the first few lines of the CSS had to be inserted, because of an appearing behaviour of default margins on different browsers (in most cases 8px) even after declaring the html and body to margin and padding to zero. 
```
      <style>
		
		<!-- css reset -> resolves browser specific default margin problem -->
		body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td { 
			margin:0;
			padding:0;
		}
		html,body {
			margin:0;
			padding:0;
		}
        
        #mapid {
			position: absolute;
			top: 0;
			bottom: 0;
			width: 100%;
        }
        
        #myProgress {
			width: 100%;
			background-color: #ddd;
			z-index: 99999;
			position: absolute;
			bottom: 0;
        }
		
        #myBar {
			width: 1%;
			height: 30px;
			background-color: #4CAF50;
			z-index: 99999;
			text-align: center;
			line-height: 30px;
			color: white;
        }
		
        #counter-table {
			position: absolute;
			z-index: 9999;
			width: 350px;
        }
        
        #highscore-table {
			position: absolute;
			z-index: 9999;
			width: 350px;
        }
        
        #question {
			position: relative;
			width: 350px;
			height: 130px;
			line-height: 1.5;
			text-align: center;
			border: 4px dashed #26ADE4;
			top: 0px;
			background: white;
			font-size: 1vw;
			display: table-cell;
			vertical-align: middle;
        }
        
        #content {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-right: -50%;
			transform: translate(-50%, -50%);
			width: 18em;
			font-family:Arial, sans-serif;
			font-size:14px;
			padding:10px 5px;
        }
		
		#image {
			position: relative;
			max-width: 350px;
			max-height: 262px;
			top: 0px;
			z-index:9999999;
		 }
		
		.tg  {
			border-collapse:collapse;
			border-spacing:0;
			border-color:#999;
		}
		
		.tg td{
			font-family:Arial, sans-serif;
			font-size:14px;
			padding:10px 5px;
			color:#444;
			background-color:#F7FDFA;
			border-top-width:1px;
			border-bottom-width:1px;
			width: 350px;
		}
		
		.tg th{
			font-family:Arial, sans-serif;
			font-size:14px;
			font-weight:normal;
			padding:10px 5px;
			color:#fff;
			background-color:#26ADE4;
			border-top-width:1px;
			border-bottom-width:1px;
		}
		
		.tg .tg-yw4l{
			text-align:center;
			vertical-align:top
		}
      </style>

  </body>
  <script type="text/javascript" src="scripts.js"></script>
 
</html>
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

### Map animations

A visual method to create an optical reference for the user to get an overview where the actual asked point of interest is, in comparison to the recent clicked point on the map, is implemented via marker and line. The marker indicates where the asked coordinates are located, whereas the line shows the linear distance between the user-generated point and answer location.
Therefore, an empty list is initiated, which is first cleared and then filled by every click. This list contains the coordinates of the clicked coordinate as well as the resulting coordinate in order to get the start and endpoints for the Leaflet Polyline. To avoid multiple polylines at the same time from displaying on the map, an if-clause had to be inserted where any existing line is removed before a new one is drawn. The same principle is used for the marker as well, except the Leaflet marker is only described by the given answer coordinates provided inside the script.
```
 // Temporäre Liste der 2 Koordinaten für Anfangs- und Endpunkt Polylinie
	var pointList = [];

  // Füllen der Liste mit Klickkoordinate + Resultatskoordinate
	pointList.push(([lat, lng]), answercoordinates[questioncounter]);

  // Falls Polyline schon existiert wird diese bei Klick gelöscht und anschließend neu erstellt
	if (firstpolyline != undefined) {
		mymap.removeLayer(firstpolyline);
	};

  // Definition Polyline
	firstpolyline = new L.Polyline(pointList, {});


  // Falls Marker schon existiert wird dies bei Klick gelöscht und nur der neueste dargestellt
	if (marker != undefined) {
		mymap.removeLayer(marker);
	};

	marker = new L.marker(answercoordinates[questioncounter]);
	mymap.addLayer(marker);

  // Hinzufügen der Polyline zu Karte
	firstpolyline.addTo(mymap);
```

### Question images

On the left side, under the asked questions box, another visual aspect to increase user-friendly gui is shown. Hereby, a small image characterizing the answer is displayed. Prerequisity for this photo collection, which URL-links are placed inside the code as explained earlier, are standard aspect ratios. The code uses a function where the URLs are requested from a list based on the amount of clicks.
```
// question images function
	var image = document.getElementById("image");
	function picturechange (){
		if (questioncounter < myquestions.length){
			image.src= questionimages[questioncounter]; 
		}
		else {
			image.src= "https://static4.depositphotos.com/1000992/513/i/950/depositphotos_5130517-stock-photo-compass-rope-glasses-and-old.jpg"; 
		}
	}
	picturechange();
```

### Questions

Each question is displayed dependant how many clicks have been taken, if the end of the question list is reached (here  myquestions.length) the expression "Ende" is shown to mark the end of the quiz. 
```
	.click(function() {
		if (questioncounter < myquestions.length) {
		// Write Questions in Table 
		document
			.getElementById('content')
			.innerHTML = myquestions[questioncounter];
		} 
		else {
			document
			.getElementById('content')
			.innerHTML = "Ende"
		}
```

### Highscore with Localstorage

To create a bit of interaction for the quiz, a highscore-table is set up with the local leader (lowest distance overall). The data, here username and score is stored browserinternal via the localstorage method. This webstorage method has a higher storage memory (ca. 5mb) than cookies and its information is never transferred to the server. At first a highscore has been set to 99999 globally, likely to a key-value pair. After that, if all questions are asked and the current score is lower than the highscore (default 99999), the highscore value is overwritten with the just achieved score. 
```
var highscore = localStorage.getItem('highscore', 99999);

// Save Highscore and Name in Localstorage if lowest score is achieved
		if (questioncounter == myquestions.length) {
			if(counter !== null){
				if (counter < highscore) {
					localStorage.setItem("highscore", counter); 
					localStorage.setItem('bestscorer', person);
				}
			}
			else{
				localStorage.setItem("highscore", counter);
			}
		}
		 
  // Write Highscore to Table
document.getElementById("highscoreList").innerHTML =localStorage.getItem("highscore");
document.getElementById("scorename").innerHTML = localStorage.getItem("bestscorer");
	
```

## Built With

* [Leaflet](http://leafletjs.com/) - JavaScript library for interactive maps
* [Turf](http://turfjs.org/) - Advanced geospatial analysis for browsers (here: distance query)
* [JQuery](https://jquery.com/) - Event-handling HTML-Javascript documents
* [W3School Javascript Coding Convention](https://www.w3schools.com/js/js_conventions.asp) - Javascript Style Convention
* [W3School HTML5 Style Guide](https://www.w3schools.com/html/html5_syntax.asp) - HTML Style Guide


## Authors

* **Julian Krauth** - *Universität Heidelberg, Master Geographie* - 
