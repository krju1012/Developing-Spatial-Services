
<!-- Map preferences: -->
 var mymap = L.map('mapid',{
   center: [48.7, 14],
   zoom: 5,
   zoomControl:false })


 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
   maxZoom: 18,
   id: 'mapbox.satellite'
 }).addTo(mymap);

 
<!-- LatLong-Popup -->
 var popup = L.popup();
 var lat, lng;
 
 <!-- Clickcounter for pointdistance -->
 var counter = 0;

  <!-- Clickcounter for questioncount, works in firebug-->
 var questioncounter = 0;
 
<!-- Quizquestions, erster Eintrag leer da bei 0 clicks noch kein print?!?! -->
var myquestions = [

  "",
  "An welchem Ort liegt das Domizil der Queen?",
  "Wo befindet sich die größte Bodenerhöhung Europas?",
  "Von wo begann Christopher Columbus seine Überfahrt zum amerikanischen Kontinent 1492?",
  "Wo befindet sich der längste Tunnel der Erde?",
  "Wo steht ein legendäres neolithisches Bauwerk aus großen Steinen, dessen Verwendungszweck unbekannt ist?",
  "In welcher Stadt liegt der Geburtsort von Galileo Galilei?"
];

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






 function onMapClick(e) {
   questioncounter +=1;
   lat = e.latlng.lat;
   lng = e.latlng.lng;
   var from = turf.point([lat, lng]);
   var to = turf.point(answercoordinates[questioncounter]);
   var distance = turf.distance(from, to);
   var shortdistance = parseInt(distance.toFixed(2));
   popup
     .setLatLng(e.latlng)
     .setContent(answertext[questioncounter] + shortdistance + " km entfernt")
     .openOn(mymap);
   var add = (function () {
     
     return function () {
         console.log(counter)
       return counter += shortdistance;
     
     }
})();
   




   function myFunction(){
     document.getElementById("counter").innerHTML = add();
   }
   
   myFunction();
 }

 mymap.on('click', onMapClick);



 $('#mapid')
  .click(function() {
    document
        .getElementById('content')
        .innerHTML = myquestions[questioncounter];  
    });
 
 // var q1 = "Wo steht der Eiffelturm?";
 // var q2 = "An welchem Ort findet das Oktoberfest statt?";
 // var questioncounter = 0;

 // function questionclicks() {
 //    questioncounter +=1;
 //    if questioncounter = 0 
 //      document.getElementById('q1'),
 //    else if questioncounter = 1
 //      document.getElementById('q2');
 // }

 // mymap.on('click', questionclicks );