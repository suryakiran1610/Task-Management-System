# Task Management System

Task Management System is a web application built using React for the frontend and Django for the backend, with MySQL as the database. It allows users to manage tasks, assign them, track progress, and collaborate effectively.

## Installation

### Backend

1. Navigate to the backend directory:
    ```
    cd backend/myproject1
    ```

2. Install backend dependencies:
    ```
    pip install django django-cors-headers djangorestframework djangorestframework-simplejwt
    ```

3. Make sure MySQL is installed and running.

4. Configure database settings in `settings.py`:
    ```python
    DATABASES = {
        'default': {
            "ENGINE": "django.db.backends.mysql",
            'NAME': 'your_database_name',
            'USER': 'your_database_username',
            'PASSWORD': 'your_database_password',
            'HOST': 'localhost',
            'PORT': '3306'
        }
    }
    ```

5. Run the Django server:
    ```
    python manage.py runserver
    ```

### Frontend

1. Navigate to the frontend directory:
    ```
    cd frontend/myproject
    ```

2. Install frontend dependencies:
    ```
    npm install
    ```

## Usage

### Admin
- Admin users can register and login.
- Admin can perform various tasks such as adding, editing, and deleting tasks.
- Admin can assign tasks to multiple users and track their progress.
- Admin can view completed tasks, add comments, and manage user profiles.

### Users
- Normal users can register and login.
- Users can view tasks assigned to them and submit completed tasks with screenshots.
- Users can add comments to tasks and manage their profiles.

## Authentication
- Authentication is handled using JWT tokens.

## Technologies Used
- React
- Django
- MySQL
- JWT Authentication
