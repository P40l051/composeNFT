var config = {};

config.randomToken = 7; // needed only for 1_generateJsons.js -- number of token to be generated randomly
config.filedir = "NFT_asset1"; // base asset folder -- each layer in a separate folder numered (1_, 2_, etc.) considering the order of sovrapposition
config.jsondir = "Output_files/json"; // output folder for metadata jsons
config.finalImageDir = "Output_files/images"; // output folder for images
config.baseName = "fakePunk #"; // base mane for each token

config.inputImageExtension = ".tiff"; //asset file type
config.outputImageExtension = ".png"; // output images type


export default config;