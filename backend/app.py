from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend, data, model

app = Flask(__name__)
CORS(app)

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    song_id = int(data['song_id'])
    recommendations = recommend(song_id, data, model)
    return jsonify(recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
