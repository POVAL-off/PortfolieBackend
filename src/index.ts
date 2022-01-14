import "reflect-metadata";
import * as dotenv from 'dotenv'
import {ApolloServer, CorsOptions} from "apollo-server-express";
import * as Express from "express";
import {buildSchema} from "type-graphql";
import {Application, Request, Response} from "express";
import {ConnectOptions} from "mongoose";
import * as mongoose from "mongoose";
import { graphqlUploadExpress } from 'graphql-upload';
import * as path from "path";
import * as session from "express-session";
import * as cors from 'cors';
import {customAuthChecker} from "./middlewares/role-middleware";

const sessionStore = new session.MemoryStore();

dotenv.config()

const {PORT, MONGODB_URI} = process.env;

const app: Application = Express();

app.set('trust proxy', 1);

const corsSettings: CorsOptions = {
    origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    credentials: true
}

app.use(cors(corsSettings))
app.use(graphqlUploadExpress());
app.use(Express.static(path.resolve(__dirname, 'static')))
app.use(
    session({
        store: sessionStore,
        name: "token",
        secret: "aslkdfjoiq12312",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 14,
            sameSite: "none"
        }
    })
);

const mongoConnectOptions = {
    useNewUrlParser: true
} as ConnectOptions;

const main = async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"],
        dateScalarMode: 'isoDate',
        authChecker: customAuthChecker
    });

    const apolloServer = new ApolloServer({schema, context: ({ req }: any) => ({ req })});

    await mongoose.connect(MONGODB_URI as string, mongoConnectOptions)
    console.log('💾 MongoDB has been connected')

    await apolloServer.start()
    console.log('🟣 Apollo server has been started')

    try {
        app.get('/', (_req: Request, res: Response) => res.send('GraphQL API'))
        apolloServer.applyMiddleware({app, cors: corsSettings});

        app.listen(PORT, () => {
            console.log(`server started on http://localhost:${PORT}/graphql`);
        });
    } catch (err) {
        console.log(`❌ Error: \n ${err}`)
    }
};

main();