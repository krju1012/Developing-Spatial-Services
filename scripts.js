<!-- Map preferences: -->
var mymap = L.map('mapid', {
  center: [48.7, 14],
  zoom: 5,
  zoomControl: false
})


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  id: 'mapbox.satellite'
}).addTo(mymap);

// add prompt to define active username

var person = prompt("Please enter your name", "Gerhard Mercator");
if (person != null) {
	alert("Hello " + person + "! It's time to test your Geography skills...");
	document.getElementById("person").innerHTML = person;
	var personstring = person;
}

<!-- LatLong-Popup -->
var popup = L.popup();
var lat, lng;

<!-- Clickcounter for pointdistance -->
var counter = 0;

<!-- Clickcounter for questioncount-->
var questioncounter = 0;

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

// Definieren einer leeren Polyline außerhalb der Klickfunktion
var firstpolyline = {};
var marker = {};

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



  function myFunction() {
    document.getElementById("counter").innerHTML = add();
  }

  myFunction();


  

}

mymap.on('click', onMapClick);

var highscore = localStorage.getItem('highscore', 99999);
var highscorename = localStorage.getItem('bestscorer');


$('#mapid')
  .click(function() {
    // Write Gesamtdistanz in Table 
    document
      .getElementById('content')
      .innerHTML = myquestions[questioncounter];
	
	// Write Highscore to Table
	document.getElementById("highscoreList").innerHTML = highscore;
	
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
	
  });
document.getElementById("scorename").innerHTML = highscorename;
