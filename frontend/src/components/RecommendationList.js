import React from 'react';

function RecommendationList({ recommendations }) {
    return (
        <div>
            <h2>Rekomendasi Lagu:</h2>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((song, index) => (
                        <li key={index}>
                            <strong>{song['Track Name']}</strong> oleh {song['Artist Name(s)']}<br />
                            Album: {song['Album Name']} | Popularitas: {song['Popularity']}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Tidak ada rekomendasi yang ditemukan.</p>
            )}
        </div>
    );
}

export default RecommendationList;
