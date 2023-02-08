module.exports = function HttpException(stautus, message){
    this.status = stautus;
    this.message = message;
  }