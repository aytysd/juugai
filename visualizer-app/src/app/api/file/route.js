import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const { datetime } = await req.json();
  console.log('Received datetime: ', datetime);

  const results = {};

  try {
    const sensorDataPath = path.join('/app/database/SensorData', `${datetime}.json`);
    // const sensorDataPath = path.join('../database/SensorData', `${datetime}.json`);
    const jsonData = await fs.readFile(sensorDataPath, 'utf8'); // ファイルを非同期に読み込む
    results.sensorData = JSON.parse(jsonData); // JSON文字列をオブジェクトに変換
  } catch (error) {
    console.error('Error reading sensor data JSON file:', error);
    results.sensorData = null; // エラーの場合はnullを設定
  }

  try {
    const predictedPathPath = path.join('/app/database/PredictedPathData', `${datetime}-out.json`);
    // const predictedPathPath = path.join('../database/PredictedPathData', `${datetime}-out.json`);
    const jsonData = await fs.readFile(predictedPathPath, 'utf8'); // ファイルを非同期に読み込む
    results.predictedPath = JSON.parse(jsonData); // JSON文字列をオブジェクトに変換
  } catch (error) {
    console.error('Error reading predicted path JSON file:', error);
    results.predictedPath = null; // エラーの場合はnullを設定
  }

  try {
    const pathDataPath = path.join('/app/database/PathData', `${datetime}-traj.json`);
    // const pathDataPath = path.join('../database/PathData', `${datetime}-traj.json`);
    const jsonData = await fs.readFile(pathDataPath, 'utf8'); // ファイルを非同期に読み込む
    results.path = JSON.parse(jsonData); // JSON文字列をオブジェクトに変換
  } catch (error) {
    console.error('Error reading path data JSON file:', error);
    results.path = null; // エラーの場合はnullを設定
  }


  return NextResponse.json(results); // 結果をJSON形式で返す
}