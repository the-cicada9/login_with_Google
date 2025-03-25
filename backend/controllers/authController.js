const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client();
const JWT_SECRET = process.env.JWT_SECRET;

exports.googleAuth = async (req, res) => {
    const { credential, client_id } = req.body;

    console.log(req.body);

    try {
        // Verify Google ID token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });

        console.log(ticket, ">>ticket");

        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture } = payload;

        console.log(payload, ">>payload");

        // Check if the user exists, else create new user
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
                name: `${given_name} ${family_name}`,
                authSource: 'google',
                picture,
            });
        } else {
            // Update the picture in case it has changed
            if (user.picture !== picture) {
                user.picture = picture;
                await user.save();
            }
        }
        console.log(user, ">>>user");


        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '6h',
        });

        // Set token as HTTP-only cookie
        res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure in production
                maxAge: 3600000, // 1 hour
            })
            .json({
                message: 'Authentication successfull', 
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    picture: user.picture,
                }
            });
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(400).json({ error: 'Authentication failed', details: err });
    }
};
