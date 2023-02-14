# Setup and requirements
For running the code you need [Node.js](https://nodejs.org/en/download) and [MySQL](https://www.mysql.com/downloads/) then: <br />
1. Run the following commands
    ```
    git clone https://github.com/Sajjad-Mi/Subscription.git
    cd Subscription
    npm install
    ```
2. Create a database in MySQL
    ```sql
    CREATE DATABASE your_database_name
    ```
3. Then create a .env file in the root directory of project for environment variables with following variables
    ```
    MYSQL_HOST = for example '127.0.0.1'
    MYSQL_USER = for example 'root'
    MYSQL_PASSWORD = your_password
    MYSQL_DATABASE = your_database_name
    JWT_SECRET = your_jwt_secret
    ```
4. Run the code with node or use following command
    ```
    npm run start
    ```