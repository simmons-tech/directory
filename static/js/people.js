var People = function() {
  // initialize things
  this.generateYears();
  this.generateSections();
  this.generateTypes();
  this.generateLounges();
};

People.prototype.generateYears = function() {
  this.years = [];
  var yearSet = {};
  for (var i = 0; i < this.numPeople(); i++) {
    yearSet[this.getYear(i)] = true;
  }
  for (var x in yearSet) {
    if (Object.prototype.hasOwnProperty.call(yearSet, x)) {
      this.years.push(x);
    }
  }
};

People.prototype.whichSection = function(room) {
  var sectionList = {'23AB': s23AB,
                     '34C': s34C,
                     '4AB': s4AB,
                     '5AB': s5AB,
                     '6AB': s6AB,
                     '56C': s56C,
                     '7ABC': s7ABC,
                     '8910A': s8910A,
                     '8910B': s8910B,
                     '8910C': s8910C};
  for (var i = 0; i < this.sections.length; i++) {
    var section = sectionList[this.sections[i]];
    for (var j = 0; j < section.length; j++) {
      if (section[j] === room) {
        return this.sections[i];
      }
    }
  }
  return '';
};

People.prototype.generateSections = function() {
  this.sections = ['23AB', '34C', '4AB', '5AB', '6AB', '56C', '7ABC', '8910A', '8910B', '8910C'];
  this.sectionMap = [];
  for (var i = 0; i < this.numPeople(); i++) {
    this.sectionMap.push(this.whichSection(this.getRoom(i)));
  }
};

People.prototype.generateTypes = function() {
  this.types = [];
  var typeSet = {};
  for (var i = 0; i < this.numPeople(); i++) {
    typeSet[this.getType(i)] = true;
  }
  for (var x in typeSet) {
    if (Object.prototype.hasOwnProperty.call(typeSet, x)) {
      this.types.push(x);
    }
  }
};

People.prototype.generateLounges = function() {
  this.lounges = [];
  var loungeSet = {};
  for (var i = 0; i < this.numPeople(); i++) {
    loungeSet[this.getLounge(i)] = true;
  }
  for (var x in loungeSet) {
    if (Object.prototype.hasOwnProperty.call(loungeSet, x)) {
      this.lounges.push(x);
    }
  }
};

People.prototype.getYearList = function() {
  return this.years;
};

People.prototype.getSectionList = function() {
  return this.sections;
};

People.prototype.getLoungeList = function() {
  return this.lounges;
};

People.prototype.getTypeList = function() {
  return this.types;
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
  return everyone[i][6];
};

People.prototype.getType = function(i) {
  return everyone[i][7];
};

People.prototype.getEmail = function(i) {
  return everyone[i][8];
};

People.prototype.getTitle = function(i) {
  return everyone[i][9];
};

People.prototype.getFullName = function(i) {
  return this.getFName(i) + " " + this.getLName(i);
};

People.prototype.getSection = function(i) {
  return this.sectionMap[i];
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
  } else if (item == 'section') {
    str = this.getSection(i);
  } else if (item == 'type') {
    str = this.getType(i);
  } else if (item == 'email') {
    str = this.getEmail(i);
  } else {
    console.log("People.match error: tried to match on " + item);
  }
  return str;
};
