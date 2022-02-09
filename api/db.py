from flask import Flask

def get_user(mysql):
    conn = mysql.connect()
    cursor = conn.cursor()