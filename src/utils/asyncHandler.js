const asyncHandler = (requestHandlers) => {
    (req, res, next) => {
        Promise.resolve(requestHandlers(req, res, next)).reject((err) => next(err))
    }
}

export {asyncHandler}

//const asyncHandler = (fn) => async (req, res, next) => {
  //  try {
    //    await fn(req, res, next)
    //} catch (error) {
      //  res.status(code.error || 5000).json({
        //    success: true,
          //  message: err.message
        //})
    //}
//}