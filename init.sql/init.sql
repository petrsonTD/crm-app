CREATE TABLE userRanks (
  id CHAR(21) PRIMARY KEY,
  rankName VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE users (
  id CHAR(21) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  userRankId CHAR(21),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (userRankId) REFERENCES userRanks(id) ON DELETE CASCADE
);

CREATE TABLE usersData (
  id CHAR(21) PRIMARY KEY,
  userId CHAR(21),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  street VARCHAR(255),
  psc VARCHAR(255),
  city VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE productAvailabilities (
  id CHAR(21) PRIMARY KEY,
  availability VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE products (
  id CHAR(21) PRIMARY KEY,
  productName VARCHAR(255) NOT NULL,
  availabilityId CHAR(21),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (availabilityId) REFERENCES productAvailabilities(id) ON DELETE CASCADE
);

CREATE TABLE shippingMethod (
  id CHAR(21) PRIMARY KEY,
  methodName VARCHAR(255) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE orderStatus (
  id CHAR(21) PRIMARY KEY,
  statusName VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE coupons (
  id CHAR(21) PRIMARY KEY,
  code VARCHAR(255) NOT NUll,
  percentage TINYINT(1) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
  id CHAR(21) PRIMARY KEY,
  userId CHAR(21),
  productId CHAR(21),
  productPrice DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  couponId CHAR(21),
  shippingMethodId CHAR(21),
  orderStatusId CHAR(21),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products(id),
  FOREIGN KEY (shippingMethodId) REFERENCES shippingMethod(id),
  FOREIGN KEY (orderStatusId) REFERENCES orderStatus(id),
  FOREIGN KEY (couponId) REFERENCES coupons(id)
);

INSERT INTO userRanks (id, rankName) VALUES
('MFM8AH7qpOfYpJHCTTehl', 'admin'),
('UPcP28pg9P5fW6NGhC5IT', 'support'),
('XIZ0qdyOxo2wO_H_sB4JK', 'customer')

INSERT INTO users (id, username, email, password, userRankId) VALUES
('F-CzHlrjRYgy_QPkPpTFS', 'admin', 'admin@crm.com', '$2a$12$KOQQ3/WbvxK5YVHHYXfuCeZqOMgTLVDbnBcIaXYeYIm4fUdDGlspO', 'MFM8AH7qpOfYpJHCTTehl'),
('Ai9TZGP4Wn6koLpdGqtz9', 'support1', 'support1@crm.com', '$2a$12$VWyHBqfkT81pKDgoBG624O8ajpspjhkxal3J9xCmGP7xFM1NQrs6e', 'UPcP28pg9P5fW6NGhC5IT'),
('VWKT9-qvaJjH3SbSddWFx', 'customer1', 'customer1@gmail.com', '$2a$12$oNY8EAtOC8zc5nMKx3mtmOU7.vS4FmxL7lZZKFXIxtxzU1aXyff1C', 'XIZ0qdyOxo2wO_H_sB4JK'),
('L4XBJAOqXbFkjEgWb_kja', 'customer2', 'customer2@gmail.com', 'tHAisc1a4FHivXW3GkYreuIDDHrwYBLTwZtCE7n6ToHlH0vehJidO', 'XIZ0qdyOxo2wO_H_sB4JK'),
('BCej-yV-yKqBoJ8CIXDXA', 'customer3', 'customer3@gmail.com', '$2a$12$nkM7Li1pZtId4XfcejpXLuHoeAknCE0OWo8sxnyA2JITnPkifalk2', 'XIZ0qdyOxo2wO_H_sB4JK');

INSERT INTO usersData (id, userId, firstName, lastName, street, psc, city) VALUES
('TBjmYNEij6p59KqFxQIiI', 'F-CzHlrjRYgy_QPkPpTFS', 'Admin', 'Smith', 'Kuzmanyho 750/11', '09412', 'Bratislava'),
('XdSuQYPOAMnuomQZAC_CQ', 'Ai9TZGP4Wn6koLpdGqtz9', 'Support', 'Johnson', 'Košická 34/51', '03432', 'Žilina'),
('zVjeZh4Bd8MepOMj3t8t6', 'VWKT9-qvaJjH3SbSddWFx', 'Customer', 'Doe', 'Dončova 11/33', '09432', 'Košice'),
('SIZfuYr3g-Ir-RtjqWU8i', 'L4XBJAOqXbFkjEgWb_kja', 'Customer', 'Morgan', 'Paleckého 22/15', '03401', 'Ružomberok'),
('a0OHMXsqJdR1EL_EOYWL1', 'BCej-yV-yKqBoJ8CIXDXA', 'Customer', 'Swean', 'Viedenská 33/22', '03811', 'Hrabov');

INSERT INTO productAvailabilities (id, availability) VALUES
('GPHCAQUoDMmLGFEnOmKNz', 'Available'),
('Qzxwn-r2RjdrMpueH8jt5', 'Out of stock'),
('3dt5qWO_-roqWQWr44nqp', 'Sale ended');

INSERT INTO products (id, productName, availabilityId, price) VALUES
('Qy1w9bWZiJ8_StXCycbV6', 'Laptop', 'GPHCAQUoDMmLGFEnOmKNz', 999.99),
('YFZV4sgX0Y78yqudgiMq1', 'Smartphone', 'Qzxwn-r2RjdrMpueH8jt5', 699.99),
('CBUCoBv_OTxjnfHq4lNqs', 'Headphones', '3dt5qWO_-roqWQWr44nqp', 199.99);

INSERT INTO shippingMethod (id, methodName, cost) VALUES
('vcSjimLrpccVdtNTFoa4C', 'Standard Shipping', 5.99),
('wNO5HTe-wcFbDNHKTc9kd', 'Express Shipping', 15.99),
('-ZLFqbZzl6NQ0_LcK5xUL', 'Overnight Shipping', 29.99);

INSERT INTO orderStatus (id, statusName) VALUES
('SmjmAP7DAn11rRWNNDrsn', 'Pending'),
('34utAiAETtEMrCXR3VYwq', 'Shipped'),
('ss72v2cN_zDcOECB-WyL3', 'Delivered'),
('XNwnHKViGaNFl1KkWmb8f', 'Cancelled');

INSERT INTO coupons (id, code, percentage, amount) VALUES
('bgmx-WjRx8uyjhcvfZf9r', '%5OFF', 1, 50),
('JI004UIg5AQDshZY64yLG', 'SAVE10EUR', 0, 10);

INSERT INTO orders (id, userId, productId, productPrice, quantity, shippingMethodId, orderStatusId) VALUES
('1sD4F1kgsv_jnt_NEQ-Ri', 'F-CzHlrjRYgy_QPkPpTFS', 'Qy1w9bWZiJ8_StXCycbV6', 999.99, 1, 'vcSjimLrpccVdtNTFoa4C', 'SmjmAP7DAn11rRWNNDrsn'),
('giX7oXgxRb_5G5puuZF8U', 'F-CzHlrjRYgy_QPkPpTFS', 'YFZV4sgX0Y78yqudgiMq1', 699.99, 1, 'wNO5HTe-wcFbDNHKTc9kd', '34utAiAETtEMrCXR3VYwq'),
('OwPsnACNDPcFbCFcYAE0U', 'Ai9TZGP4Wn6koLpdGqtz9', 'YFZV4sgX0Y78yqudgiMq1', 699.99, 2, 'wNO5HTe-wcFbDNHKTc9kd', '34utAiAETtEMrCXR3VYwq'),
('y_l4FVDHaeDz59ZpqEOW3', 'VWKT9-qvaJjH3SbSddWFx', 'CBUCoBv_OTxjnfHq4lNqs', 199.99, 3, '-ZLFqbZzl6NQ0_LcK5xUL', 'ss72v2cN_zDcOECB-WyL3');
