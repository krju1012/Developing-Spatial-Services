
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
	
    var counter = 0;
	
	function onMapClick(e) {
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
	
// <!-- Fragebogen -->
// (function() {
  // const myQuestions = [
    // {
      // question: "Who is the strongest?",
      // answers: {
        // a: "Superman",
        // b: "The Terminator",
        // c: "Waluigi, obviously"
      // },
      // correctAnswer: "c"
    // },
    // {
      // question: "What is the best site ever created?",
      // answers: {
        // a: "SitePoint",
        // b: "Simple Steps Code",
        // c: "Trick question; they're both the best"
      // },
      // correctAnswer: "c"
    // },
    // {
      // question: "Where is Waldo really?",
      // answers: {
        // a: "Antarctica",
        // b: "Exploring the Pacific Ocean",
        // c: "Sitting in a tree",
        // d: "Minding his own business, so stop asking"
      // },
      // correctAnswer: "d"
    // }
  // ];