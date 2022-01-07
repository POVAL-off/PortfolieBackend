import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {buildSchema, Resolver, Query} from "type-graphql";
import {Application, Request, Response} from "express";

@Resolver()
class HelloResolver {
    @Query(() => String)
    async helloWorld() {
        return "Hello World!";
    }
}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver]
    });

    const apolloServer = new ApolloServer({schema});

    const app: Application = Express();

    await apolloServer.start()
    console.log('🟣 Apollo server has been started')

    try {
        app.get('/', (_req: Request, res: Response) => res.send('GraphQL API'))
        apolloServer.applyMiddleware({app});

        app.listen(4000, () => {
            console.log("server started on http://localhost:4000/graphql");
        });
    } catch (err) {
        console.log(`❌ Error: \n ${err}`)
    }
};

main();