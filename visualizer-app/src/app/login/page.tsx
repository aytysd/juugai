"use client";

import React, { useState } from 'react';

function LoginForm() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("hello");
    console.log("email:", formData.get('email'));
    console.log("password:", formData.get('password'));

    try {
      const response = await fetch('api/login', {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();
    } catch (error) {
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>ログイン</h2>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default LoginForm;