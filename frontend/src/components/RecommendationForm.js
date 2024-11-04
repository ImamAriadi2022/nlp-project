import React, { useState } from 'react';

function RecommendationForm({ onRecommend }) {
    const [songId, setSongId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (songId) {
            onRecommend(songId);
            setSongId('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Masukkan ID Lagu:
                <input
                    type="text"
                    value={songId}
                    onChange={(e) => setSongId(e.target.value)}
                />
            </label>
            <button type="submit">Dapatkan Rekomendasi</button>
        </form>
    );
}

export default RecommendationForm;
