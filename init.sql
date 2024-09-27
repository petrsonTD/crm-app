CREATE TABLE users (
    id char(36) PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    userRank varchar(255)
);

CREATE TABLE usersData (
    id char(36) PRIMARY KEY,
    userId char(36),
    lastName varchar(255),
    firstName varchar(255),
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (id, username, password, userRank)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'admin', 'adminpassword', 'admin'),
    ('550e8400-e29b-41d4-a716-446655440001', 'service1', 'service1password', 'support'),
    ('550e8400-e29b-41d4-a716-446655440002', 'customer1', 'customer1password', 'customer');

INSERT INTO usersData (id, userId, lastName, firstName)
VALUES 
    ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Smith', 'Admin'),
    ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Johnson', 'Service'),
    ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Doe', 'Customer');
