import fs from 'fs';
import { Dorrent } from './makeDorrent';

const downloadDorrent = (dorrentFilename: string) => {

    const dorrentFile = fs.readFileSync(dorrentFilename);
    const dorrentData: Dorrent = JSON.parse(dorrentFile.toString());

    


}
