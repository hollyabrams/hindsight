-- both test users have the password "password"

-- Users
INSERT INTO users (username, password, first_name, last_name, email, is_admin, created_at, updated_at)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'testuser@example.com',
        FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING id;

INSERT INTO users (username, password, first_name, last_name, email, is_admin, created_at, updated_at)
VALUES ('testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test2',
        'User2',
        'test2user2@example.com',
        TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING id;

INSERT INTO users (username, password, first_name, last_name, email, is_admin, created_at, updated_at)
VALUES  ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'testadmin@example.com',
        TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING id;

-- Projects
INSERT INTO projects (title, description, manager, deadline, status, created_by, created_at, updated_at)
VALUES 
('Project Alpha', 'Description for Project Alpha.', 1, '2023-12-31', 'planned', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Beta', 'Description for Project Beta.', 2, '2023-11-30', 'in progress', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Gamma', 'Description for Project Gamma.', 3, '2023-10-31', 'completed', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Delta', 'Description for Project Delta.', 1, '2024-01-31', 'planned', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Epsilon', 'Description for Project Epsilon.', 2, '2024-02-28', 'in progress', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Zeta', 'Description for Project Zeta.', 3, '2024-03-31', 'completed', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Eta', 'Description for Project Eta.', 1, '2024-04-30', 'planned', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Theta', 'Description for Project Theta.', 2, '2024-05-31', 'in progress', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Iota', 'Description for Project Iota.', 3, '2024-06-30', 'completed', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Kappa', 'Description for Project Kappa.', 1, '2024-07-31', 'planned', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Lambda', 'Description for Project Lambda.', 2, '2024-08-31', 'in progress', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project Mu', 'Description for Project Mu.', 3, '2024-09-30', 'completed', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- User_Projects
INSERT INTO user_projects (user_id, project_id)
VALUES 
(1, 1),
(2, 2);

-- Retrospectives
INSERT INTO retrospectives (facilitator, start_doing, stop_doing, continue_doing, action_items, lessons_learned, participant_name, project_id, created_at, updated_at)
VALUES 
('John Doe', 'start doing this', 'stop doing this', 'continue doing this', 'these are the action items', 'these are the lessons learned', 'John Doe', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tags
INSERT INTO tags (name, created_at, updated_at)
VALUES 
('Tag 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tag 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Retrospective_Tags
INSERT INTO retrospective_tags (retrospective_id, tag_id)
VALUES 
(1, 1),
(1, 2);

-- Comments
INSERT INTO comments (comment, created_at, user_id, project_id, retrospective_id)
VALUES 
('This is a comment', CURRENT_TIMESTAMP, 1, 1, 1);