import http from 'http';
import { ApiMethod, ApiResponse } from './interfaces/api';
const express = require('express')
const bodyParser = require("body-parser")

const processId = process.pid;
const port = 80;

const app = express();

const savedRoutes: string[] = [];

app.use(bodyParser.json({ limit: '2mb' }));

app.use(function (req: any, res: any, next: any) {

    res.header('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS,PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");

    next();

});


const Resource = (route: string, controllers: any, middleware?: any) => {

    let methods = Object.keys(controllers);

    methods.map(method => {

        let controller: ApiMethod = controllers[method];
        let routes = Object.keys(controller);

        routes.map((key: any) => {
            let keyroute = key[0] === "/" ? key : "/" + key

            savedRoutes.push(`API ${method}: ${route + keyroute}`)

            app[method.toLowerCase()](
                route + keyroute,
                middleware ? middleware : (_: any, __: any, next: any) => next(),
                (req: any, res: any) => {
                    try {
                        controller[key](req, res)
                    }
                    catch (err) {
                        return res.status(400).json(err)
                    }
                })
        })

    });
}

Resource('/users', require('./controllers/users'));

app.get("/", (req: any, res: ApiResponse) => {
    return res.status(200).json(savedRoutes)
})

const server = http.createServer(app)
server.listen(port).once('listening', () => {
    console.log(`Server started on port ${port} (PID: ${processId})`);
})



