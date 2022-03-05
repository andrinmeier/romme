import { Errors, Path, POST } from "typescript-rest";
import jwt from 'jsonwebtoken';
import { AuthenticationRequest } from "./AuthenticationRequest";
import { AuthenticationResponse } from "./AuthenticationResponse";
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

@Path("/players")
export class AuthenticationService {
    @POST
    signupPlayer(request: AuthenticationRequest): AuthenticationResponse {
        let user = request.username;
        if (user.length > 20) {
            throw new Errors.BadRequestError("The username is too long. Maximal length is 20 characters (inclusive).");
        }
        // Try to prevent unicode shenanigans by only allowing a very small subset to be used.
        user = user.replace(/[^0-9a-zA-Z]/g, "");        
        if (user.length < 2) {
            throw new Errors.BadRequestError("The username is too short. Make sure to pick a name that is between 2 and 20 characters and only includes numbers, lower and uppercase letters.");
        }
        const secretKey = process.env.ROMME_JWT_SECRET_KEY;
        const userId = uuidParse(uuidv4());
        const token = jwt.sign({ userId: userId, username: user }, secretKey, { expiresIn: '7 days' });
        const response = new AuthenticationResponse();
        response.token = token;
        return response;
    }
}