# Movie Recommendation System

A production-ready **Movie Recommendation System** that recommends similar movies based on user selection using machine learning similarity models.  
The application is deployed live on **Streamlit Cloud** and is built to handle large ML assets efficiently using **Git LFS**.

Live Application:  
https://movie-recommendation-bds4ayrru6lcxh8wwrequx.streamlit.app/

---

## Project Overview

This project implements a **content-based movie recommendation system** that analyzes relationships between movies using vector similarity techniques.  
Users can select a movie and instantly receive a list of similar movies along with dynamically fetched posters.

The system is designed with real-world deployment considerations, including large precomputed similarity matrices and cloud-compatible file handling.

---

## Demo Preview

Add a short screen recording of the application as a GIF for visual demonstration.

Place the GIF at the following path:


docs/demo.gif


Then GitHub will automatically render it here:

![Application Demo](docs/demo.gif)

---

## Key Features

- Content-based movie recommendation using cosine similarity  
- Fast inference using precomputed similarity matrix  
- Movie poster integration via TMDB API  
- Interactive and responsive Streamlit UI  
- Large file handling with Git Large File Storage (LFS)  
- Live deployment on Streamlit Cloud  

---

## Technology Stack

- Programming Language: Python  
- Framework: Streamlit  
- Machine Learning: Scikit-learn  
- Data Processing: Pandas, NumPy  
- Model Serialization: Pickle (.pkl)  
- External API: The Movie Database (TMDB)  
- Version Control: Git and Git LFS  
- Deployment Platform: Streamlit Cloud  

---

## How the System Works

1. Movie metadata is processed and vectorized.
2. A cosine similarity matrix is computed offline.
3. The similarity matrix is stored as a serialized `.pkl` file.
4. When a user selects a movie:
   - The most similar movies are identified.
   - Movie posters are fetched dynamically using the TMDB API.
5. Recommendations are displayed instantly through the Streamlit interface.

---

## Project Structure



movie-recommendation/
├── app.py
├── similarity.pkl
├── movie_list.pkl
├── requirements.txt
├── README.md


---

## Installation and Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/farooq-senpai/movie-recommendation.git
   cd movie-recommendation


Install dependencies:

pip install -r requirements.txt


Run the application:

streamlit run app.py

Dataset Information

Movie metadata inspired by publicly available datasets such as MovieLens

Movie posters and additional details are fetched using the TMDB API

Future Improvements

Genre-based and year-based filtering

Hybrid recommendation system

User profiles and watchlists

Model optimization to reduce memory footprint

Migration of large assets to cloud object storage

Author

Farooq
B.Sc Computer Science
Interests: Machine Learning, Automation, Data Engineering, and Deployment

License

This project is open-source and intended for educational and portfolio purposes.
