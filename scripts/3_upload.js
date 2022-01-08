import fs from 'fs'
import { isNotJunk } from 'junk';
import { NFTStorage, File } from 'nft.storage'
import config from '../config.js';
import dotenv from 'dotenv';

dotenv.config()
const endpoint = 'https://api.nft.storage' // the default
const token = process.env.NFTSTORAGE_API_KEY;

const _jsondir = config.jsondir;
const _baseName = config.baseName;
const _imageExtension = config.outputImageExtension;
const _imageDir = config.finalImageDir;

async function main() {
    const storage = new NFTStorage({ endpoint, token })
    const imageDirCID = await uploadDir(_imageDir, storage);
    console.log("imageDirCID is:", imageDirCID);
    console.log("IPFS Directory link:", "https://ipfs.io/ipfs/" + imageDirCID)


    const newJsons = updateJsons(_jsondir, imageDirCID);
    /*
        jsonsDirCID = uploadJsons(_jsondir,storage);
        */
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
        const cid = await _storage.storeDirectory(newarray);
        console.log("DONE!")
        return cid;
    } catch (err) {
        console.log(`Error uploading files to IPFS: ${err}`);
    }
}

function updateJsons(_dir, _CID) {
    try {
        const oldJsons = fs.readdirSync(_dir).sort().filter(isNotJunk);
        oldJsons.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
        for (let i = 0; i < oldJsons.length; i++) {
            var imageString = "https://ipfs.io/ipfs/" + _CID + "/" + oldJsons[i]
            var externalUrlString = "https://dweb.link/ipfs/" + _CID + "/" + oldJsons[i]
            // read json i
            // add image string
            // add externalUrlString
            // print new json[i]
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