/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
.prompt([
    {
        type: 'input',
        name: 'url',
        message: 'Enter a URL:'
    }
])
.then(answers => {
    console.log(answers.url);

    const qr_svg = qr.image(answers.url, { type: 'png', size: 20 });
    qr_svg.pipe(fs.createWriteStream('qr1.png'));

    fs.writeFile('url.txt', answers.url, (err) => {
        if (err) throw err;
        console.log('The URL has been saved to url.txt!');
    });
})
.catch((error) => {
    if (error.isTtyError) {
        console.log('TypeError');
    } else {
        console.log("Error");
    }
});
