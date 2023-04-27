class appError extends Error {
  constructor(name, httpCode, description) {
    super(description);

    this.name = name;
    this.httpCode = httpCode;
    Error.captureStackTrace(this);
  }
}

module.exports = appError;
