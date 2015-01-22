var People = function() {
  // initialize things
};

People.prototype.numPeople = function() {
  return everyone.length;
};

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
