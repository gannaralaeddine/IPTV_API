const mongoose = require('mongoose');
const SeriesStream = require('./models/SeriesStream');
const fs = require('fs');
const path = require('path');

// Replace with your MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/iptv';

async function checkFiles() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
        console.log('Checking series files...\n');

        // Get all series streams
        const allSeries = await SeriesStream.find().sort({ series_id: 1 });
        
        console.log(`Found ${allSeries.length} series streams:`);
        allSeries.forEach((series, index) => {
            console.log(`${index + 1}. Name: "${series.name}"`);
            console.log(`   series_id: ${series.series_id}`);
            console.log(`   file: ${series.file}`);
            
            const filePath = path.join(__dirname, "../My DATA/SERIES", series.file);
            console.log(`   Full path: ${filePath}`);
            console.log(`   File exists: ${fs.existsSync(filePath) ? 'YES' : 'NO'}`);
            console.log('   ---');
        });

        // Check if the My DATA/SERIES directory exists
        const seriesDir = path.join(__dirname, "../My DATA/SERIES");
        console.log(`\nSeries directory: ${seriesDir}`);
        console.log(`Directory exists: ${fs.existsSync(seriesDir) ? 'YES' : 'NO'}`);
        
        if (fs.existsSync(seriesDir)) {
            const files = fs.readdirSync(seriesDir);
            console.log(`Files in directory: ${files.length}`);
            files.forEach(file => {
                console.log(`  - ${file}`);
            });
        }

        mongoose.disconnect();
    } catch (err) {
        console.error('Error checking files:', err);
        mongoose.disconnect();
    }
}

checkFiles();
