import User from '../models/userData.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import * as OTPAuth from 'otpauth';
import pkg from 'hi-base32';
import { uploadPicture } from '../middleware/uploadPictureMiddleware.js';
import { fileRemover } from '../utils/fileRemover.js';
const { encode } = pkg;

const generateRandomBase32 = () => {
    const buffer = crypto.randomBytes(15);
    const base32 = encode(buffer).replace(/=/g, '').substring(0, 24);
    return base32;
};

const UserRegistrationMentor = async (req, res, next) => {
    try {
        const { email, password, fullName, program, mentor, admin, username, lastLogin } = req.body;

        // check whether the user exists or not
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                status: false,
                message: 'Email already used. Please use another email.',
            });
        }

        const usernameUser = await User.findOne({ username });
        if (usernameUser) {
            return res.status(404).json({
                status: false,
                message: 'Username already used. Please choose another username.',
            });
        }

        const hashPassword = await bcryptjs.hash(password, 15);

        // creating a new user
        user = await User.create({
            username,
            fullName,
            email,
            password: hashPassword, // Hashed password
            program,
            mentor: true,
            admin: true,
            lastLogin: new Date()
        });

        // TOTP related code
        const base32Secret = generateRandomBase32();
        let totp = new OTPAuth.TOTP({
            issuer: 'InfiniteTalk!',
            label: user.email,
            algorithm: 'SHA1',
            digits: 6,
            secret: base32Secret,
        });

        const otpAuthURL = totp.toString();

        user.otp_auth_url = otpAuthURL;
        user.otp_base32 = base32Secret;

        // Save the user with TOTP-related information
        await user.save();

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            fullName: user.fullName,
            email: user.email,
            admin: true,
            mentor: true,
            otp_enabled: user.otp_enabled,
            otp_verified: user.otp_verified,
            lastLogin: new Date(),
            program: user.program,
            token: await user.generateJWT(),
            otp_auth_url: otpAuthURL,
            otp_base32: base32Secret,
            createdAt: user.createdAt,
            message: `User created , Welcome ${username}`, // Include this in the response
        });
    } catch (error) {
        next(error);
    }
};

const UserRegistrationMentee = async (req, res, next) => {
    try {
        const { email, password, fullName, program, mentor, admin, username, lastLogin } = req.body;

        // check whether the user exists or not
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                status: false,
                message: 'Email already used. Please use another email.',
            });
        }

        const usernameUser = await User.findOne({ username });
        if (usernameUser) {
            return res.status(404).json({
                status: false,
                message: 'Username already used. Please choose another username.',
            });
        }

        const hashPassword = await bcryptjs.hash(password, 15);

        // creating a new user
        user = await User.create({
            username,
            fullName,
            email,
            password: hashPassword, // Hashed password
            program,
            mentor: false,
            admin: false,
            lastLogin: new Date()
        });

        // TOTP related code
        const base32Secret = generateRandomBase32();
        let totp = new OTPAuth.TOTP({
            issuer: 'InfiniteTalk!',
            label: user.email,
            algorithm: 'SHA1',
            digits: 6,
            secret: base32Secret,
        });

        const otpAuthURL = totp.toString();

        user.otp_auth_url = otpAuthURL;
        user.otp_base32 = base32Secret;

        // Save the user with TOTP-related information
        await user.save();

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            fullName: user.fullName,
            email: user.email,
            admin: false,
            mentor: false,
            otp_enabled: user.otp_enabled,
            otp_verified: user.otp_verified,
            lastLogin: new Date(),
            program: user.program,
            token: await user.generateJWT(),
            otp_auth_url: otpAuthURL,
            otp_base32: base32Secret,
            createdAt: user.createdAt,
            message: `User created , Welcome ${username}`, // Include this in the response
        });
    } catch (error) {
        next(error);
    }
};


const UserLoginMentor = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email not found");
        }

        if (!user.mentor) {
            throw new Error("You're not a mentor!");
        }

        user.lastLogin = new Date();
        await user.save();
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (isPasswordMatch) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                admin: user.admin,
                mentor: user.mentor,
                program: user.program,
                otp_enabled: user.otp_enabled,
                otp_verified: user.otp_verified,
                lastLogin: user.lastLogin,
                token: await user.generateJWT(),
                otp_auth_url: user.otp_auth_url,
                otp_base32: user.otp_base32,// Include TOTP URL in the response
                createdAt: user.createdAt,
                message: `Login success , Welcome ${email}`,
            });
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        next(error);
    }
};

