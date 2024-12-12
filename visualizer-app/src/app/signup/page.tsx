"use client";

import React, { useState } from 'react';

const SignupForm = () => {

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("hello");
    console.log("email:", formData.get('email'));
    console.log("password:", formData.get('password'));

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();
      setShowBackButton(true);
    } catch (error) {
      setShowBackButton(true);
    }
  };

  return (
    // <form action="api/signup" method="post" encType="application/x-www-form-urlencoded">
    <div>
      {/* {showBackButton &&
        <button onClick={() => window.history.back()}>
          戻る
        </button>
      }, */}
      <form onSubmit={handleSubmit}>
        <h2>サインアップ</h2>
        <div>
          <label htmlFor="fullName">氏名:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
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
          <label htmlFor="password">通知用メールアドレス:</label>
          <input
            type="email"
            id="notification-email"
            name="notification-email"
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
        <div>
          <label htmlFor="password">GWの緯度:</label>
          <input
            type="number"
            id="gw_lat"
            name="gw_lat"
            required
          />
        </div>
        <div>
          <label htmlFor="password">GWの経度:</label>
          <input
            type="number"
            id="gw_long"
            name="gw_long"
            required
          />
        </div>
        <button type="submit">サインアップ</button>
      </form>

    </div>
  );
};

export default SignupForm;