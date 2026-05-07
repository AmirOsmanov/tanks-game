#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({'.js': 'application/javascript'})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Сервер запущен: http://localhost:{PORT}")
    print("Нажми Ctrl+C чтобы остановить")
    httpd.serve_forever()
