import sqlite3

conn = sqlite3.connect('database.db')
c = conn.cursor()

tables = ['users', 'chats', 'categories', 'doctors', 'appointments', 'notifications', 'wallets', 'payments', 'weight_tracking', 'prescriptions', 'consultation_notes']

for table in tables:
    try:
        c.execute(f"DELETE FROM {table}")
        print(f"Cleared data from {table}")
    except Exception as e:
        print(f"Error clearing {table}: {e}")

conn.commit()
conn.close()

print("All data cleared from tables.")
