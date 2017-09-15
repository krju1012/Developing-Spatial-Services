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

### HTML-Code explanation

Explain what these tests test and why

```
Give an example
```

### Javascript-Code explanation

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


## Built With

* [Leaflet](http://leafletjs.com/) - JavaScript library for interactive maps
* [Turf](http://turfjs.org/) - Advanced geospatial analysis for browsers (here: distance query)
* [JQuery](https://jquery.com/) - Event-handling HTML-Javascript documents


## Authors

* **Julian Krauth** - *Universität Heidelberg, Master Geographie* - 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
