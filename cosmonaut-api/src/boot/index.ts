import path from 'path';
import {createHash} from 'crypto';
import {mkdirSync} from 'fs'


import {setPgdb, runSQL} from "./db";
import {sleep} from "../utils";
import conf from "../config";

(async function(){
    const flags = process.argv.slice(2);
    for (let f of flags) {
        if (f === "--init") {
            await setPgdb('db/schema/init.db.sql');
            await sleep(1000);
        }
    }

    await runSQL(conf.pg.dbname, ['db/schema/clean.sql'], ';');
    await runSQL(conf.pg.dbname, ['db/schema/init.tb.sql'], ';');
    await runSQL(conf.pg.dbname, ['db/schema/logic.sql'], '##');
    for (let i=0; i<6; i++) {
        const dirPrefix = createHash('sha256').update(`cosmonaut-lesson${i}`).digest('hex') + `-${i}`
        const dirPath = path.join(process.cwd(), 'assets', dirPrefix)
        mkdirSync(dirPath, {recursive: true})
    }

})();
