# -*- coding: utf-8 -*-
"""
Created on Wed Dec 28 01:31:20 2022

@author: Rahul
"""

# save this as app.py
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/home")
def routeIndex():
    return render_template('index.html')

@app.route('/components/<path:filename>')
def download_file(filename):
    return send_from_directory("components", filename, as_attachment=True)