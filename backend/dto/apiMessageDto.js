class ApiMessageDto {
  constructor() {
    this.result = true;
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
