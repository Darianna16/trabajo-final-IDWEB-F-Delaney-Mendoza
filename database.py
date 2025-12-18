import sqlite3

conn = sqlite3.connect("suscripciones.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS suscriptores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL
)
""")

conn.commit()
conn.close()

print("Base de datos creada correctamente")

