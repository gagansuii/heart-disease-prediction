# Heart Disease Prediction Web Application

This comprehensive web application predicts the 10-year risk of coronary heart disease (CHD) based on various health parameters. It combines machine learning with an intuitive user interface to provide personalized risk assessments and educational content about heart disease.

![Heart Disease Prediction Tool](static/images/app_screenshot.png)

## Features

- **Prediction Tool**: Enter your health information to get a personalized heart disease risk assessment
- **Interactive Dashboard**: View key statistics and insights from the dataset
- **Data Visualizations**: Explore relationships between risk factors and heart disease
- **Prediction History**: Track and review previous risk assessments
- **Educational Content**: Learn about heart disease risk factors and prevention strategies
- **Responsive Design**: Optimized for both desktop and mobile devices

## Dataset

The application uses the Framingham Heart Study dataset, which includes various risk factors and whether individuals developed heart disease within a 10-year period. Key features include:

- **Demographic information**: Age, sex, education level
- **Behavioral factors**: Smoking status, cigarettes per day
- **Medical history**: Blood pressure medication, previous stroke, hypertension, diabetes
- **Physical measurements**: Total cholesterol, systolic and diastolic blood pressure, BMI, heart rate, glucose levels

## Technical Details

- **Backend**: Flask API with scikit-learn machine learning models
- **Frontend**: HTML5, CSS3, JavaScript with Bootstrap 5 for responsive design
- **Machine Learning**: Random Forest Classifier with preprocessing pipeline
- **Data Visualization**: Matplotlib and Seaborn for generating insights
- **Data Storage**: JSON for prediction history and model evaluation metrics

## Installation and Setup

1. Clone this repository:
   ```
   git clone <repository-url>
   cd heart-disease-prediction
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   python run.py
   ```

4. Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

- `app.py`: Main Flask application with routes and API endpoints
- `model.py`: Machine learning model training, evaluation, and visualization generation
- `run.py`: Application runner script
- `templates/`: HTML templates for the web interface
  - `index.html`: Prediction tool interface
  - `dashboard.html`: Data dashboard with key metrics
  - `visualizations.html`: Detailed data insights and visualizations
  - `history.html`: User prediction history
  - `about.html`: Information about the project
- `static/`: Static assets and generated visualizations
  - `css/`: Stylesheet files
  - `js/`: JavaScript files for client-side functionality
  - `images/`: Generated visualizations and images
- `train_updated.csv`: Dataset used for training the model
- `heart_disease_model.pkl`: Trained model (generated after first run)
- `prediction_history.json`: User prediction history (generated as predictions are made)
- `model_evaluation.json`: Model performance metrics (generated during training)

## Usage

1. **Prediction Tool**: Fill in your health information in the form and click "Predict Heart Disease Risk" to get your assessment
2. **Dashboard**: View key statistics about the dataset and model performance
3. **Data Insights**: Explore visualizations showing relationships between various risk factors and heart disease
4. **History**: Review your previous predictions and track changes in your risk profile
5. **About**: Learn more about the project, the dataset, and heart disease risk factors

## Key Machine Learning Features

- **Preprocessing Pipeline**: Handles missing values, scaling, and encoding
- **Feature Importance Analysis**: Identifies the most significant predictors of heart disease
- **Model Evaluation**: ROC curve, precision-recall curve, and confusion matrix
- **Risk Factor Identification**: Automatically highlights key risk factors in user input

## Disclaimer

This tool is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## Future Enhancements

- User accounts and authentication
- PDF report generation for predictions
- Additional visualization types
- Integration with wearable device data
- Comparative analysis with different prediction models

## License

This project is licensed under the MIT License - see the LICENSE file for details.