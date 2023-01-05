module.exports = function ValidationException(errors){
    this.status = 400;
    this.message = 'validation_failed';
    this.errors = errors;
  }