CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    notification_email VARCHAR(100) NOT NULL,
    gw_lat DOUBLE NOT NULL,
    gw_long DOUBLE NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (
    name,
    email,
    notification_email,
    gw_lat,
    gw_long,
    password
) VALUES (
    'ayato',
    'aytysd@gmail.com',
    'aytysd@gmail.com',
    35.681236,
    139.767125,
    'ayato_password'
);
