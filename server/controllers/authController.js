import User from '../models/Users.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';

const register = async (req, res) => {
    const {username, password} = req.body
    const company_id = new ObjectId('66a580c12ea4d04b28b20f24');

    if(!username || !password){
        throw new BadRequestError("Please provide all values.")    
    }
    
    const userAlreadyExists = await User.findOne({username})

    if(userAlreadyExists){
        throw new BadRequestError('User already in use.')
    }
    
    const user = await User.create({username, password, company_id});

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ 
        user,        
        token
    });  
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        throw new BadRequestError('Please provide all values.');
    }

    const user = await User.findOne({ username }).select('+password');

    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    const token = user.createJWT();
    
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token });
}

const verifyToken = async (req, res) => {
    
    const token = req.body.token

    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error('Token verification failed:', err.message);
          res.status(StatusCodes.UNAUTHORIZED).json(err.message)
        } else {
          // Token verification successful

          console.log('Token verified successfully');
          console.log('Decoded token payload:', decoded);
          res.status(StatusCodes.OK).json(decoded)

          // You can now use the decoded payload in your application
        }
      });
}

const updateUser = (req, res) => {
    res.send('Update user');
}

export { register, login, updateUser, verifyToken }