import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  console.log("email:", email);
  console.log("password:", password);

  const connection = await mysql.createConnection({
    host: '192.168.10.5',  // ホスト名
    user: 'root',
    password: 'root_password',
    database: 'user_db'
  });

    const [rows, fields] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    ) as [RowDataPacket[], any];

    await connection.end(); // Ensure the connection is closed

    try {
        if (rows.length > 0) {
            console.log('Matching row found:', rows);
            return NextResponse.json({
                message: 'ログインが成功しました' 
            }, { 
                status: 200 
            });
        } else {
            console.log('No matching credentials found.');
            return NextResponse.json({
                message: 'ログインが失敗しました' 
            }, { 
                status: 200 
            });
        }
    } catch (error) {
        console.error('Database error:', error);
        throw error; // Handle error appropriately
    } finally {
    }


}

