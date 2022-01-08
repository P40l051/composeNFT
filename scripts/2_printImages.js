import fs from 'fs';
import { isNotJunk } from 'junk';
import Jimp from 'jimp';
import config from '../config.js';

const _filedir = config.filedir;
const _jsondir = config.jsondir;
const _baseName = config.baseName;

const inputImageExtension = config.inputImageExtension;
const outputImageExtension = config.outputImageExtension;
const _finalImageDir = config.finalImageDir;

const propertyNameList = fs.readdirSync(_filedir).sort().filter(isNotJunk);

async function main() {
    const jsons = fs.readdirSync(_jsondir).sort().filter(isNotJunk);
    fs.mkdir(_finalImageDir, (err) => { });
    for (let i = 0; i < jsons.length; i++) {
        var array = []
        const Json = readJson(jsons[i]);
        // console.log(Json['attributes']);
        for (let j = 0; j <= Json['attributes'].length - 1; j++) {
            const output = _finalImageDir + "/" + _baseName + (i + 1) + outputImageExtension;
            const layer = _filedir + "/" + propertyNameList[j] + "/" + Json['attributes'][j]["propertyValue"] + inputImageExtension;
            var ren_layer = await Jimp.read(layer);
            if (j == 0) {
                var input = await Jimp.read(layer);
            } else {
                var input = await Jimp.read(output);
            }
            //select correct oreder of composition
            Jimp.read(input)
                .then(image => {
                    image.blit(ren_layer, 0, 0)
                        .write(output)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        console.log("Image", (i + 1), "generated!");
    }
}

function readJson(_id) {
    try {
        const data = fs.readFileSync(_jsondir + "/" + _id, 'utf8');
        const databases = JSON.parse(data);
        return databases;
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});