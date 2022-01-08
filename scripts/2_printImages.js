import fs from 'fs';
import { isNotJunk } from 'junk';
import Jimp from 'jimp';

const _randomToken = 5;
const _filedir = "NFT_asset1";
const _jsondir = "Output_files/json";
const _baseName = "fakePunk";
const inputImageExtension = ".tiff";
const outputImageExtension = ".png";

const _finalImageDir = "Output_files/images";
const propertyNameList = fs.readdirSync(_filedir).sort().filter(isNotJunk);

async function main() {
    const jsons = fs.readdirSync(_jsondir).sort().filter(isNotJunk);

    for (let i = 0; i < jsons.length; i++) {
        var array = []
        const Json = readJson(jsons[i]);
        // console.log(Json['attributes']);
        for (let j = 0; j <= Json['attributes'].length - 1; j++) {
            array.push(_filedir + "/" + propertyNameList[j] + "/" + Json['attributes'][j]["propertyValue"] + inputImageExtension);
            //await sleep(100);
        }
        console.log();

        const a = await Jimp.read(array[0]);
        const b = await Jimp.read(array[1]);
        const c = await Jimp.read(array[2]);
        const d = await Jimp.read(array[3]);
        const e = await Jimp.read(array[4]);

        //select correct oreder of composition
        Jimp.read(a)
            .then(image => {
                image.blit(a, 0, 0)
                    .blit(b, 0, 0)
                    .blit(c, 0, 0)
                    .blit(d, 0, 0)
                    .blit(e, 0, 0)
                    .write(_finalImageDir + "/" + `newfakepunk${i + 1}` + outputImageExtension)
            })
            .catch(err => {
                console.log(err);
            });
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
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});