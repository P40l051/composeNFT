import fs from 'fs';
import { isNotJunk } from 'junk';
import Jimp from 'jimp';
import config from '../config.js';

const _filedir = config.filedir;
const _jsonDir = config.jsondir;
const _finalImageDir = config.finalImageDir;

const extraMetaName = config.spcialMetaName
const extraMetaType = config.specialMetaType
const extraMetaRandom = config.specialMetaRandom


async function main() {
    const imageNumber = fs.readdirSync(_finalImageDir).sort().filter(isNotJunk).length;
    const totalLayers = fs.readdirSync(_filedir).sort().filter(isNotJunk).length;
    updateJsons(_jsonDir, imageNumber)
}

function updateJsons(_dir, _fileNumber) {
    try {
        const oldJsons = fs.readdirSync(_dir).sort().filter(isNotJunk);
        oldJsons.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
        for (let i = 0; i < oldJsons.length; i++) {
            if (i < _fileNumber) {
                var data = fs.readFileSync(_jsonDir + "/" + oldJsons[i], 'utf8');
                var json = JSON.parse(data);

                var rand = between(extraMetaRandom[0], extraMetaRandom[1]);
                var data = {
                    display_type: extraMetaType,
                    trait_type: extraMetaName,
                    value: rand
                };
                json['attributes'].push(data);


                var final = JSON.stringify(json);
                fs.writeFile(_jsonDir + "/" + oldJsons[i], final, (err) => {
                    if (err)
                        throw err;
                })
            }
            else {
                fs.unlinkSync(_jsonDir + "/" + oldJsons[i]);
            }

        }
        console.log("extra metaadata concelled -> jsons updated!")
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});