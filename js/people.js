var People = function() {
  // initialize things
  this.generateYears();
  this.generateSections();
  this.generateRoomTypes();
};

People.prototype.generateYears = function() {
  this.years = [];
  for (var i = 0; i < this.numPeople(); i++) {
    }
};

People.prototype.generateSections = function() {
  console.log('generateSections');
};

People.prototype.generateRoomTypes = function() {
  console.log('generateRoomTypes');
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

People.prototype.getLounge = function(i) {
  var sampleLounges = ['', '1Nyan', '2Nyan', '3Nyan', '4Nyan', '5Nyan'];
  return sampleLounges[i % sampleLounges.length];
};

People.prototype.getFullName = function(i) {
  return this.getFName(i) + " " + this.getLName(i);
};

People.prototype.get = function(i, item) {
  var str = '';
  if (item == 'lname') {
    str = this.getLName(i);
  } else if (item == 'fname') {
    str = this.getFName(i);
  } else if (item == 'title') {
    str = this.getTitle(i);
  } else if (item == 'kerb') {
    str = this.getKerb(i);
  } else if (item == 'room') {
    str = this.getRoom(i);
  } else if (item == 'year') {
    str = this.getYear(i);
  } else if (item == 'fullname') {
    str = this.getFullName(i);
  } else if (item == 'lounge') {
    str = this.getLounge(i);
  } else {
    console.log("People.match error: tried to match on " + item);
  }
  return str;
};
