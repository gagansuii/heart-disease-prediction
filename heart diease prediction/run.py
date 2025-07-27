"""
Heart Disease Prediction Application Runner

This script checks if the model exists, trains it if needed, and then starts the Flask application.
"""

import os
import sys

def main():
    print("Heart Disease Prediction Application")
    print("====================================")
    
    # Check if model exists
    if not os.path.exists('heart_disease_model.pkl'):
        print("Model not found. Training new model...")
        try:
            from model import train_model
            model = train_model()
            print("Model trained successfully!")
        except Exception as e:
            print(f"Error training model: {e}")
            return 1
    else:
        print("Using existing model.")
    
    # Start Flask application
    print("Starting web application...")
    try:
        from app import app
        app.run(debug=True)
    except Exception as e:
        print(f"Error starting application: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())