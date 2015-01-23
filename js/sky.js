$(document).ready( function(){
  var t = new Date();
  var hours = t.getHours();
  var minutes = t.getMinutes();
  setSky(hours, minutes);
});

function simulateSky() {
  // Runs 15-second simulation of 24 hr day.
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
      setSky(hours, minutes);
      console.log("TIME: " + hours + ":" + minutes);
  }
};

function setSky(hours, minutes) {
  midday = (11 * 60 + 30); // 11:30AM
  mins_from_midday = (60 * hours + minutes) - midday;

  // reset
  $(".sky-golden, .sky-dusk, .sky-night").css("opacity", 0);

  // 45 mins up, 45 mins down, centered 5 hrs from midday
  golden = Math.abs(Math.abs(mins_from_midday) - 300);
  if (golden < 45 ) {
    val = (45 - golden)/45;
    $(".sky-golden").css("opacity", val);
  }

  // on/off 5 hrs from midday
  dusk = Math.abs(mins_from_midday) - 300;
  if (dusk > 0 ) {
    $(".sky-dusk").css("opacity", 1);
  }

  // 60 mins up, starting 5.5 hrs from midday
  night = Math.abs(mins_from_midday) - 330;
  if (night > 0 ) {
    val = night/60;
    $(".sky-night").css("opacity", val);
  }

};
