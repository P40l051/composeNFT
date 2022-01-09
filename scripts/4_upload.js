import fs from 'fs'
import { isNotJunk } from 'junk';
import { NFTStorage, File } from 'nft.storage'
import config from '../config.js';
import dotenv from 'dotenv';

dotenv.config()
const endpoint = 'https://api.nft.storage' // the default
const token = process.env.NFTSTORAGE_API_KEY;

const _jsonDir = config.jsondir;
const _baseName = config.baseName;
const _imageExtension = config.outputImageExtension;
const _imageDir = config.finalImageDir;

async function main() {
    const storage = new NFTStorage({ endpoint, token })
    var [imageDirCID, imageNumber] = await uploadDir(_imageDir, storage);
    console.log("imageDirCID is:", imageDirCID);
    console.log("IPFS Directory link:", "https://ipfs.io/ipfs/" + imageDirCID)
    updateJsons(_jsonDir, imageDirCID, imageNumber);
    var [jsonsDirCID, jsonsNumber] = await uploadDir(_jsonDir, storage);
    console.log("jsonsDirCID is:", jsonsDirCID);
    console.log("IPFS Directory link:", "https://ipfs.io/ipfs/" + jsonsDirCID)
}

async function uploadDir(_dir, _storage) {
    try {
        const List = fs.readdirSync(_dir).sort().filter(isNotJunk);
        List.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
        var newarray = [];
        for (let i = 0; i <= List.length - 1; i++) {
            newarray.push(new File([await fs.promises.readFile(_dir + "/" + List[i])], List[i]))
        }
        console.log("....uploading", newarray.length, "files!")
        var cid = await _storage.storeDirectory(newarray);
        return [cid, newarray.length];
    } catch (err) {
        console.log(`Error uploading files to IPFS: ${err}`);
    }
}

function updateJsons(_dir, _CID, _fileNumber) {
    try {
        const oldJsons = fs.readdirSync(_dir).sort().filter(isNotJunk);
        oldJsons.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
        for (let i = 0; i < oldJsons.length; i++) {
            if (i < _fileNumber) {
                var imageString = "https://ipfs.io/ipfs/" + _CID + "/" + oldJsons[i].split('.')[0] + _imageExtension
                var externalUrlString = "https://dweb.link/ipfs/" + _CID + "/" + oldJsons[i].split('.')[0] + _imageExtension
                // read json i
                var data = fs.readFileSync(_jsonDir + "/" + oldJsons[i], 'utf8');
                var json = JSON.parse(data);
                json["image"] = imageString;
                json["external_url"] = externalUrlString;
                var final = JSON.stringify(json);
                json["image"] = [];
                json["external_url"] = [];
                fs.writeFile(_jsonDir + "/" + oldJsons[i], final, (err) => {
                    if (err)
                        throw err;
                })
            }
            else {
                fs.unlinkSync(_jsonDir + "/" + oldJsons[i]);
            }

        }
        console.log("jsons updated!")
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