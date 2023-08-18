CREATE TABLE users (
    id serial   NOT NULL,
    username VARCHAR(25) NOT NULL UNIQUE,
    password text   NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text   NOT NULL CHECK (position('@' IN email) > 1) UNIQUE,
    is_admin boolean   NOT NULL DEFAULT FALSE,
    created_at timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY (
        id
     )
);

CREATE TABLE projects (
    id serial   NOT NULL,
    title text   NOT NULL,
    description text   NOT NULL,
    manager integer,
    status TEXT NOT NULL CHECK (status IN ('planned', 'in progress', 'completed')),
    deadline date   NOT NULL,
    created_by integer,
    created_at timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_projects PRIMARY KEY (
        id
     )
);

CREATE TABLE user_projects (
    user_id integer   NOT NULL,
    project_id integer   NOT NULL,
    CONSTRAINT pk_user_projects PRIMARY KEY (user_id, project_id)
);

CREATE TABLE retrospectives (
    id serial   NOT NULL,
    facilitator text NOT NULL,
    start_doing text   NOT NULL,
    stop_doing text   NOT NULL,
    continue_doing text   NOT NULL,
    action_items text   NOT NULL,
    lessons_learned text   NOT NULL,
    participant_name text   NOT NULL,
    project_id integer   NOT NULL,
    created_at timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_retrospectives PRIMARY KEY (
        id
     )
);

CREATE TABLE tags (
    id serial   NOT NULL,
    name text   NOT NULL,
    created_at timestamp   NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_tags PRIMARY KEY (
        id
     )
);

CREATE TABLE retrospective_tags (
    retrospective_id integer   NOT NULL,
    tag_id integer   NOT NULL,
    CONSTRAINT pk_retrospective_tags PRIMARY KEY (retrospective_id, tag_id)
);

CREATE TABLE comments (
    id serial   NOT NULL,
    comment text,
    created_at timestamp   NOT NULL,
    user_id integer,
    project_id integer,
    retrospective_id integer,
    CONSTRAINT pk_comments PRIMARY KEY (
        id
     )
);

ALTER TABLE projects ADD CONSTRAINT fk_projects_created_by FOREIGN KEY(created_by)
REFERENCES users (id) ON DELETE SET NULL;

ALTER TABLE projects ADD CONSTRAINT fk_projects_manager FOREIGN KEY(manager)
REFERENCES users (id) ON DELETE SET NULL;

ALTER TABLE user_projects ADD CONSTRAINT fk_user_projects_user_id FOREIGN KEY(user_id)
REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE user_projects ADD CONSTRAINT fk_user_projects_project_id FOREIGN KEY(project_id)
REFERENCES projects (id) ON DELETE CASCADE;

ALTER TABLE retrospectives ADD CONSTRAINT fk_retrospectives_project_id FOREIGN KEY(project_id)
REFERENCES projects (id);

ALTER TABLE retrospective_tags ADD CONSTRAINT fk_retrospective_tags_retrospective_id FOREIGN KEY(retrospective_id)
REFERENCES retrospectives (id);

ALTER TABLE retrospective_tags ADD CONSTRAINT fk_retrospective_tags_tag_id FOREIGN KEY(tag_id)
REFERENCES tags (id);

ALTER TABLE comments ADD CONSTRAINT fk_comments_user_id FOREIGN KEY(user_id)
REFERENCES users (id) ON DELETE SET NULL;

ALTER TABLE comments ADD CONSTRAINT fk_comments_project_id FOREIGN KEY(project_id)
REFERENCES projects (id) ON DELETE SET NULL;

ALTER TABLE comments ADD CONSTRAINT fk_comments_retrospective_id FOREIGN KEY(retrospective_id)
REFERENCES retrospectives (id) ON DELETE SET NULL;