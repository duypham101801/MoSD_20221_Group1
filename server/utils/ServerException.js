module.exports = function ServerException(error) {
    this.status = 500;
    this.message = 'unknown_error';
    console.log(error);
};