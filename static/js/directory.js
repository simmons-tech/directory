var people;
var darknessOpen;

function render_everyone() {
  // create tooltips
  $('#Rooms').children().children().tipsy({gravity: 'e', opacity: 1.0});

  // initialize people directory
  people = new People();

  // initially hide all rooms
  $('#Rooms').children().children().fadeOut(0);

  // modal: search
  $('.magnifying-glass').click(function() {
    openDarkness();
    $('.search').animate(
      {top: getTopOf('search') },
      150,
      "swing",
      function() {
        $('.search-box').focus();
        $('.search-box').autocomplete('search');
      });
  });

  // modal: map preferences
  $('.gear').click( function() {
    openDarkness();
    $('.map-preferences').animate( {top: getTopOf('map-preferences') } );
  });

  // to close modals
  $('.darkness').click(closeDarkness);

  // initial animation
  $('.search-box').focus();
  $('.search').animate({top: getTopOf('search') }, 1000);
  $('.darkness').fadeIn(700);
  $('.search-btn').one('click', search);
  darknessOpen = true;

  // autocomplete functions
  $( '.search-box' ).autocomplete({
    minLength: 0,
    source: function(request, response) {
      if (request.term == '') {
        response([]);
        return;
      }
      var results = matchAutocomplete(request.term);
      response(results);
    },
    select: function( event, ui ) {
      $( '.search-box' ).val( ui.item.label );
      $('.search-btn').click();
      return true;
    },
    messages: {
      noResults: '',
      results: function() {}
    },
    change: function(event, ui) {
      if (ui.item) {
        console.log(ui.item.value);
      } else {
        console.log('nothing');
      }
    }
  })
  .autocomplete({appendTo: '.autocomplete-list'})
  .autocomplete( 'instance' )._renderItem = function( ul, item ) {
    return $( '<li>' )
      .append( '<a>' + item.label + '<br>' + item.desc + '</a>' )
      .appendTo( ul );
  };
};

function contains(s1, s2) {
  return s1.toLowerCase().indexOf(s2.toLowerCase()) === 0;
};

function matchSearch(s) {
  var results = match(s); // search for everything explicitly
  return results;
};

function matchAutocomplete(s) {
  var categoryResults = [];
  // search years, lounges, sections
  var yearList = people.getYearList();
  for (var i = 0; i < yearList.length; i++) {
    if (contains(yearList[i], s)) {
      categoryResults.push({
        value: yearList[i],
        label: yearList[i],
        desc: 'Year'
      });
    }
  }
  var loungeList = people.getLoungeList();
  for (var i = 0; i < loungeList.length; i++) {
    if (contains(loungeList[i], s)) {
      categoryResults.push({
        value: loungeList[i],
        label: loungeList[i],
        desc: 'Lounge'
      });
    }
  }
  var sectionList = people.getSectionList();
  for (var i = 0; i < sectionList.length; i++) {
    if (contains(sectionList[i], s)) {
      categoryResults.push({
        value: sectionList[i],
        label: sectionList[i],
        desc: 'Section'
      });
    }
  }
  var typeList = people.getTypeList();
  for (var i = 0; i < typeList.length; i++) {
    if (contains(typeList[i], s)) {
      categoryResults.push({
        value: typeList[i],
        label: typeList[i],
        desc: 'Type'
      });
    }
  }
  var matched = match(s, ['lname', 'fname', 'title', 'kerb', 'room', 'fullname', 'email']);
  var results = [];
  for (var i = 0; i < matched.length; i++) {
    var m = matched[i];
    results.push({
      value: people.getKerb(m),
      label: people.getFName(m) + ' ' + people.getLName(m),
      desc: people.getKerb(m) + ' (' + people.getRoom(m) + ')'
    });
  }
  return categoryResults.concat(results);
};

function match(s, things) {
  things = things || ['lname', 'fname', 'title', 'kerb', 'room', 'year', 'fullname', 'lounge', 'section', 'type', 'email'];
  var results = [];
  for (var i = 0; i < people.numPeople(); i++) {
    for (var j = 0; j < things.length; j++) {
      var str = people.get(i, things[j]);
      if (str !== "" && contains(str, s)) {
        results.push(i);
        break;
      }
    }
  }
  return results;
};

function onSearchBoxClick() {
  if (darknessOpen) {
    $('.search-box').autocomplete('search');
  }
};

function openDarkness() {
  $('.modal').show();
  $('.search-btn').one('click', search);
  $('.darkness').fadeIn(300);
  darknessOpen = true;
  $('.search-box').autocomplete('enable');
};


