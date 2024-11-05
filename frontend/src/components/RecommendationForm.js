import React, { useState } from 'react';

function RecommendationForm({ onRecommend }) {
    const [songId, setSongId] = useState('');
    const [danceability, setDanceability] = useState(0.5);
    const [energy, setEnergy] = useState(0.5);
    const [tempo, setTempo] = useState(120);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (songId) {
            onRecommend({ song_id: songId });
            setSongId('');
        } else {
            onRecommend({ danceability, energy, tempo });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Masukkan ID Lagu (opsional):
                <input type="text" value={songId} onChange={(e) => setSongId(e.target.value)} />
            </label>
            <p>Atau masukkan kriteria musik:</p>
            <label>
                Danceability:
                <input type="number" value={danceability} onChange={(e) => setDanceability(e.target.value)} />
            </label>
            <label>
                Energy:
                <input type="number" value={energy} onChange={(e) => setEnergy(e.target.value)} />
            </label>
            <label>
                Tempo:
                <input type="number" value={tempo} onChange={(e) => setTempo(e.target.value)} />
            </label>
            <button type="submit">Dapatkan Rekomendasi</button>
        </form>
    );
}

export default RecommendationForm;
