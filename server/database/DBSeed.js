require('dotenv').config();
const mongoose = require('mongoose');

const DeleteAllDB = require('./DeleteAllDB');
const SeedAllDB = require('./SeedAllDB');
const DeleteFolder = require('./GenerateFolder');

exports.DBSeed = async () => {
    try {
        await DeleteFolder.GenerateFolder();
        console.log('\n\n-------------------***-------------------\n');
        mongoose.connect(process.env.DB);
        console.log(' Connected database successfully!!!');
        console.log('\n-------------------***-------------------\n\n');

        await DeleteAllDB.DeleteAllDB();
        console.log('------\n');

        await SeedAllDB.SeedAllDB();
        console.log('------\n');

        console.log('\n-------------------***-------------------');

        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
};