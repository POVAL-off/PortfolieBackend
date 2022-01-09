import "reflect-metadata";
import * as dotenv from 'dotenv'
import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {buildSchema} from "type-graphql";
import {Application, Request, Response} from "express";
import {ConnectOptions} from "mongoose";
import * as mongoose from "mongoose";
import { graphqlUploadExpress } from 'graphql-upload';
import * as path from "path";

dotenv.config()

const {PORT, MONGODB_URI} = process.env;

const app: Application = Express();

app.use(graphqlUploadExpress());
app.use(Express.static(path.resolve(__dirname, 'static')))

const mongoConnectOptions = {
    useNewUrlParser: true
} as ConnectOptions;

const main = async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"],
        dateScalarMode: 'isoDate'
    });


    const apolloServer = new ApolloServer({schema});

    await mongoose.connect(MONGODB_URI as string, mongoConnectOptions)
    console.log('💾 MongoDB has been connected')

    await apolloServer.start()
    console.log('🟣 Apollo server has been started')

    try {
        app.get('/', (_req: Request, res: Response) => res.send('GraphQL API'))
        apolloServer.applyMiddleware({app});

        app.listen(PORT, () => {
            console.log(`server started on http://localhost:${PORT}/graphql`);
        });
    } catch (err) {
        console.log(`❌ Error: \n ${err}`)
    }
};

main();