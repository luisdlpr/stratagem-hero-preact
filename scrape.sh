#!/bin/bash

cd ./scraper;
node ./src/stratagemScraper.js;
./download_imgs.sh;

cd ../;
rm ./public/thumbnails/*;
rm ./src/util/stratagemInfo.json;

cp ./scraper/thumbnails/* ./public/thumbnails/
cp ./scraper/output.json ./src/util/stratagemInfo.json

