import express from "express";
import { Server} from "typescript-rest";
import { AuthenticationService } from "./AuthenticationService";

let app: express.Application = express();
Server.buildServices(app, AuthenticationService);

app.listen(process.env.PORT, function () {
    console.log('Rest Server listening on port ' + process.env.PORT);
});