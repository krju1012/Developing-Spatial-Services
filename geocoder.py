from flask import Flask, render_template
from flask import request
import sqlite3
from flask import g

app = Flask(__name__)
DATABASE= '/media/sf_shared_folder/my_bremen_osm_1.sqlite'


def generate_sql(arg1, arg2):
  
    sql_command='''SELECT node_id, adress,(ST_Distance(MakePoint({0}, {1}), geom)) /   1000 AS dist_km
    FROM my_osm_new_adresses as a
    where ST_Contains(ST_Buffer(MakePoint({0}, {1}),10000),geom)
     AND  a.ROWID IN (
     SELECT ROWID
     FROM SpatialIndex
     WHERE f_table_name = 'my_osm_new_adresses'
     AND search_frame = ST_Buffer(MakePoint({0}, {1}),10000))
     order by (ST_Distance(MakePoint({0}, {1}), geom))  limit 1
    ;'''.format(arg1, arg2) 
    print sql_command
    return sql_command

@app.before_request
def dataconnect():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    g._database.enable_load_extension(True)
    g._database.load_extension('/usr/local/lib/mod_spatialite')
    print "Database succesfully connected"



@app.teardown_request
def dataconnect_close(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()

@app.route('/db')
def query():
    cur = g._database.cursor()
    cur.execute('''select * from osm_nodes limit 10''')
    print cur.fetchall()
    return 'connected'
   
@app.route('/geocode')
def calc_distance():
  frompt = request.args.get('from')
  #topt = request.args.get('to')
  lat1,lon1 = frompt.split(",")
  print lat1, lon1
  #lat2,lon2 = topt.split(",")
  cur2 = g._database.cursor()
  cur2.execute(generate_sql(lat1,lon1))
  
  results= cur2.fetchall()
  print results
  return str(results)


@app.route("/")
@app.route("/<user>")
def template_test(user=None):
    return render_template('index.html', user=user)


if __name__ == '__main__':
    app.run(debug=True)
