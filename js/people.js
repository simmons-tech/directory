var People = function() {
  // initialize things
};

People.prototype.numPeople = function() {
  return everyone.length;
};

// TODO: Get rid of getPerson and only use getter methods
People.prototype.getPerson = function(i) {
  return everyone[i];
};

People.prototype.getRoom = function(i) {
  return everyone[i][4];
};

People.prototype.getKerb = function(i) {
  return everyone[i][3];
};

People.prototype.getFName = function(i) {
  return everyone[i][1];
};

People.prototype.getLName = function(i) {
  return everyone[i][0];
};

People.prototype.contains = function(s1, s2) {
  console.log(s1);
  console.log(s2);
  return s1.toLowerCase().indexOf(s2.toLowerCase()) !== -1;
};

People.prototype.match = function(s) {
  var results = [];
  for (var i = 0; i < this.numPeople(); i++) {
    var cont = this.contains(this.getRoom(i), s) ||
      this.contains(this.getKerb(i), s) ||
      this.contains(this.getFName(i), s) ||
      this.contains(this.getLName(i), s);
    if (cont) {
      results.push({
        value: this.getKerb(i),
        label: this.getFName(i) + " " + this.getLName(i),
        desc: this.getKerb(i) + " (" + this.getRoom(i) + ")"
      });
    }
  }
  return results;
};