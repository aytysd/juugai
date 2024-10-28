import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';


export async function GET() {
  try {
    // const directoryPath = '/app/database/SensorData';
    const directoryPath = '../database/SensorData';
    const files = await fs.readdir(directoryPath);

    // JSONファイル名から日付部分を抽出
    const dateList = files
      .filter(file => file.endsWith('.json')) // JSONファイルのみフィルタリング
      .map(file => path.basename(file, '.json')); // 拡張子を取り除く

    console.log(dateList); // 結果を表示
    return NextResponse.json(dateList);
  } catch (error) {
    console.error('Error reading file list:', error);
    return NextResponse.json({ error: 'ファイルリストの取得に失敗しました' }, { status: 500 });
  }
}