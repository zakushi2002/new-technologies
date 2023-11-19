class ApiMessageDto {
  constructor(result, message, code, data) {
    this.result = result;
    this.message = message;
    this.code = code;
    this.data = data;
  }

  setCode(code) {
    this.code = code;
  }

  setData(data) {
    this.data = data;
  }

  setMessage(message) {
    this.message = message;
  }

  setResult(result) {
    this.result = result;
  }
}

module.exports = ApiMessageDto;
