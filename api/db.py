import sqlite3

# method to create a function
def create_connection():
    # connect to the db file
    conn = sqlite3.connect('./sqlite.db')

    # return the connection
    return conn

# method to get a user using email
def get_user(email):
    conn = create_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM users"