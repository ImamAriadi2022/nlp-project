from flask import Flask, request, jsonify
from model import recommend, recommend_by_features
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
@app.route('/recommend', methods=['POST'])
def recommend_endpoint():
    try:
        data = request.get_json()
        song_index = data.get('song_index')
        n_recommendations = data.get('n_recommendations', 5)
        
        if song_index is None:
            return jsonify({'error': 'song_index is required'}), 400
        
        recommendations = recommend(song_index, n_recommendations)
        return jsonify(recommendations.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recommend-by-features', methods=['POST'])
def recommend_by_features_endpoint():
    try:
        data = request.get_json()
        features_input = data.get('features')
        n_recommendations = data.get('n_recommendations', 5)
        
        if features_input is None or not isinstance(features_input, list):
            return jsonify({'error': 'Valid features input is required'}), 400
        
        recommendations = recommend_by_features(features_input, n_recommendations)
        return jsonify(recommendations.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
