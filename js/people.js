var People = function() {
  // initialize things
};

People.prototype.numPeople = function() {
  return everyone.length;
};

People.prototype.getLName = function(i) {
  return everyone[i][0];
};

People.prototype.getFName = function(i) {
  return everyone[i][1];
};

People.prototype.getTitle = function(i) {
  return everyone[i][2];
};

People.prototype.getKerb = function(i) {
  return everyone[i][3];
};

People.prototype.getRoom = function(i) {
  return everyone[i][4];
};

People.prototype.getYear = function(i) {
  return everyone[i][5];
};

People.prototype.getFullName = function(i) {
  return this.getFName(i) + " " + this.getLName(i);
};

People.prototype.contains = function(s1, s2) {
  return s1.toLowerCase().indexOf(s2.toLowerCase()) !== -1;
};

People.prototype.match = function(s, things) {
  things = things || ['lname', 'fname', 'title', 'kerb', 'room', 'year', 'fullname'];
  var results = [];
  for (var i = 0; i < this.numPeople(); i++) {
    var fullName = this.getFName(i) + " " + this.getLName(i);
    for (var j = 0; j < things.length; j++) {
      var str = "";
      if (things[j] == 'lname') {
        str = this.getLName(i);
      } else if (things[j] == 'fname') {
        str = this.getFName(i);
      } else if (things[j] == 'title') {
        str = this.getTitle(i);
      } else if (things[j] == 'kerb') {
        str = this.getKerb(i);
      } else if (things[j] == 'room') {
        str = this.getRoom(i);
      } else if (things[j] == 'year') {
        str = this.getYear(i);
      } else if (things[j] == 'fullname') {
        str = this.getFullName(i);
      } else {
        console.log("People.match error: tried to match on " + things[j]);
      }
      if (str !== "" && this.contains(str, s)) {
        results.push(i);
        break;
      }
    }
  }
  return results;
};