const UserLoginMentee = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email not found");
        }

        if (user.mentor) {
            throw new Error("You're not a mentee!");
        }

        user.lastLogin = new Date();
        await user.save();
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (isPasswordMatch) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                admin: user.admin,
                mentor: user.mentor,
                program: user.program,
                otp_enabled: user.otp_enabled,
                otp_verified: user.otp_verified,
                lastLogin: user.lastLogin,
                token: await user.generateJWT(),
                otp_auth_url: user.otp_auth_url,
                otp_base32: user.otp_base32,// Include TOTP URL in the response
                createdAt: user.createdAt,
                message: `Login success , Welcome ${email}`,
            });
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        next(error);
    }
};

const UserProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if (user) {
            return res.status(201).json({
                otp_valid: true,
                _id: user._id,
                avatar: user.avatar,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                admin: user.admin,
                mentor: user.mentor,
                program: user.program,
                otp_enabled: user.otp_enabled,
                otp_verified: user.otp_verified,
                otp_auth_url: user.otp_auth_url,
                otp_base32: user.otp_base32,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin // Include TOTP URL in the response
            });
        } else {
            let error = new Error("User not found");
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

const UpdateUserProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if (!user) {
            throw new Error("User not found");
        }

        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;

        if (req.body.password && req.body.password.length < 8) {
            throw new Error("Password length must be at least 8 characters");
        } else if (req.body.password) {
            const hashedPassword = await bcryptjs.hash(req.body.password, 10); // Hash the updated password
            user.password = hashedPassword; // Set the hashed password
        } else {
            user.password = user.password;
        }

        const newUserProfile = await user.save();

        res.json({
            otp_valid: true,
            _id: newUserProfile._id,
            avatar: newUserProfile.avatar,
            fullName: newUserProfile.fullName,
            username: newUserProfile.username,
            email: newUserProfile.email,
            admin: newUserProfile.admin,
            mentor: newUserProfile.mentor,
            program: newUserProfile.program,
            token: await newUserProfile.generateJWT(),
            otp_enabled: newUserProfile.otp_enabled,
            otp_verified: newUserProfile.otp_verified,
            otp_auth_url: newUserProfile.otp_auth_url, // Include TOTP URL in the response
            otp_base32: newUserProfile.otp_base32,
            lastLogin: newUserProfile.lastLogin,
            createdAt: newUserProfile.createdAt,
        });
    } catch (error) {
        next(error);
    }
};

