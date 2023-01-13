module.exports = function ResourceUnavailable() {
  this.status = 410;
  this.message = 'resource_unavailable';
};