function closeDarkness() {
  $('.search-box').autocomplete('close');
  $('.darkness').fadeOut(300);
  $('.search').animate({top: '-60px'}, 150);
  $('.map-preferences').animate({top: '-300px'}, 150);
  darknessOpen = false;
  $('.search-box').autocomplete('disable');
};

function getTopOf(modal) {
  centerOfMap = $('.nav-region').height() + $('.map-region').height() / 2;
  if (modal == 'search') {
    searchHeight = $('.search-box').outerHeight();
    topPx = centerOfMap - (searchHeight/2);
  }
  else if (modal == 'map-preferences') {
    mapPreferencesHeight = $('.map-preferences').outerHeight();
    topPx = centerOfMap - (mapPreferencesHeight/2);
  }
  return topPx;
};

function userHasTyped(input) {
  // show everything
  if (input === '') {
    $('#Facilities, #Dining, #Firestairs, #Elevators, #Lounges').fadeIn(300);
    $('.btn-facilities, .btn-dining, .btn-firestairs, .btn-elevators, .btn-lounges').addClass('active');
  }
};

function handleKeyDown(key) {
  if (key.keyCode == 13) {
    $('.search-btn').click();
  } else if (key.keyCode == 27) {
    closeDarkness();
  }
};

function search(event, input) {
  if (!darknessOpen) {
    return;
  }
  input = input || $('.search-box').val();
  var results = matchSearch(input);

  // clear previous results and search box
  ClearDownload();
  $('.results-table tbody').empty();
  $(".results-explanation").html("No results.");
  $('#Rooms').children().children().attr('title', '');
  $('#Rooms').children().children().fadeOut(300);
  $('#Facilities, #Dining, #Firestairs, #Laundry, #Kitchens, #Lounges').fadeOut(300);
  $('.btn-facilities, .btn-dining, .btn-firestairs, .btn-laundry, .btn-kitchens, .btn-lounges').removeClass('active');
  closeDarkness();

  if (input != '') { // return none instead of all
    var numberOfResults = results.length;
    for (var i = 0; i < numberOfResults; i++) {
      display(results[i]);
    }
    $(".results-explanation").html(numberOfResults + " for \"" + input + "\"");
    PrepareDownload(input);
  }
};

function display(result) {
  var role = '';
  if (people.getYear(result) != '') {
    role = ' \'' + people.getYear(result).slice(-2);
  }
  else {
    // TODO: replace with Role field in people
    var room = people.getRoom(result);
    if (room == '365' || room == '772') {
      role = ' (Housemaster)';
    }
    else if (room == '580') {
      role = ' (RLAD)';
    }
    // hack for apts currently for res. scholars
    else if (room == '436' ||
             room == '480' ||
             room == '528' ||
             room == '1080') {
      role = ' (Residential Scholar)';
    }
    else {
      role = ' (GRT)';
    }
  }
  var room = people.getRoom(result);
  var fname = people.getFName(result);
  var lname = people.getLName(result);
  var kerb = people.getKerb(result);
  var title = people.getTitle(result);
  $('.results-table tbody').append(
    '<tr> <td>'+title+'</td> <td>'+fname+'</td> <td>'+lname+'</td> <td>'+kerb+'</td> <td>'+room+'</td> </tr> '
  );
  $('#r' + room).fadeIn(300);

    // set onclicks for all rooms
  $('#r' + room).attr('onclick', 'search(undefined, \"' + room + '\");');
  $('#r' + room).attr('style', 'cursor: pointer;');

  // set titles for tooltips
  var currAttr = $('#r' + room).attr('title');
  if (!currAttr) {
    $('#r' + room).attr('title', 'Room ' + room + ', ' + fname + ' ' + lname);
  } else {
    $('#r' + room).attr('title', currAttr + ', ' + fname + ' ' + lname);
  }
};

function PrepareDownload(searchTerm) {
    // container
    $('.results-download').show();

    var tbody = $('.results-table tbody');
    var csv = '';

    tbody.find('tr').each(function() {
      $(this).find('td').each(function() {
        csv += $(this).text() + ', ';
      });
      csv += '\n';
    });

    $('.download-link').attr('href', 'data:application/vnd.ms-excel,' + encodeURIComponent(csv));
    $('.download-link').attr('download', 'Simmons Directory results for ' + searchTerm + '.csv');
};

function ClearDownload() {
    $('.download-link').attr('href', '');
    $('.download-link').attr('download', '');
    $('.results-download').hide();
};