const UpdateProfilePicture = async (req, res, next) => {
    try {
        const upload = uploadPicture.single("profilePicture");

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error(
                    "An unknown error occured when uploading " + err.message
                );
                next(error);
            } else {
                if (req.file) {
                    let filename;
                    let newUserProfile = await User.findById(req.user._id);
                    filename = newUserProfile.avatar;
                    if (filename) {
                        fileRemover(filename);
                    }
                    newUserProfile.avatar = req.file.filename;
                    await newUserProfile.save();
                    res.json({
                        otp_valid: true,
                        _id: newUserProfile._id,
                        avatar: newUserProfile.avatar,
                        fullName: newUserProfile.fullName,
                        username: newUserProfile.username,
                        email: newUserProfile.email,
                        admin: newUserProfile.admin,
                        mentor: newUserProfile.mentor,
                        program: newUserProfile.program,
                        token: await newUserProfile.generateJWT(),
                        otp_enabled: newUserProfile.otp_enabled,
                        otp_verified: newUserProfile.otp_verified,
                        otp_auth_url: newUserProfile.otp_auth_url, // Include TOTP URL in the response
                        otp_base32: newUserProfile.otp_base32,
                        lastLogin: newUserProfile.lastLogin,
                        createdAt: newUserProfile.createdAt,

                    });
                } else {
                    let filename;
                    let newUserProfile = await User.findById(req.user._id);
                    filename = newUserProfile.avatar;
                    newUserProfile.avatar = "";
                    await newUserProfile.save();
                    fileRemover(filename);
                    res.json({
                        otp_valid: true,
                        _id: newUserProfile._id,
                        avatar: newUserProfile.avatar,
                        fullName: newUserProfile.fullName,
                        username: newUserProfile.username,
                        email: newUserProfile.email,
                        admin: newUserProfile.admin,
                        mentor: newUserProfile.mentor,
                        program: newUserProfile.program,
                        token: await newUserProfile.generateJWT(),
                        otp_enabled: newUserProfile.otp_enabled,
                        otp_verified: newUserProfile.otp_verified,
                        otp_auth_url: newUserProfile.otp_auth_url, // Include TOTP URL in the response
                        otp_base32: newUserProfile.otp_base32,
                        lastLogin: newUserProfile.lastLogin,
                        createdAt: newUserProfile.createdAt,
                    });
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

const GenerateOTP = async (req, res, next) => {
    try {
        const { username } = req.body;
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        const base32Secret = generateRandomBase32();
        let totp = new OTPAuth.TOTP({
            issuer: 'InfiniteTalk!',
            label: user.email,
            algorithm: 'SHA1',
            digits: 6,
            secret: base32Secret,
        });

        const otpAuthURL = totp.toString();

        user.otp_auth_url = otpAuthURL;
        user.otp_base32 = base32Secret;

        // Save the updated TOTP-related information
        await user.save();

        res.status(200).json({
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            fullName: user.fullName,
            email: user.email,
            admin: user.admin,
            mentor: user.mentor,
            otp_enabled: user.otp_enabled,
            otp_verified: user.otp_verified,
            lastLogin: user.lastLogin,
            program: user.program,
            token: await user.generateJWT(),
            otp_base32: base32Secret,
            otp_auth_url: otpAuthURL,
            createdAt: user.createdAt,
        });
    } catch (error) {
        next(error);
    }
};

const VerifyOTP = async (req, res, next) => {
    try {
        const { token, username } = req.body;
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'OTP Code is Invalid',
            });
        }

        let totp = new OTPAuth.TOTP({
            issuer: 'InfiniteTalk!',
            label: user.email,
            algorithm: 'SHA1',
            digits: 6,
            secret: user.otp_base32,
        });

        const delta = totp.validate({ token });

        if (delta === null) {
            return res.status(401).json({
                status: 'fail',
                message: 'Token is invalid or user does not exist',
            });
        }

        // Update user data (if needed)
        user.otp_enabled = true;
        user.otp_verified = true;

        await user.save();

        res.status(200).json({
            otp_valid: true,
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            fullName: user.fullName,
            email: user.email,
            admin: user.admin,
            mentor: user.mentor,
            otp_enabled: user.otp_enabled,
            otp_verified: user.otp_verified,
            lastLogin: user.lastLogin,
            program: user.program,
            token: await user.generateJWT(),
            createdAt: user.createdAt,
        });
    } catch (error) {
        next(error);
    }
};

const ValidateOTP = async (req, res, next) => {
    try {
        const { token, username } = req.body;
        const user = await User.findOne({ username });

        const message = "OTP Code Invalid";
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message,
            });
        }

        let totp = new OTPAuth.TOTP({
            issuer: "InfiniteTalk!",
            label: user.email,
            algorithm: "SHA1",
            digits: 6,
            secret: user.otp_base32,
        });

        let delta = totp.validate({ token, window: 1 });

        if (delta === null) {
            return res.status(401).json({
                status: "fail",
                message,
            });
        }

        res.status(200).json({
            otp_valid: true,
            message: "Authorized!",
            _id: user._id,
            avatar: user.avatar,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            admin: user.admin,
            mentor: user.mentor,
            program: user.program,
            otp_enabled: user.otp_enabled,
            otp_verified: user.otp_verified,
            lastLogin: user.lastLogin,
            token: await user.generateJWT(),
            otp_auth_url: user.otp_auth_url,
            otp_base32: user.otp_base32,// Include TOTP URL in the response
            createdAt: user.createdAt,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const DisableOTP = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User does not exist',
            });
        }

        user.otp_enabled = false;
        user.otp_verified = false;

        await user.save();

        res.status(200).json({
            otp_valid: false,
            _id: user._id,
            avatar: user.avatar,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            admin: user.admin,
            mentor: user.mentor,
            program: user.program,
            otp_enabled: user.otp_enabled,
            otp_verified: user.otp_verified,
            lastLogin: user.lastLogin,
            token: await user.generateJWT(),
            otp_auth_url: user.otp_auth_url,
            otp_base32: user.otp_base32,// Include TOTP URL in the response
            createdAt: user.createdAt,
            message: "OTP Disabled",
        },
        );
    } catch (error) {
        next(error);
    }
};


export {
    UserRegistrationMentor,
    UserRegistrationMentee,
    UserLoginMentor,
    UserLoginMentee,
    UserProfile,
    UpdateUserProfile,
    UpdateProfilePicture,
    GenerateOTP,
    ValidateOTP,
    VerifyOTP,
    DisableOTP,
};
