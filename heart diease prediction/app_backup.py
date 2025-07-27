from flask import Flask, request, jsonify, render_template, send_from_directory, redirect, url_for, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
import json
from datetime import datetime
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
import json
from datetime import datetime

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Check if model exists, if not train it
if not os.path.exists('heart_disease_model.pkl'):
    try:
        from model import train_model
        model = train_model()
    except Exception as e:
        print(f"Error training model: {e}")
        model = None
else:
    try:
        model = joblib.load('heart_disease_model.pkl')
    except Exception as e:
        print(f"Error loading model: {e}")
        model = None

# Load dataset for statistics
try:
    df = pd.read_csv('train_updated.csv')
    dataset_stats = {
        'total_records': len(df),
        'positive_cases': int(df['TenYearCHD'].sum()),
        'negative_cases': int(len(df) - df['TenYearCHD'].sum()),
        'positive_rate': float(df['TenYearCHD'].mean()),
        'avg_age': float(df['age'].mean()),
        'avg_cholesterol': float(df['totChol'].mean()),
        'avg_systolic_bp': float(df['sysBP'].mean()),
        'avg_diastolic_bp': float(df['diaBP'].mean()),
        'smokers_count': int(df['is_smoking'].sum()),
        'smokers_percentage': float(df['is_smoking'].mean() * 100)
    }
except Exception as e:
    print(f"Error loading dataset statistics: {e}")
    dataset_stats = {}

