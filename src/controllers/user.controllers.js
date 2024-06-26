import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadAtCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {

     // get user details from frontend
     // validation - not empty
     // check if user alrready exists: username, email
     // check for images, check for avatar
     // upload them to cloudinary, avatar
     // create user object - create entry in db
     // remove password and refresh token field from response
     // check for user creation
     // return response

    const {username, fullName, email, password} = req.body
    console.log();

    if (
        [fullName, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath= req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "upload avatar")
    }

    const avatar = await uploadAtCloudinary(avatarLocalPath)
    const coverImage = await uploadAtCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Upload avatar file")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const CreatedUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )

    if (!CreatedUser) {
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, CreatedUser, "User Registration complete")
    )
})

export {registerUser}