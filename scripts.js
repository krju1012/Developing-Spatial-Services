
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
  currentSlide = n;
  
  function onMapClick(e) {  //eher innerhalb function darunter ab onlinequiz
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
    }) ();
    
    function myFunction(){
      document.getElementById("counter").innerHTML = add();
    }
    
    myFunction();

    //anzeige der nächsten Frage
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  }

  mymap.on('click', onMapClick);
  mymap.on('click', showNextSlide);


//onlinequiz

(function() {
  const myQuestions = [
    {
      question: "Where is the Heidelberger Schloss located?",
      correctAnswer: "49.411,8.715"
    },
    {
      question: "Where does the Queen live?",
      correctAnswer: "51.501,-0.142"
    }
  ];

  function buildQuiz(){
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // we'll want to store the list of answer choices
        const answers = [];

        for (i in currentQuestion.answers){
          answers.push(currentQuestion.answers[i])
        }
      }
    output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output;  //????quizContainer.innerHTML = output();
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
  }
  
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;  //muss außerhalb der Klickfunction sein da sonst immer wieder neu angefangen wird




  buildQuiz();
  
const quizContainer = document.getElementById('quiz');