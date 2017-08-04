from flask import Flask, render_template
from flask import request
import sqlite3
from flask import g

app = Flask(__name__)

@app.route("/")
@app.route("/<user>")
def template_test(user=None):
  return render_template('index.html', user=user)


if __name__ == '__main__':
  app.run(debug=True)