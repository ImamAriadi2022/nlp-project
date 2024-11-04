import React from 'react';

function RecommendationList({ recommendations }) {
    return (
        <div>
            <h2>Rekomendasi Lagu:</h2>
            <ul>
                {recommendations.map((song, index) => (
                    <li key={index}>
                        {song.title} oleh {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecommendationList;
