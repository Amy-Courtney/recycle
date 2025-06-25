import sqlite3

def create_tables():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    # Users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    # Videos table
    c.execute('''
        CREATE TABLE IF NOT EXISTS videos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            filename TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
    # ...existing code...

def add_videos():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    videos = [
        ('Biogas Production', 'biogas.mp4'),
        ('Plastic Recycling', 'plastic_recycling.mp4')
    ]
    c.executemany('INSERT INTO videos (title, filename) VALUES (?, ?)', videos)
    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
    add_videos()