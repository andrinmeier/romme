import express from "express";
import { Server} from "typescript-rest";
import { AuthenticationService } from "./AuthenticationService";

let app: express.Application = express();
Server.buildServices(app, AuthenticationService);

const port = process.env.port || 8080;
app.listen(Number(port), '0.0.0.0', function () {
    console.log('Rest Server listening on port ' + port);
});