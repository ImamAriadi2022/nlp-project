import React, { useState } from 'react';
import RecommendationForm from './components/RecommendationForm';
import RecommendationList from './components/RecommendationList';

function App() {
    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = async (songId) => {
        try {
            const response = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ song_id: songId })
            });
            const data = await response.json();
            setRecommendations(data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            <h1>Sistem Rekomendasi Musik</h1>
            <RecommendationForm onRecommend={getRecommendations} />
            <RecommendationList recommendations={recommendations} />
        </div>
    );
}

export default App;
