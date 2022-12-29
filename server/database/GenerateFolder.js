const { rmSync, mkdirSync } = require('fs');
const path = require('path');

exports.GenerateFolder = async function() {
    rmSync(path.join(__dirname, '..', 'public'), {
        force: true,
        recursive: true,
    });

    mkdirSync(path.join(__dirname, '..', 'public/images/thumb'), {
        recursive: true,
    });

    mkdirSync(path.join(__dirname, '..', 'public/files'), {
        recursive: true,
    });

    mkdirSync(path.join(__dirname, '..', 'public/images/general'), {
        recursive: true,
    });

    mkdirSync(path.join(__dirname, '..', 'public/images/avatar'), {
        recursive: true,
    });

    console.log('Public folder created successfully!');
};