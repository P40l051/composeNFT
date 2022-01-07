import Jimp from 'jimp';

const inputFolder = "NFT_asset/";
const outputFolder = "Output_files/";
const inputImageExtension = ".tiff";
const outputImageExtension = ".png";

const maxEye = 3;
const maxHair = 4;
const maxMouth = 3;
const maxNose = 4;
const maxSkin = 3;
/*
---Files and folders should have the same name---
example:
folder: Eye
file names: Eye1.tiff, Eye2.tiff , etc
*/

async function main() {
    const EyeUrls = await getUrls(inputFolder, "Eye", maxEye, inputImageExtension);
    const HairUrls = await getUrls(inputFolder, "Hair", maxHair, inputImageExtension);
    const MouthUrls = await getUrls(inputFolder, "Mouth", maxMouth, inputImageExtension);
    const NoseUrls = await getUrls(inputFolder, "Nose", maxNose, inputImageExtension);
    const SkinUrls = await getUrls(inputFolder, "Skin", maxSkin, inputImageExtension);

    var i = 0;
    for (let eye_index = 0; eye_index <= maxEye - 1; eye_index++) {
        for (let hair_index = 0; hair_index <= maxHair - 1; hair_index++) {
            for (let mouth_index = 0; mouth_index <= maxMouth - 1; mouth_index++) {
                for (let nose_index = 0; nose_index <= maxNose - 1; nose_index++) {
                    for (let skin_index = 0; skin_index <= maxSkin - 1; skin_index++) {
                        i++;
                        const eye = await Jimp.read(EyeUrls[eye_index]);
                        const hair = await Jimp.read(HairUrls[hair_index]);
                        const mouth = await Jimp.read(MouthUrls[mouth_index]);
                        const nose = await Jimp.read(NoseUrls[nose_index]);
                        const skin = await Jimp.read(SkinUrls[skin_index]);
                        console.log("Process", i, "initiated!");

                        //select correct oreder of composition
                        Jimp.read(SkinUrls[skin_index])
                            .then(image => {
                                image.blit(skin, 0, 0)
                                    .blit(eye, 0, 0)
                                    .blit(nose, 0, 0)
                                    .blit(mouth, 0, 0)
                                    .blit(hair, 0, 0)
                                    .write(outputFolder + `images/fakepunk${i - 1}` + outputImageExtension)
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
            }
        }
    };
}

async function getUrls(_baseDir, _baseName, _numberfiles, _format) {

    const array = []
    for (let i = 1; i <= _numberfiles; i++) {
        array.push(_baseDir + _baseName + "/" + _baseName + i + _format)
    }
    return array;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});