import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
     return res.status(20).json({
        message: "Ok"
    })
})

export {registerUser}