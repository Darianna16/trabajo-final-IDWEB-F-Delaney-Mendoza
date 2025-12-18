from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import sqlite3

class Servidor(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.path == "/suscribirse":
            length = int(self.headers["Content-Length"])
            body = self.rfile.read(length).decode("utf-8")
            data = urllib.parse.parse_qs(body)

            email = data.get("email", [""])[0]

            conn = sqlite3.connect("suscripciones.db")
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO suscriptores (email) VALUES (?)",
                (email,)
            )
            conn.commit()
            conn.close()

            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h2>Gracias por suscribirte</h2>")

    def do_GET(self):
        if self.path.startswith("/admin"):
            params = urllib.parse.urlparse(self.path).query
            data = urllib.parse.parse_qs(params)
            password = data.get("pass", [""])[0]

            if password != "admin123":
                self.send_response(401)
                self.end_headers()
                self.wfile.write(b"Acceso denegado")
                return

            conn = sqlite3.connect("suscripciones.db")
            cursor = conn.cursor()
            cursor.execute("SELECT email FROM suscriptores")
            correos = cursor.fetchall()
            conn.close()

            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            self.wfile.write(b"<h2>Correos suscritos</h2>")
            for c in correos:
                self.wfile.write(f"{c[0]}<br>".encode())

if __name__ == "__main__":
    server = HTTPServer(("localhost", 8000), Servidor)
    print("Servidor corriendo en http://localhost:8000")
    server.serve_forever()

