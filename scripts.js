
<!-- Map preferences: -->
 var mymap = L.map('mapid',{
   center: [48.7, 7],
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
  "Wo steht das Heidelberger Schloss?",
  "Wo ist die Queen beheimatet?",
];

 function onMapClick(e) {
   questioncounter +=1;
   lat = e.latlng.lat;
   lng = e.latlng.lng;
   var from = turf.point([lat, lng]);
   var to = turf.point([48, 8]);
   var distance = turf.distance(from, to);
   var shortdistance = parseInt(distance.toFixed(2));
   popup
     .setLatLng(e.latlng)
     .setContent(shortdistance + " km entfernt")
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
        .getElementById('question')
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