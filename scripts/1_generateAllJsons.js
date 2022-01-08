import fs from 'fs';
import { isNotJunk } from 'junk';
import config from '../config.js';

const _filedir = config.filedir;
const _jsondir = config.jsondir;
const _baseName = config.baseName;

var meta = {};
meta['attributes'] = [];
meta['name'] = [];
meta['description'] = [];

const propertyNameList = fs.readdirSync(_filedir).sort().filter(isNotJunk);
console.log("Number of layers is:", propertyNameList.length)
var propertyValues = {};
var arrayofProperties = [];
for (let i = 0; i < propertyNameList.length; i++) {
    var propertyName = propertyNameList[i].split('_')[1];
    propertyValues[propertyName] = [];
    propertyValues[propertyName] = fs.readdirSync(_filedir + "/" + propertyNameList[i]).sort().filter(isNotJunk);
    arrayofProperties.push(propertyValues[propertyName]);
}
var combinations = cartesian.apply(null, arrayofProperties);
console.log("Numer of total combinations is:", combinations.length)

for (let tokenID = 1; tokenID <= combinations.length; tokenID++) {
    meta['name'] = _baseName + tokenID;
    meta['description'] = _baseName + tokenID + " is just one..... In total there are other " + (combinations.length) + " unique token of this family";

    for (let i = 0; i < combinations[tokenID - 1].length; i++) {
        var data = {
            propertyName: propertyNameList[i].split('_')[1],
            propertyValue: combinations[tokenID - 1][i].split('.').slice(0, -1).join('')
        };
        meta['attributes'].push(data);
    }
    createJson(meta, tokenID);
    meta['attributes'] = [];
}

function cartesian(...args) {
    var r = [], max = args.length - 1;
    function helper(arr, i) {
        for (var j = 0, l = args[i].length; j < l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i == max)
                r.push(a);
            else
                helper(a, i + 1);
        }
    }
    helper([], 0);
    return r;
}

function createJson(_meta, _tokenID) {
    fs.mkdir(_jsondir, (err) => { });
    const json = JSON.stringify(_meta);
    fs.writeFile(_jsondir + "/" + _baseName + _tokenID + ".json", json, (err) => {
        if (err)
            throw err;
    })
}