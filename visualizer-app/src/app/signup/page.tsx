"use client";

import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    notify_email: '',
    address: '',
    GW: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('フォームデータ:', formData);
    // ここでサーバーにデータを送信する処理を追加
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>サインアップ</h2>
      <div>
        <label htmlFor="fullName">氏名:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">メールアドレス:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">パスワード:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">通知用メールアドレス:</label>
        <input
          type="password"
          id="notify-email"
          name="notify-email"
          value={formData.notify_email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">住所:</label>
        <input
          type=""
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">サインアップ</button>
    </form>
  );
};

export default SignupForm;