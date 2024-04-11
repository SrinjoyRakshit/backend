class ApiResponse{
    constructor(
        statusCode,
        data,
        message = "Sucess"
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}