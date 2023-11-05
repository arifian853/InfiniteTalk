import User from '../models/userData.model.js';
import bcryptjs from 'bcryptjs';

const UserRegistration = async (req, res, next) => {
    try {
        const { email, password, fullName, program, mentor, admin, username } = req.body;

        // check whether the user exists or not
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                status: false,
                message: 'Email already used. Please use another email.'
            });
        }

        const usernameUser = await User.findOne({ username });
        if (usernameUser) {
            return res.status(404).json({
                status: false,
                message: 'Username already used. Please choose another username.'
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
            mentor,
            admin
        });

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            fullName: user.fullName,
            email: user.email,
            admin: user.admin,
            mentor: user.mentor,
            token: await user.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
};

const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email not found");
        }
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (isPasswordMatch) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
                mentor: user.mentor,
                token: await user.generateJWT(),
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
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
            });
        } else {
            let error = new Error("User not found");
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

export { UserRegistration, UserLogin, UserProfile };
