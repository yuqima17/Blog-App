function initMap() {
  // The location of Uluru
  var uluru = {lat: 20.509463, lng: 166.205732};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 0.3, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}
                          