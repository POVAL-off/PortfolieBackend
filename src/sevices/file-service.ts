import * as uuid from "uuid";
import * as path from "path";
import {finished} from "stream/promises";

export class FileService {
    static async saveFile(file: Promise<any>) {
        const {filename, createReadStream} = await (file as any);
        const endFileName = uuid.v4() + '.' + filename.split('.').pop();
        const stream = createReadStream();
        const out = require('fs').createWriteStream(path.resolve(__dirname, '..', 'static', endFileName));
        stream.pipe(out);
        await finished(out);

        return endFileName;
    }
}