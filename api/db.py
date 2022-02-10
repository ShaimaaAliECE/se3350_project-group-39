# function to get the user from the email given
def get_user(db, email):
    # construct the query
    query = "SELECT * FROM Users WHERE email=:email"

    # execute the query
    result = db.execute(query, { "email": email }).fetchone()

    return result

def add_user(db, email, password):
    # construct the query
    query = "INSERT INTO Users (email, password) VALUES (:email, :password)"

    # execute the query
    db.execute(query, { "email": email, "password": password })
    db.commit()

# function to get all the statistics associated with a user email
def get_stats(db, email):
    # construct the query
    query = "SELECT * FROM Statistics WHERE email=:email"

    # execute the query
    results = db.execute(query, { "email": email }).fetchall()

    return results

# function to add a statistic
def add_stats(db, email, level, algorithm, time):
    # construct the query
    query = "INSERT INTO Statistics (email, level, algorithm, time) VALUES (:email, :level, :algorithm, :time)"

    # execute the query
    db.execute(query, { "email": email, "level": level, "algorithm": algorithm, "time": time })
    db.commit()