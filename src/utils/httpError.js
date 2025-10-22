export class HttpError extends Error {
    constructor(
        message = "Unexpected Error",
        status = 500,
        code = "INTENAL_ERROR",
        details = null
    ) {
        super(message)
        this.status = status
        this.code = code
        this.datails = details
        
    }
}