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
        const response = new AuthenticationResponse();
        // Give the user the ability to access his information outside the JWT token so that we can save the JWT token as http-only (not accessible by client side scripting).
        response.userId = uuidv4();
        response.username = user;
        // We only need the user id on the server, so include it in the JWT token so that we don't have to keep separate state anywhere on the server.
        const token = jwt.sign(response.userId, secretKey, { expiresIn: '7 days' });
        response.token = token;
        return response;
    }
}