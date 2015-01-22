var people;

$(document).ready( function(){
  // create tooltips
  $('#Rooms').children().children().tipsy({gravity: 'e', opacity: 1.0});

  // initialize people directory
  people = new People();

  // initially hide all rooms
  $('#Rooms').children().children().fadeOut(0);

  // toggle modal
  $(".magnifying-glass").click(function() {
    $(".modal").show();
    $(".darkness").fadeIn(300);
    $(".search").animate({top: "33%"}, 150);
    $(".search-box").focus();
    $(".search-box").autocomplete("search");
  });
  $(".darkness").click(function() {
    $(".search-box").autocomplete("close");
    $(".darkness").fadeOut(300);
    $(".search").animate({top: "-60px"}, 150);
  });

  // initial animation
  $(".search-box").focus();
  $(".search").animate({top: "33%"}, 1000);
  $(".darkness").fadeIn(700);

  // autocomplete functions
  $( ".search-box" ).autocomplete({
    minLength: 0,
    source: function(request, response) {
      if (request.term == "") {
        response([]);
        return;
      }
      var matched = people.match(request.term);
      var results = [];
      for (var i = 0; i < matched.length; i++) {
        var m = matched[i];
        results.push({
          value: people.getKerb(m),
          label: people.getFName(m) + " " + people.getLName(m),
          desc: people.getKerb(m) + " (" + people.getRoom(m) + ")"
        });
      }
      response(results);
    },
    focus: function( event, ui ) {
      $( ".search-box" ).val( ui.item.label );
      return false;
    },
    select: function( event, ui ) {
      return false;
    },
    messages: {
      noResults: '',
      results: function() {}
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
  if (input === "") {
    $('#Facilities, #Dining, #Firestairs, #Elevators, #Lounges').fadeIn(300);
    $('.btn-facilities, .btn-dining, .btn-firestairs, .btn-elevators, .btn-lounges').addClass('active');
  }
};

function submitIfEnter(key) {
  if (key.keyCode == 13) {
    $('.search-btn').click();
  }
};

function search(input) {
  input = input || $('.search-box').val();
  var results = people.match(input);

  // clear previous results and search box
  $('.results').empty();
  $('#Rooms').children().children().fadeOut(300);
  $('#Facilities, #Dining, #Firestairs, #Laundry, #Kitchens, #Lounges').fadeOut(300);
  $('.btn-facilities, .btn-dining, .btn-firestairs, .btn-laundry, .btn-kitchens, .btn-lounges').removeClass('active');
  $(".modal").hide();

  for (var i = 0; i < results.length; i++) {
    display(results[i]);
  }
};

function display(result) {
  var role = "";
  if (people.getYear(result) != "") {
    role = " '" + people.getYear(result).slice(-2);
  }
  else {
    // TODO: replace with Role field in people
    var room = people.getRoom(result);
    if (room == "365" || room == "772") {
      role = " (Housemaster)";
    }
    else if (room == "580") {
      role = " (RLAD)";
    }
    // hack for apts currently for res. scholars
    else if (room == "436" ||
             room == "480" ||
             room == "528" ||
             room == "1080") {
      role = " (Residential Scholar)";
    }
    else {
      role = " (GRT)";
    }
  }
  var room = people.getRoom(result);
  var fname = people.getFName(result);
  var lname = people.getLName(result);
  var kerb = people.getKerb(result);
  $('.results').append(
    "<div class='result' onclick='search(\"" + kerb + "\");'>Rm " + room + " &mdash; <strong>" + fname + " " + lname + role + "</strong> (" + kerb + "@mit.edu)" + "</div>" 
  );
  $('#r' + room).fadeIn(300);

    // set onclicks for all rooms
  $('#r' + room).attr("onclick", "search(\"" + room + "\");");
  $('#r' + room).attr("style", "cursor: pointer;");

  // set titles for tooltips
  $('#r' + room).attr("title", "Room " + room + ", " + fname + " " + lname);

};
