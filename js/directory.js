$(document).ready( function(){
  // initially hide all rooms
  $('#Rooms').children().children().fadeOut(0);
});

var input = ""
function userHasTyped(something) {
  input = something

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

function getMatches(string) {
  results = []
  var terms = string.split(" ");
  for (var i = 0; i < terms.length; i++) {
    findByName(terms[i]);
    findByKerb(terms[i]);
    findByRoom(terms[i]);
  }
  var uniqueResults = [];
  $.each(results, function(i, el) {
      if($.inArray(el, uniqueResults) === -1) uniqueResults.push(el);
  });
  return uniqueResults;
}

function search() {
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
  for (var i = 0; i < everyone.length; i++) {
    if (everyone[i][4] == room) {
      results.push(everyone[i]);
    }
  }
}

function findByKerb(kerb) {
  for (var i = 0; i < everyone.length; i++) {
    if (everyone[i][3] == kerb) {
      results.push(everyone[i]);
    }
  }
}

function findByName(name) {
  name = name.charAt(0).toUpperCase() + name.slice(1)
  for (var i = 0; i < everyone.length; i++) {
    // first name
    if (everyone[i][1].indexOf(name) != -1) {
      results.push(everyone[i]);
    }
    // last name
    if (everyone[i][0].indexOf(name) != -1) {
      results.push(everyone[i]);
    }
  }
}

function display(result) {
  var role = ""
  if (result[5] != "") {
    role = " '" + result[5].slice(-2)
  }
  else {
    if (result[4] == "365" || result[4] == "772") {
      role = " (Housemaster)"
    }
    else if (result[4] == "580") {
      role = " (RLAD)"
    }
    // hack for apts currently for res. scholars
    else if (result[4] == "436" ||
             result[4] == "480" ||
             result[4] == "528" ||
             result[4] == "1080") {
      role = " (Residential Scholar)"
    }
    else {
      role = " (GRT)"
    }
  }
  $('.results').append(
    "<div class='result' onclick='input=" + '"' + result[3] + '"' + "; search();'>Rm " + result[4] + " &mdash; <strong>" + result[1] + " " + result[0] + role + "</strong> (" + result[3] + "@mit.edu)" + "</div>" 
  );
  $('#r' + result[4]).fadeIn(300);

    // set onclicks for all rooms
  $('#r' + result[4]).attr("onclick", "input = '" + result[4] + "'; search();");
  $('#r' + result[4]).attr("style", "cursor: pointer;");

  // set titles for tooltips
  $('#r' + result[4]).attr("title", "Room " + result[4] + ", " + result[1] + " " + result[0]);

}