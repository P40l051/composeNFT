<h1 align="center">
  <br>
  Compose NFT
  <br>
</h1>

<h4 align="center">A minimal set of scripts to generate NFT images & metadata (<a href="https://opensea.io/" target="_blank">OpenSea</a> standard) and upload everything directly to IPFS... uri ready to use!</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-install">How To Install</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

## Key Features

* Genarate images from row layers sovrapposition
  - Possible to generate all possible combination
  - Possible to generate a random sub set of combination "n"
  - .tiff, .png data accepted
* Metadata
  - Auto genaration of metadata
  - Possibele to hide a layer property in OpenSea
  - Auto metadata uri update after uploading to IPFS
* Uploading data to IPFS
  - Using <a href="https://nft.storage/" target="_blank">NFT Storage</a>
  - 2 directories: picture directory and JSON directory (JSON base CID can be used for NFT uri)
* Cross platform
  - Windows, macOS and Linux ready.

## How To Install

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/P40l051/composeNFT.git

# Go into the repository
$ cd composeNFT

# Install dependencies
$ npm install

```
## How To Use

1) Create a folder in the main directory (example: NFT_asset)
2) Create sub folders: one for any layer (example: 1_Skin, 2_Nose, etc.)
    - names of sub folders are the names of metadata properties
    - the number 1_, 2_, 3_ etc is the order of image sovrapposition (1_ is background)
    - if you want to hide the property in OpeSea properties add the character § at the end (example 3_Mouth§)
    - inside any folder you put layer images (name used is the property value)
3) See example "NFT_asset" to understand
4) go to <a href="https://nft.storage/" target="_blank">NFT Storage</a>, get an API key, create a file called .env and insert the API Key there (see .env.example as example).
5) Go to config.js to insert all the parameters needed

If you want to generate all possible combination run:
```bash
# Generate all possible combination jsons
$ node scripts/1_generateAllJsons.js
```
If you want to generate a subset of combination run:
```bash
# Generate a sub set of combination jsons
$ node scripts/1_generateRandomJsons.js
```
Then generate images:
```bash
# Print images
$ node scripts/2_printImages.js
```
Only if you want to add special metadata run
```bash
# Add special Metadata
$ node scripts/3_addSpecialMetadata.js
```
Upload to IPFS and get the CID
```bash
# upload images and jsons
$ node scripts/4_upload.js
```

## License

MIT

---
