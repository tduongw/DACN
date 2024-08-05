
class ApiError extends Error {
    constructor(statusCode, message) {

     
      super(message)

      //message bị cc chi đó mà đéo trả về được, rảnh xem luôn nghe cu Tuấn
      this.name = 'ApiError'
      this.statusCode = statusCode
  
      // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
      Error.captureStackTrace(this, this.constructor)

    }
  }
  
  export default ApiError