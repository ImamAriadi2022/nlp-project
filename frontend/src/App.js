import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [songIndex, setSongIndex] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [featuresInput, setFeaturesInput] = useState({ danceability: '', energy: '', tempo: '', valence: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getRecommendations = async () => {
        setLoading(true);
        setError('');
        try {
            if (!songIndex) {
                throw new Error('Please enter a valid song index.');
            }
            const response = await axios.post('http://localhost:5000/recommend', {
                song_index: parseInt(songIndex),
                n_recommendations: 5
            });
            setRecommendations(response.data);
        } catch (error) {
            setError(error.message || 'Error fetching recommendations.');
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRecommendationsByFeatures = async () => {
        setLoading(true);
        setError('');
        try {
            const featuresArray = Object.values(featuresInput).map(Number);
            if (featuresArray.some(isNaN)) {
                throw new Error('Please enter valid numeric values for features.');
            }
            const response = await axios.post('http://localhost:5000/recommend-by-features', {
                features: featuresArray,
                n_recommendations: 5
            });
            setRecommendations(response.data);
        } catch (error) {
            setError(error.message || 'Error fetching recommendations by features.');
            console.error('Error fetching recommendations by features:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSongIndex('');
        setFeaturesInput({ danceability: '', energy: '', tempo: '', valence: '' });
        setRecommendations([]);
        setError('');
    };

    return (
        <div>
            <h1>Music Recommendation App</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter song index (e.g., 0)"
                    value={songIndex}
                    onChange={(e) => setSongIndex(e.target.value)}
                />
                <button onClick={getRecommendations} disabled={loading}>Get Recommendations by Song Index</button>
            </div>
            <div>
                <h3>Enter Features for Custom Recommendation</h3>
                {Object.keys(featuresInput).map((feature) => (
                    <input
                        key={feature}
                        type="number" // Changed to number for better input control
                        placeholder={`${feature} (0 to 1)`}
                        value={featuresInput[feature]}
                        onChange={(e) => setFeaturesInput({ ...featuresInput, [feature]: e.target.value })}
                    />
                ))}
                <button onClick={getRecommendationsByFeatures} disabled={loading}>Get Recommendations by Features</button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {loading && <div>Loading recommendations...</div>}
            <button onClick={handleClear}>Clear Inputs</button>
            <div>
                <h2>Recommendations</h2>
                {recommendations.map((rec, index) => (
                    <div key={index}>
                        <p>{rec['Track Name']} by {rec['Artist Name(s)']}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
