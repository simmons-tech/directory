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

function processArray(items, process) {
    var todo = items.concat();

    setTimeout(function() {
        process(todo.shift());
        if(todo.length > 0) {
            setTimeout(arguments.callee, 25);
        }
    }, 25);
}

function search() {
  var displayPeople = function(results) {
    results = results['usernames'];
    processArray(results, displayByKerb);
    //for(var i = 0; i < results.length; i++) {
    //  displayByKerb(results[i]);
    //}
  }

  $('.results').empty();
  $('#Rooms').children().children().fadeOut(300); // clear previous results
  $('#Facilities, #Dining, #Firestairs, #Laundry, #Kitchens, #Lounges').fadeOut(300);
  $('.btn-facilities, .btn-dining, .btn-firestairs, .btn-laundry, .btn-kitchens, .btn-lounges').removeClass('active');

  // Show people that match!
  people.query(input, displayPeople);
  // Also display any typed room numbers.
  // TODO: Complete queries 631 -> 631A - 631B
  var terms = input.split(" ");
  for(var i=0; i < terms.length; i++ ) {
    display(terms[i]);
  }
}

function displayByKerb(kerb) {
  rooming_assignment.get_room_by_person(kerb, function(result){display(result['room']);});
};

function display(roomnum) {
  $('#r' + roomnum).fadeIn(300);

    // set onclicks for all rooms
  $('#r' + roomnum).attr("onclick", "input = '" + roomnum + "'; search();");
  $('#r' + roomnum).attr("style", "cursor: pointer;");

  updateResultDiv(roomnum);

  // set titles for tooltips
  //$('#r' + roomnum).attr("title", "Room " + roomnum + ", " + result[1] + " " + result[0]);
}

function getRole( roomnum ) {
  var role;
  // TODO: Students!
  if (roomnum == "365" || roomnum == "772") {
    role = "Housemaster"
  }
  else if (roomnum == "580") {
    role = "RLAD"
  }
  // hack for apts currently for res. scholars
  else if (roomnum == "436" ||
           roomnum == "480" ||
           roomnum == "528" ||
           roomnum == "1080") {
    role = "Residential Scholar"
  }
  // GRTs
  else {
    role = "Student";
  }
  return role;
}

function updateResultDiv( roomnum ) {
  console.log("HERE");
  console.log(roomnum);
  result = ['TODO', 'TODO', 'TODO', 'TODO'];
  role = getRole(roomnum);
  var addPeople = function( results ) {
    results = results['usernames'];
    for(var i=0; i < results.length; i++ ) {
      people.get_person(results[i],console.log)
      console.log(results[i]);
      $('.results').append(
        "<div class='result' onclick='input=" + '"' + roomnum + '"' + "; search();'>Rm " + roomnum + " &mdash; <strong>" + result[1] + " " + result[0] + " (" + role + ")</strong> (" + result[3] + "@mit.edu)" + "</div>" 
      );
    }
  }
  rooming_assignment.get_people_by_room(roomnum, addPeople);

}
