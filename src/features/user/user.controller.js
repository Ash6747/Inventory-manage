import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new UserModel(
        name,
        email,
        hashedPassword,
        type
      );
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (error) {
      next(error);//handled by global error handler
      // return res.status(500).send("Something went wrong");
    }
    
  }

  async signIn(req, res, next) {
    try{
      // 1. Find user by email.
    const user = await this.userRepository.findByEmail(req.body.email);
    if(!user){
      return res
        .status(400)
        .send('Incorrect Credentials');
    }else{
      // 2. Compare password with hashed password.
      const result = await bcrypt.compare(req.body.password, user.password);
      if(result){
        // 3. Create token.
        const token = jwt.sign(
          {
            userID: user._id,
            email: user.email,
          },
          'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
          {
            expiresIn: '1h',
          }
        );
        // 4. Send token.
        return res.status(200).send(token);
      }else{
        return res
        .status(400)
        .send('Incorrect Credentials');
      }
    }
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async resetPassword(req, res, next){
    const { newPassword } = req.body;
    const userID = req.userID;
    // console.log(userID);
    
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    try {
      await this.userRepository.resetPassword(userID, hashedPassword);
      return res.status(200).send("New password to user");
    } catch (error) {
      console.log(error);
      next(error);//handled by global error handler
      // return res.status(500).send("Something went wrong");
    }
  }
}
