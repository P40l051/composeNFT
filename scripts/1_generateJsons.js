//// non funziona.... capire come generare la sequenza corretta di attributi////


import fs from 'fs';
import { isNotJunk } from 'junk';

const _randomToken = 7;
const _filedir = "NFT_asset1";
const _jsondir = "Output_files/json";
const _baseName = "fakePunk #";

const propertyNameList = fs.readdirSync(_filedir).sort().filter(isNotJunk);

var meta = {};

meta['attributes'] = [];
meta['name'] = [];
meta['description'] = [];

async function main() {

    for (let tokenID = 1; tokenID < _randomToken + 1; tokenID) {
        meta['name'] = _baseName + tokenID;
        meta['description'] = _baseName + tokenID + " is just one..... There are " + (_randomToken - 1) + " other unique token of this family";

        for (let i = 0; i < propertyNameList.length; i++) {
            var propertyValues = {};
            var property = propertyNameList[i].split('_')[1];

            propertyValues[property] = [];

            propertyValues[property] = fs.readdirSync(_filedir + "/" + propertyNameList[i]).sort().filter(isNotJunk);
            var rand = between(0, propertyValues[property].length)
            var value = propertyValues[property][rand].split('.').slice(0, -1).join('');
            //console.log("Property", propertyNameList[i])
            var data = {
                propertyName: property,
                propertyValue: value
            };
            meta['attributes'].push(data);
        }
        createJson(meta, tokenID);
        await sleep(50);
        console.log("tokenID:", tokenID);
        for (let i = 1; i <= tokenID; i++) {
            if (i != tokenID & checkJsons(readJson(i), readJson(tokenID))) {
                console.log("Token", tokenID, "duplicated with token", i, "\n----> Generating a new token:", tokenID)
                tokenID = tokenID - 1;
                break;
            }
        }
        tokenID++;
        meta['attributes'] = [];
        meta['name'] = [];
    }
}

function createJson(_meta, _tokenID) {
    const json = JSON.stringify(_meta);
    fs.writeFile(_jsondir + "/" + _baseName + _tokenID + ".json", json, (err) => {
        if (err)
            throw err;
    })
}

function readJson(id) {
    try {
        const data = fs.readFileSync("Output_files/json/" + _baseName + id + ".json", 'utf8');
        const databases = JSON.parse(data);
        return databases;
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

function checkJsons(otherJson, newJson) {
    var sameJson = true;
    var counter = 0;
    if (otherJson['attributes'] != newJson['attributes']) { sameJson = false; }
    for (let i = 0; i <= otherJson['attributes'].length - 1; i++) {
        if (otherJson['attributes'][i]["propertyValue"] == newJson['attributes'][i]["propertyValue"]) {
            counter++;
            if (counter == otherJson['attributes'].length) { sameJson = true; }
        }
    };
    return sameJson;
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