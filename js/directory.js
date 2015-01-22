var people;

$(document).ready( function(){
  people = new People();
  // initially hide all rooms
  $('#Rooms').children().children().fadeOut(0);
var projects = [
      {
        value: "jquery",
        label: "jQuery",
        desc: "the write less, do more, JavaScript library",
        icon: "jquery_32x32.png"
      },
      {
        value: "jquery-ui",
        label: "jQuery UI",
        desc: "the official user interface library for jQuery",
        icon: "jqueryui_32x32.png"
      },
      {
        value: "sizzlejs",
        label: "Sizzle JS",
        desc: "a pure-JavaScript CSS selector engine",
        icon: "sizzlejs_32x32.png"
      }
    ];
 
    $( ".search-box" ).autocomplete({
      minLength: 0,
      source: function(request, response) {
        response(people.match(request.term));
      },
      focus: function( event, ui ) {
        $( ".search-box" ).val( ui.item.label );
        return false;
      },
      select: function( event, ui ) {
        return false;
      }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.label + "<br>" + item.desc + "</a>" )
        .appendTo( ul );
    };
});

function userHasTyped(input) {
  // show everything 
  if (input == "") {
    $('#Facilities, #Dining, #Firestairs, #Elevators, #Lounges').fadeIn(300);
    $('.btn-facilities, .btn-dining, .btn-firestairs, .btn-elevators, .btn-lounges').addClass('active');
  }
}

function submitIfEnter(key) {
  if (key.keyCode == 13) {
    $('.search-btn').click();
  }
}

var bestMatchValue = 0;
var matchPoints = [];

function getMatches(string) {
  // TODO: replace with autocomplete
  matchPoints = []
  for (var i = 0; i < people.numPeople(); i++) {
	matchPoints.push(0)
  }
  results = [];
  bestMatchValue = 0;
  var terms = string.split(" ");
  for (var i = 0; i < terms.length; i++) {
    if (terms[i] == "") continue;
    findByName(terms[i]);
    findByKerb(terms[i]);
    findByRoom(terms[i]);
  }
  if (bestMatchValue == 0) return results;
  leniency = 0; /* 0 only shows result which have the most matches.  1 or more shows sets which have "leniency" less matches than the result with the most matches */
  for (var i = 0; i < people.numPeople(); i++) {
    if (matchPoints[i] >= bestMatchValue - leniency) {
      // TODO: Get rid of getPerson and only use getter methods
	  results.push(people.getPerson(i));
    }
  }
  return results;
}

function search(input) {
  input = input || $('.search-box').val();
  var results = getMatches(input);
  $('.results').empty();
  $('#Rooms').children().children().fadeOut(300); // clear previous results
  $('#Facilities, #Dining, #Firestairs, #Laundry, #Kitchens, #Lounges').fadeOut(300);
  $('.btn-facilities, .btn-dining, .btn-firestairs, .btn-laundry, .btn-kitchens, .btn-lounges').removeClass('active');
  for (var i = 0; i < results.length; i++) {
    display(results[i]);
  }
}

function findByRoom(room) {
  for (var i = 0; i < people.numPeople(); i++) {
    if (people.getRoom(i) == room) {
      matchPoints[i] += 1;
      if (matchPoints[i] > bestMatchValue) bestMatchValue = matchPoints[i];
    }
  }
}

function findByKerb(kerb) {
  for (var i = 0; i < people.numPeople(); i++) {
    if (people.getKerb(i) == kerb) {
      matchPoints[i] += 1;
      if (matchPoints[i] > bestMatchValue) bestMatchValue = matchPoints[i];
    }
  }
}

function findByName(name) {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  for (var i = 0; i < people.numPeople(); i++) {
    // first name
    if (people.getFName(i).indexOf(name) != -1) {
      matchPoints[i] += 1;
      if (matchPoints[i] > bestMatchValue) bestMatchValue = matchPoints[i];
    }
    // last name
    if (people.getLName(i).indexOf(name) != -1) {
      matchPoints[i] += 1;
      if (matchPoints[i] > bestMatchValue) bestMatchValue = matchPoints[i];
    }
  }
}

function display(result) {
  var role = "";
  if (result[5] != "") {
    // TODO: replace with people.getYear(result).slice(-2)
    role = " '" + result[5].slice(-2);
  }
  else {
    // TODO: replace with Role field in people
    if (result[4] == "365" || result[4] == "772") {
      role = " (Housemaster)";
    }
    else if (result[4] == "580") {
      role = " (RLAD)";
    }
    // hack for apts currently for res. scholars
    else if (result[4] == "436" ||
             result[4] == "480" ||
             result[4] == "528" ||
             result[4] == "1080") {
      role = " (Residential Scholar)";
    }
    else {
      role = " (GRT)";
    }
  }
  $('.results').append(
    "<div class='result' onclick='search(\"" + result[3] + "\");'>Rm " + result[4] + " &mdash; <strong>" + result[1] + " " + result[0] + role + "</strong> (" + result[3] + "@mit.edu)" + "</div>" 
  );
  $('#r' + result[4]).fadeIn(300);

    // set onclicks for all rooms
  $('#r' + result[4]).attr("onclick", "search(\"" + result[4] + "\");");
  $('#r' + result[4]).attr("style", "cursor: pointer;");

  // set titles for tooltips
  $('#r' + result[4]).attr("title", "Room " + result[4] + ", " + result[1] + " " + result[0]);

}
