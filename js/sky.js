// Enlivens sky by layering several images
// to accurately reflect time of day.

// Transitions between night, dusk, golden, and clear sky.
// 1 hr each, such that golden is at midday +/- length/2.

// EXAMPLE:

// midday = 12:00PM, length = 12 HRS

// MORNING:
// 4:00am - 5:00am night  -> dusk
// 5:00am - 6:00am dusk   -> golden
// 6:00am - 7:00am golden -> clear

// EVENING:
// 5:00pm - 6:00pm clear  -> golden
// 6:00pm - 7:00pm golden -> dusk
// 7:00pm - 8:00pm dusk   -> night

$(document).ready( function(){
  var t = new Date();

  var hours = t.getHours();
  var minutes = t.getMinutes();

  // to compute length of day and mid-day time
  var month = t.getMonth();

  setSky(month, hours, minutes);
});

function simulateSky() {
  // Runs 15-second simulation of 24 hr day in March.
  var hours = 0; var minutes = 0;
  var interval = setInterval(function () {update()}, 10);
  function update() {
      minutes += 1;
      if (minutes == 60) {
        hours += 1; minutes = 0;
      }
      if (hours == 24) {
        window.clearInterval(interval); // break out
      }
      setSky(4, hours, minutes);
      console.log("TIME: " + hours + ":" + minutes);
  }
};

function setSky(month, hours, minutes) {

  // Determine approximate length of day and mid-day time
  // in minutes, based on month, for Boston MA.

  month += 1; // who the fuck zero-indexes the calendar -__-

  var length;
  var midday;

  // Jan, Dec = 09.5 hr days, midday 11:30
  if (month == 1 || month == 12) { length = 570; midday = 690; }
  // Feb, Nov = 10.5 hr days, midday 11:30
  if (month == 2 || month == 11) { length = 630; midday = 690; }
  // Mar, Oct = 12.0 hr days, midday 12:30
  if (month == 3 || month == 10) { length = 720; midday = 750; }
  // Apr, Sep = 13.5 hr days, midday 12:30
  if (month == 4 || month == 09) { length = 810; midday = 750; }
  // May, Aug = 14.5 hr days, midday 12:30
  if (month == 5 || month == 08) { length = 870; midday = 750; }
  // Jun, Jul = 15.0 hr days, midday 12:30
  if (month == 6 || month == 07) { length = 900; midday = 750; }

  mins_from_midday = (60 * hours + minutes) - midday;

  // Reset
  $(".sky-golden, .sky-dusk, .sky-night, .simmons-night").css("opacity", 0);

  // 1 hr up, 1 hr down, centered length/2 from midday
  golden = Math.abs(Math.abs(mins_from_midday) - length/2);
  if (golden < 60 ) {
    val = (60 - golden)/60;
    $(".sky-golden").css("opacity", val);
  }

  // on/off at length/2 from midday
  dusk = Math.abs(mins_from_midday) - length/2;
  if (dusk > 0 ) {
    $(".sky-dusk").css("opacity", 1);
  }

  // 1 hr up/down, 1 hr further from midday than dusk
  night = Math.abs(mins_from_midday) - (length/2 + 60);
  if (night > 0 ) {
    val = night/60;
    $(".sky-night, .simmons-night").css("opacity", val);
  }

};
