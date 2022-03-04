import { GET, Path, POST } from "typescript-rest";

@Path("/players")
export class AuthenticationService {
    @GET
    signupPlayer(): string {
        return "Hello!";
    }
}