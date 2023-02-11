# -*- coding: utf-8 -*-
"""
Created on Wed Dec 28 01:31:20 2022

@author: Rahul
"""

# save this as app.py
from flask import Flask, render_template, send_from_directory, request
from flask_socketio import SocketIO, emit, join_room, leave_room
import requests, io, base64, cv2
import numpy
from PIL import Image

app = Flask(__name__)

app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, always_connect=True, engineio_logger=True)

@socketio.on('connect')
def connected():
    print('connect')
    
@socketio.on('disconnect')
def disconnect():
    print('disconnect')

def detect_shape(img):
    # img = cv2.imread('Capture_shape_3.png')

    # converting image into grayscale image
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # setting threshold of gray image
    _, threshold = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY)

    # using a findContours() function
    contours, _ = cv2.findContours(threshold, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    i = 0
    # print("contour length: ", len(contours))
    # list for storing names of shapes
    for i in range(1,len(contours)):
        # here we are ignoring first counter because
        # findcontour function detects whole image as shape
        contour = contours[i]
    #     if i == 0:
    #         i = 1
    #         continue

        # cv2.approxPloyDP() function to approximate the shape
        approx = cv2.approxPolyDP(contour, 0.04 * cv2.arcLength(contour, True), True)
        # print(approx)

        # using drawContours() function
        cv2.drawContours(img, [contour], 0, (0, 0, 255), 5)
        # finding center point of shape
        M = cv2.moments(contour)
    #     print(M)
        
        if M['m00'] != 0.0:
            x = int(M['m10']/M['m00'])
            y = int(M['m01']/M['m00'])

        # putting shape name at center of each shape
        if len(approx) == 3:
            cv2.putText(img, 'Triangle', (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
            return "Triangle"

        elif len(approx) == 4:
            cv2.putText(img, 'Quadrilateral', (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
            return "Quadriteral"

        elif len(approx) == 5:
            cv2.putText(img, 'Pentagon', (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
            return "Pentagon"

        elif len(approx) == 6:
            cv2.putText(img, 'Hexagon', (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
            return "Hexagon"

        else:
            cv2.putText(img, 'circle', (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
            return "Circle"

    return "null"

        # displaying the image after drawing contours
    #     cv2.imshow('shapes', img)

    #     cv2.waitKey(0)
    #     cv2.destroyAllWindows()

    # displaying the image after drawing contours
    # cv2.imshow('shapes', img)

    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

@socketio.on('capture_canvas_event')
def handle_capture_canvas_event(json, methods=['GET', 'POST']):
    # print('Received my event: ' + str(json))
    # print(json['url'])
    data_url = json['url']   # here parse the data_url out http://xxxxx/?image={dataURL}
    content = data_url.split(';')[1]
    image_encoded = content.split(',')[1]
    body = base64.decodebytes(image_encoded.encode('utf-8'))
    # print(body)
    # im = Image.open(body)
    image = Image.open(io.BytesIO(body))
    # image.show()
    open_cv_image = numpy.array(image) 
    open_cv_image = open_cv_image[:, :, ::-1].copy()
    # cv2.imshow('open cv image', open_cv_image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    shape = detect_shape(img=open_cv_image)
    socketio.emit('message', {"shape":shape})


@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/home")
def routeIndex():
    return render_template('index.html')

@app.route("/page1")
def routePage1():
    return render_template('page1.html')

@app.route("/page2")
def routePage2():
    return render_template('page2.html')

@app.route('/components/<path:filename>')
def download_file(filename):
    return send_from_directory("components", filename, as_attachment=True)

if __name__ == "__main__":
    socketio.run(app)
    # app.run(debug=False,host='0.0.0.0')