import { ApplicationError } from "../../error-handler/applicationError.js";
import User from "./user.schema.js";
// import User from
export default class UserRepository{
    async signUp(user){
        try {
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            // console.log(error);
            if(error.code === 11000){
                throw new ApplicationError("Email already exists", 400);
            }else if(error.name === 'ValidationError'){
                throw new ApplicationError(error.message, 400);
            }else{
                throw new ApplicationError("Something went wrong with database", 500);
            }
                
        }
    }

    async resetPassword(userID, newPassword){
        try {
            const user = await User.findById(userID);
            if(user){
                user.password = newPassword;
                await user.save();
            }else{
                throw new Error("User Not Found!");
            }
        } catch (error) {
            console.log(error);
            
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async findByEmail(email){
        try {
            return await User.findOne({email});
        } catch (error) {
            console.log(error)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}

//  UserRepository;