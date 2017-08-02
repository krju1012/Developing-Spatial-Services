from flask import Flask
from flask import request
import sqlite3
from flask import g

app = Flask(__name__)
DATABASE= '/media/sf_shared_folder/saarland.sqlite'

@app.before_request
def dataconnect():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    print "Database succesfully connected"



@app.teardown_request
def dataconnect_close(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()

@app.route('/db')
def query():
    cur = g._database.cursor()
    cur.execute('''SELECT * from geom_address_3857 limit 10''')
    print cur.fetchall()
    return 'connected'
   # cur = g._database.execute(.tables, args)
   # rv = cur.fetchall()
   # cur.close()    
   # return (rv[0] if rv else None) if one else rv

#@app.route('/geocode/lat=<int:lat>')
#def location(lat):
#	return 'Latitude: %d' % lat


#db.execute('select node_id, address, st_astext(geom) from geom_address_3857 limit 10')
#print ();
