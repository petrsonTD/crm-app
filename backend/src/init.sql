CREATE TABLE users (
  id CHAR(21) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  userRank VARCHAR(255)
);

CREATE TABLE usersData (
  id CHAR(21) PRIMARY KEY,
  userId CHAR(21),
  lastName VARCHAR(255),
  firstName VARCHAR(255),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (id, username, password, userRank) VALUES
('F-CzHlrjRYgy_QPkPpTFS', 'admin', '$2a$12$KOQQ3/WbvxK5YVHHYXfuCeZqOMgTLVDbnBcIaXYeYIm4fUdDGlspO', 'admin'), --adminp
('Ai9TZGP4Wn6koLpdGqtz9', 'service1', '$2a$12$Ecr4Ej79JXvXvPISxX22gOk06vu/1grgkrMmbPSWCUjsohKG2NoTe', 'support'), --service1p
('VWKT9-qvaJjH3SbSddWFx', 'customer1', '$2a$12$oNY8EAtOC8zc5nMKx3mtmOU7.vS4FmxL7lZZKFXIxtxzU1aXyff1C', 'customer'); --customer1p

INSERT INTO usersData (id, userId, lastName, firstName) VALUES
('TBjmYNEij6p59KqFxQIiI', 'F-CzHlrjRYgy_QPkPpTFS', 'Smith', 'Admin'),
('XdSuQYPOAMnuomQZAC_CQ', 'Ai9TZGP4Wn6koLpdGqtz9', 'Johnson', 'Service'),
('zVjeZh4Bd8MepOMj3t8t6', 'VWKT9-qvaJjH3SbSddWFx', 'Doe', 'Customer');
