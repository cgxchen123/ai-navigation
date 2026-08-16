#!/usr/bin/env python3
"""AI导航站 HTTP 服务器 - 使用 Python 内置 http.server"""
import http.server
import socketserver
import os
import webbrowser
import threading
import time
import sys

PORT = 3210
ROOT = os.path.dirname(os.path.abspath(__file__))

os.chdir(ROOT)

handler = http.server.SimpleHTTPRequestHandler

httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
print(f"AI导航站已启动: http://127.0.0.1:{PORT}")
print("按 Ctrl+C 停止服务器")

# 打开浏览器
time.sleep(0.5)
webbrowser.open(f"http://127.0.0.1:{PORT}")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\n服务器已停止")
    sys.exit(0)
