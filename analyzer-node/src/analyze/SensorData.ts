import fs from 'fs';
import moment from 'moment';
"use strict";

export default class SensorData {
  constructor(filePath) {
    // console.log(`sensorData reading: ${filePath}`);
    this.filePath = filePath;

    this.extractFileData();
    // console.log(this.sensorData);
  }

  extractFileData() {
    try {
      // JSONファイルを読み込み、パースして変数に格納
      const rawData = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(rawData);
      
      // console.log(jsonData);
      this.sensorData = jsonData;
      // ここでjsonDataを使用できます
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
    
  }

  filter(func) {

    let data = [];

    // console.log("from here selected data");

    for(let i = 0; i < this.sensorData.length; i++) {
      if(func(this.sensorData[i])) {
        data.push(this.sensorData[i]);
        // console.log(this.sensorData[i]);
      }
    }

    return data;
  }

  getFirstTimestamp() {
    let firstRow = this.sensorData[0];
    // console.log(firstRow);
    return moment(firstRow["timestamp"], "HH-mm-ss-SSSS");
  }

  getLastTimestamp() {
    const dataLen = this.sensorData.length;
    let lastRow = this.sensorData[dataLen - 1];
    // console.log(lastRow);
    return moment(lastRow["timestamp"], "HH-mm-ss-SSSS");
  }
}

// module.exports = SensorData;
