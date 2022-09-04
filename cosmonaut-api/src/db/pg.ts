import { Pool, PoolClient, PoolConfig, QueryResult } from "pg";

class PgSingle {
    private static instance: PgSingle;
    private pool: Pool;

    private constructor() {
        // Number of default client instances that the pool has => 10
        this.pool = new Pool({
            max: 10,
        });
    }
    public static getInstance(): PgSingle {
        if (!PgSingle.instance) {
            PgSingle.instance = new PgSingle();
        }
        return PgSingle.instance;
    }

    public changePoolCfg(cfg: PoolConfig) {
        this.pool = new Pool(cfg);
    }

    public async getClient(): Promise<PoolClient> {
        const client = await this.pool.connect();
        const release = client.release;

        // set a timeout of 5 seconds
        const timeout = setTimeout(() => {
            console.error(
                "A client has been checked out for more than 5 seconds!"
            );
        }, 5000);

        client.release = () => {
            clearTimeout(timeout);
            client.release = release;
            return release.apply(client);
        };
        return client;
    }

    public queryWithCb(
        text: string,
        params: any,
        callback: (err: Error, result: QueryResult) => void
    ) {
        const start = Date.now();
        return this.pool.query(text, params, (err, res) => {
            const duration = Math.floor((Date.now() - start) / 1000);
            console.log(
                `Exectued pg query: ${text} => ${duration} secs, rows: ${res.rowCount}`
            );
            callback(err, res);
        });
    }
}

export { PgSingle };
