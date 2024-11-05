import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

# Load dataset
data = pd.read_csv('data/top_10000_1960-now.csv')

# Menampilkan kolom untuk memastikan kolom yang relevan
print(data.columns)

# Kolom-kolom fitur yang digunakan untuk rekomendasi
features = ['Danceability', 'Energy', 'Tempo', 'Valence']

# Menangani missing values
data = data[features].dropna()

# Standardisasi data
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)

# Menghitung kemiripan kosinus
similarity_matrix = cosine_similarity(scaled_data)

# Fungsi untuk merekomendasikan lagu berdasarkan indeks lagu
def recommend(song_index, n_recommendations=5):
    similarity_scores = list(enumerate(similarity_matrix[song_index]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    recommended_indices = [i[0] for i in similarity_scores[1:n_recommendations + 1]]
    
    return data.iloc[recommended_indices]

# Fungsi untuk merekomendasikan lagu berdasarkan input fitur
def recommend_by_features(features_input, n_recommendations=5):
    input_scaled = scaler.transform([features_input])
    input_similarity = cosine_similarity(input_scaled, scaled_data)[0]
    similarity_scores = list(enumerate(input_similarity))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    recommended_indices = [i[0] for i in similarity_scores[:n_recommendations]]
    
    return data.iloc[recommended_indices]
