import sqlite3

# method to create a function
def create_connection():
    # connect to the db file
    conn = sqlite3.connect('./sqlite.db')

    conn.row_factory = sqlite3.Row

    # return the connection
    return conn

# method to get a user using email
def get_user(email):
    conn = create_connection()
    cursor = conn.cursor()

    query = f'''
        SELECT
            *
        FROM
            users
        WHERE
            email=\'{email}\'
    '''
    cursor.execute(query)

    data = cursor.fetchone()

    return dict(data)

# method to get all the statistics of a user
def get_statistics(email):
    conn = create_connection()
    cursor = conn.cursor()

    query = f'''
        SELECT
            algorithm
            ,level
            ,time
        FROM
            statistics stat
        JOIN  users u
            ON (stat.email = u.email)
        WHERE
            u.email=\'{email}\';
    '''
    cursor.execute(query)

    rows = cursor.fetchall()

    # make the object json serializable
    data = list()
    for row in rows:
        data.append(dict(row))

    return data

# method to add a statistic
def add_statistics(email, algorithm, level, time):
    conn = create_connection()
    cursor = conn.cursor()

    query = f'''
        INSERT INTO statistics (
            email
            ,algorithm
            ,level
            ,time
        ) VALUES (
            \'{email}\'
            ,\'{algorithm}\'
            ,{level}
            ,{time}
        );
    '''
    cursor.execute(query)

    data = cursor.fetchall()

    return data