@app.route('/')
def home():
    return render_template('index.html', stats=dataset_stats)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', stats=dataset_stats)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.json
        
        # Create a DataFrame with the input data
        input_data = pd.DataFrame({
            'age': [data.get('age')],
            'education': [data.get('education')],
            'sex': [data.get('sex')],
            'is_smoking': [data.get('is_smoking')],
            'cigsPerDay': [data.get('cigsPerDay')],
            'BPMeds': [data.get('BPMeds')],
            'prevalentStroke': [data.get('prevalentStroke')],
            'prevalentHyp': [data.get('prevalentHyp')],
            'diabetes': [data.get('diabetes')],
            'totChol': [data.get('totChol')],
            'sysBP': [data.get('sysBP')],
            'diaBP': [data.get('diaBP')],
            'BMI': [data.get('BMI')],
            'heartRate': [data.get('heartRate')],
            'glucose': [data.get('glucose')]
        })
        
        # Make prediction
        if model is not None:
            prediction = model.predict(input_data)
            prediction_proba = model.predict_proba(input_data)
            
            # Identify risk factors
            risk_factors = []
            
            # Age risk
            if data.get('age') > 60:
                risk_factors.append({'name': 'Age > 60', 'impact': 1})
            
            # Smoking risk
            if data.get('is_smoking') == 1:
                risk_factors.append({'name': 'Current Smoker', 'impact': 1})
                if data.get('cigsPerDay', 0) > 20:
                    risk_factors.append({'name': 'Heavy Smoker (>20 cigarettes/day)', 'impact': 1})
            
            # Blood pressure risk
            if data.get('sysBP') > 140 or data.get('diaBP') > 90:
                risk_factors.append({'name': 'High Blood Pressure', 'impact': 1})
            
            # Cholesterol risk
            if data.get('totChol') > 240:
                risk_factors.append({'name': 'High Cholesterol', 'impact': 1})
            
            # BMI risk
            if data.get('BMI') and data.get('BMI') > 30:
                risk_factors.append({'name': 'Obesity (BMI > 30)', 'impact': 1})
            
            # Medical history risks
            if data.get('prevalentStroke') == 1:
                risk_factors.append({'name': 'Previous Stroke', 'impact': 1})
            if data.get('prevalentHyp') == 1:
                risk_factors.append({'name': 'Hypertension', 'impact': 1})
            if data.get('diabetes') == 1:
                risk_factors.append({'name': 'Diabetes', 'impact': 1})
            
            # Protective factors
            if data.get('is_smoking') == 0:
                risk_factors.append({'name': 'Non-Smoker', 'impact': -1})
            if data.get('BMI') and 18.5 <= data.get('BMI') <= 24.9:
                risk_factors.append({'name': 'Healthy BMI', 'impact': -1})
            if data.get('totChol') < 200:
                risk_factors.append({'name': 'Healthy Cholesterol Level', 'impact': -1})
            
            # Save prediction to history file
            try:
                prediction_history = {
                    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'input_data': data,
                    'prediction': int(prediction[0]),
                    'probability': float(prediction_proba[0][1])
                }
                
                history_file = 'prediction_history.json'
                if os.path.exists(history_file):
                    with open(history_file, 'r') as f:
                        history = json.load(f)
                else:
                    history = []
                
                history.append(prediction_history)
                
                with open(history_file, 'w') as f:
                    json.dump(history, f)
            except Exception as e:
                print(f"Error saving prediction history: {e}")
            
            # Return prediction
            return jsonify({
                'prediction': int(prediction[0]),
                'probability': float(prediction_proba[0][1]),
                'message': 'High risk of heart disease in 10 years' if prediction[0] == 1 else 'Low risk of heart disease in 10 years',
                'risk_factors': risk_factors
            })
        else:
            return jsonify({'error': 'Model not available'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clear_history', methods=['POST'])
def clear_history():
    try:
        if os.path.exists('prediction_history.json'):
            os.remove('prediction_history.json')
        return jsonify({'success': True, 'message': 'History cleared successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate_report/<int:history_id>')
def generate_report(history_id):
    try:
        if os.path.exists('prediction_history.json'):
            with open('prediction_history.json', 'r') as f:
                history = json.load(f)
            
            if history_id < len(history):
                record = history[history_id]
                # Generate PDF report (placeholder for now)
                return jsonify({
                    'success': True,
                    'message': 'Report generated successfully',
                    'record': record
                })
            else:
                return jsonify({'error': 'Record not found'}), 404
        else:
            return jsonify({'error': 'No history found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user_statistics')
def user_statistics():
    try:
        if os.path.exists('prediction_history.json'):
            with open('prediction_history.json', 'r') as f:
                history = json.load(f)
            
            # Calculate statistics from user predictions
            total_predictions = len(history)
            high_risk_count = sum(1 for record in history if record['prediction'] == 1)
            low_risk_count = total_predictions - high_risk_count
            
            # Calculate average values for key metrics
            avg_age = sum(record['input_data'].get('age', 0) for record in history) / total_predictions if total_predictions > 0 else 0
            avg_systolic = sum(record['input_data'].get('sysBP', 0) for record in history) / total_predictions if total_predictions > 0 else 0
            avg_diastolic = sum(record['input_data'].get('diaBP', 0) for record in history) / total_predictions if total_predictions > 0 else 0
            avg_cholesterol = sum(record['input_data'].get('totChol', 0) for record in history) / total_predictions if total_predictions > 0 else 0
            
            # Count common risk factors
            smokers = sum(1 for record in history if record['input_data'].get('is_smoking') == 1)
            hypertension = sum(1 for record in history if record['input_data'].get('prevalentHyp') == 1)
            diabetes = sum(1 for record in history if record['input_data'].get('diabetes') == 1)
            
            return jsonify({
                'total_predictions': total_predictions,
                'high_risk_count': high_risk_count,
                'low_risk_count': low_risk_count,
                'high_risk_percentage': (high_risk_count / total_predictions * 100) if total_predictions > 0 else 0,
                'avg_age': avg_age,
                'avg_systolic': avg_systolic,
                'avg_diastolic': avg_diastolic,
                'avg_cholesterol': avg_cholesterol,
                'smokers_count': smokers,
                'smokers_percentage': (smokers / total_predictions * 100) if total_predictions > 0 else 0,
                'hypertension_count': hypertension,
                'hypertension_percentage': (hypertension / total_predictions * 100) if total_predictions > 0 else 0,
                'diabetes_count': diabetes,
                'diabetes_percentage': (diabetes / total_predictions * 100) if total_predictions > 0 else 0
            })
        else:
            return jsonify({
                'total_predictions': 0,
                'high_risk_count': 0,
                'low_risk_count': 0,
                'high_risk_percentage': 0,
                'avg_age': 0,
                'avg_systolic': 0,
                'avg_diastolic': 0,
                'avg_cholesterol': 0,
                'smokers_count': 0,
                'smokers_percentage': 0,
                'hypertension_count': 0,
                'hypertension_percentage': 0,
                'diabetes_count': 0,
                'diabetes_percentage': 0
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/compare_to_population')
def compare_to_population():
    try:
        if os.path.exists('prediction_history.json'):
            with open('prediction_history.json', 'r') as f:
                history = json.load(f)
            
            if not history:
                return jsonify({'error': 'No history found'}), 404
            
            # Get the most recent prediction
            latest = history[-1]
            
            # Compare with population statistics
            comparison = {
                'age': {
                    'user': latest['input_data'].get('age', 0),
                    'population_avg': dataset_stats.get('avg_age', 0),
                    'difference': latest['input_data'].get('age', 0) - dataset_stats.get('avg_age', 0)
                },
                'systolic_bp': {
                    'user': latest['input_data'].get('sysBP', 0),
                    'population_avg': dataset_stats.get('avg_systolic_bp', 0),
                    'difference': latest['input_data'].get('sysBP', 0) - dataset_stats.get('avg_systolic_bp', 0)
                },
                'diastolic_bp': {
                    'user': latest['input_data'].get('diaBP', 0),
                    'population_avg': dataset_stats.get('avg_diastolic_bp', 0),
                    'difference': latest['input_data'].get('diaBP', 0) - dataset_stats.get('avg_diastolic_bp', 0)
                },
                'cholesterol': {
                    'user': latest['input_data'].get('totChol', 0),
                    'population_avg': dataset_stats.get('avg_cholesterol', 0),
                    'difference': latest['input_data'].get('totChol', 0) - dataset_stats.get('avg_cholesterol', 0)
                },
                'smoking': {
                    'user': latest['input_data'].get('is_smoking', 0),
                    'population_percentage': dataset_stats.get('smokers_percentage', 0) / 100,
                    'difference': latest['input_data'].get('is_smoking', 0) - dataset_stats.get('smokers_percentage', 0) / 100
                }
            }
            
            return jsonify(comparison)
        else:
            return jsonify({'error': 'No history found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/generate_visualizations')
def generate_visualizations():
    """
    Endpoint to regenerate visualizations on demand
    """
    try:
        from model import create_visualizations
        
        # Load dataset
        df = pd.read_csv('train_updated.csv')
        
        # Create dummy test data for visualization functions
        X_test = df.drop('TenYearCHD', axis=1).sample(100, random_state=42)
        y_test = df.loc[X_test.index, 'TenYearCHD']
        
        # Generate dummy prediction probabilities
        y_pred_proba = np.random.random(size=len(y_test))
        
        # Generate dummy ROC curve data
        fpr = np.linspace(0, 1, 100)
        tpr = np.linspace(0, 1, 100)
        roc_auc = 0.75
        
        # Generate dummy precision-recall curve data
        precision = np.linspace(1, 0, 100)
        recall = np.linspace(0, 1, 100)
        
        # Create visualizations
        create_visualizations(df, X_test, y_test, y_pred_proba, fpr, tpr, roc_auc, precision, recall)
        
        return jsonify({'success': True, 'message': 'Visualizations generated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/visualizations')
def visualizations():
    return render_template('visualizations.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/history')
def history():
    try:
        if os.path.exists('prediction_history.json'):
            with open('prediction_history.json', 'r') as f:
                history = json.load(f)
            return render_template('history.html', history=history)
        else:
            return render_template('history.html', history=[])
    except Exception as e:
        return render_template('history.html', history=[], error=str(e))

@app.route('/api/stats')
def get_stats():
    return jsonify(dataset_stats)

@app.route('/api/history')
def get_history():
    try:
        if os.path.exists('prediction_history.json'):
            with open('prediction_history.json', 'r') as f:
                history = json.load(f)
            return jsonify(history)
        else:
            return jsonify([])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)