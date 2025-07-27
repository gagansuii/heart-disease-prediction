import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_curve, auc, precision_recall_curve
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
import os
import json

def load_and_preprocess_data(file_path='train_updated.csv'):
    """
    Load and preprocess the heart disease dataset
    
    Args:
        file_path: Path to the CSV file containing the dataset
        
    Returns:
        X_train, X_test, y_train, y_test, df: Training and test data, and the full dataframe
    """
    # Load the dataset
    df = pd.read_csv(file_path)
    
    # Drop the ID column as it's not a feature
    df = df.drop('id', axis=1)
    
    # Separate features and target
    X = df.drop('TenYearCHD', axis=1)
    y = df['TenYearCHD']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    return X_train, X_test, y_train, y_test, df

def create_preprocessing_pipeline():
    """
    Create a preprocessing pipeline for the heart disease dataset
    
    Returns:
        preprocessor: A ColumnTransformer for preprocessing the data
    """
    # Define categorical and numerical features
    categorical_features = ['education', 'sex', 'is_smoking', 'prevalentStroke', 'prevalentHyp', 'diabetes']
    numerical_features = ['age', 'cigsPerDay', 'BPMeds', 'totChol', 'sysBP', 'diaBP', 'BMI', 'heartRate', 'glucose']
    
    # Create transformers for categorical and numerical features
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    numerical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    # Combine transformers using ColumnTransformer
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    return preprocessor

def train_model(perform_grid_search=False):
    """
    Train a machine learning model for heart disease prediction
    
    Args:
        perform_grid_search: Whether to perform grid search for hyperparameter tuning
        
    Returns:
        model: The trained model
    """
    print("Loading and preprocessing data...")
    # Load and preprocess data
    X_train, X_test, y_train, y_test, df = load_and_preprocess_data()
    
    # Create preprocessing pipeline
    preprocessor = create_preprocessing_pipeline()
    
    if perform_grid_search:
        print("Performing grid search for hyperparameter tuning...")
        # Define the parameter grid
        param_grid = {
            'classifier__n_estimators': [50, 100, 200],
            'classifier__max_depth': [None, 10, 20, 30],
            'classifier__min_samples_split': [2, 5, 10],
            'classifier__min_samples_leaf': [1, 2, 4]
        }
        
        # Create the pipeline
        pipeline = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('classifier', RandomForestClassifier(random_state=42))
        ])
        
        # Perform grid search
        grid_search = GridSearchCV(
            pipeline, param_grid, cv=5, scoring='roc_auc', n_jobs=-1, verbose=1
        )
        
        grid_search.fit(X_train, y_train)
        
        # Get the best parameters
        best_params = grid_search.best_params_
        print(f"Best parameters: {best_params}")
        
        # Create the model with the best parameters
        model = grid_search.best_estimator_
    else:
        print("Training model with default parameters...")
        # Create and train the model with default parameters
        model = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
        ])
        
        model.fit(X_train, y_train)
    
    print("Evaluating model...")
    # Evaluate the model
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)
    conf_matrix = confusion_matrix(y_test, y_pred)
    
    # Calculate ROC curve and AUC
    fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
    roc_auc = auc(fpr, tpr)
    
    # Calculate precision-recall curve
    precision, recall, _ = precision_recall_curve(y_test, y_pred_proba)
    
    # Print evaluation metrics
    print(f"Model Accuracy: {accuracy:.4f}")
    print(f"ROC AUC: {roc_auc:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    print("\nConfusion Matrix:")
    print(conf_matrix)
    
    # Save evaluation metrics
    evaluation = {
        'accuracy': float(accuracy),
        'roc_auc': float(roc_auc),
        'precision': float(report['1']['precision']),
        'recall': float(report['1']['recall']),
        'f1_score': float(report['1']['f1-score']),
        'confusion_matrix': conf_matrix.tolist(),
        'classification_report': report
    }
    
    # Save evaluation metrics to a JSON file
    with open('model_evaluation.json', 'w') as f:
        json.dump(evaluation, f, indent=4)
    
    print("Saving model...")
    # Save the model
    joblib.dump(model, 'heart_disease_model.pkl')
    
    print("Creating visualizations...")
    # Create visualizations
    create_visualizations(df, X_test, y_test, y_pred_proba, fpr, tpr, roc_auc, precision, recall)
    
    return model

def create_visualizations(df, X_test, y_test, y_pred_proba, fpr, tpr, roc_auc, precision, recall):
    """
    Create visualizations for the heart disease dataset and model evaluation
    
    Args:
        df: The full dataframe
        X_test: Test features
        y_test: Test labels
        y_pred_proba: Predicted probabilities
        fpr: False positive rate for ROC curve
        tpr: True positive rate for ROC curve
        roc_auc: Area under the ROC curve
        precision: Precision values for precision-recall curve
        recall: Recall values for precision-recall curve
    """
    # Create directories for visualizations
    if not os.path.exists('static'):
        os.makedirs('static')
    if not os.path.exists('static/images'):
        os.makedirs('static/images')
    
    # Set the style for all plots
    sns.set_style('whitegrid')
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.sans-serif'] = ['Arial']
    plt.rcParams['axes.labelsize'] = 12
    plt.rcParams['axes.titlesize'] = 14
    plt.rcParams['xtick.labelsize'] = 10
    plt.rcParams['ytick.labelsize'] = 10
    
    # 1. Age distribution by heart disease
    plt.figure(figsize=(10, 6))
    sns.histplot(data=df, x='age', hue='TenYearCHD', kde=True, bins=20, palette=['#4CAF50', '#F44336'])
    plt.title('Age Distribution by Heart Disease Risk')
    plt.xlabel('Age')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('static/age_distribution.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 2. Correlation heatmap
    plt.figure(figsize=(12, 10))
    numeric_df = df.select_dtypes(include=[np.number])
    correlation = numeric_df.corr()
    mask = np.triu(correlation)
    cmap = sns.diverging_palette(230, 20, as_cmap=True)
    sns.heatmap(correlation, annot=True, cmap=cmap, fmt='.2f', mask=mask, linewidths=0.5)
    plt.title('Correlation Heatmap of Numerical Features')
    plt.tight_layout()
    plt.savefig('static/correlation_heatmap.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 3. Blood pressure by heart disease
    plt.figure(figsize=(10, 6))
    scatter = sns.scatterplot(data=df, x='sysBP', y='diaBP', hue='TenYearCHD', 
                             palette=['#4CAF50', '#F44336'], alpha=0.7, s=80)
    plt.title('Blood Pressure by Heart Disease Risk')
    plt.xlabel('Systolic Blood Pressure (mmHg)')
    plt.ylabel('Diastolic Blood Pressure (mmHg)')
    
    # Add a line for hypertension threshold
    plt.axhline(y=90, color='#FF9800', linestyle='--', alpha=0.7, label='Hypertension Threshold (90 mmHg)')
    plt.axvline(x=140, color='#FF9800', linestyle='--', alpha=0.7, label='Hypertension Threshold (140 mmHg)')
    
    # Add legend
    handles, labels = scatter.get_legend_handles_labels()
    plt.legend(handles=handles, labels=['No Heart Disease', 'Heart Disease', 'Hypertension Threshold'])
    
    plt.tight_layout()
    plt.savefig('static/blood_pressure.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 4. Feature importance
    try:
        model = joblib.load('heart_disease_model.pkl')
        feature_names = model.named_steps['preprocessor'].get_feature_names_out()
        importances = model.named_steps['classifier'].feature_importances_
        
        # Sort features by importance
        indices = np.argsort(importances)[-10:]  # Top 10 features
        
        plt.figure(figsize=(10, 8))
        plt.barh(range(len(indices)), importances[indices], align='center', color='#2196F3')
        plt.yticks(range(len(indices)), [feature_names[i] for i in indices])
        plt.xlabel('Relative Importance')
        plt.title('Top 10 Most Important Features for Heart Disease Prediction')
        plt.tight_layout()
        plt.savefig('static/feature_importance.png', dpi=300, bbox_inches='tight')
        plt.close()
    except Exception as e:
        print(f"Could not create feature importance plot: {e}")
    
    # 5. Smoking status by heart disease
    plt.figure(figsize=(10, 6))
    smoking_chd = pd.crosstab(df['is_smoking'], df['TenYearCHD'])
    smoking_chd.columns = ['No Heart Disease', 'Heart Disease']
    smoking_chd.index = ['Non-Smoker', 'Smoker']
    
    ax = smoking_chd.plot(kind='bar', stacked=True, color=['#4CAF50', '#F44336'])
    
    # Add percentage labels
    for i, (no_hd, hd) in enumerate(zip(smoking_chd['No Heart Disease'], smoking_chd['Heart Disease'])):
        total = no_hd + hd
        pct_no_hd = no_hd / total * 100
        pct_hd = hd / total * 100
        
        ax.text(i, no_hd/2, f"{pct_no_hd:.1f}%", ha='center', va='center', color='white', fontweight='bold')
        ax.text(i, no_hd + hd/2, f"{pct_hd:.1f}%", ha='center', va='center', color='white', fontweight='bold')
    
    plt.title('Smoking Status by Heart Disease Risk')
    plt.xlabel('Smoking Status')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('static/smoking_status.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 6. ROC Curve
    plt.figure(figsize=(8, 8))
    plt.plot(fpr, tpr, color='#2196F3', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
    plt.plot([0, 1], [0, 1], color='#9E9E9E', lw=2, linestyle='--', label='Random Guess')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend(loc='lower right')
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.savefig('static/roc_curve.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 7. Precision-Recall Curve
    plt.figure(figsize=(8, 8))
    plt.plot(recall, precision, color='#FF9800', lw=2)
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.title('Precision-Recall Curve')
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.savefig('static/precision_recall_curve.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 8. Age vs. Cholesterol by Heart Disease
    plt.figure(figsize=(10, 6))
    scatter = sns.scatterplot(data=df, x='age', y='totChol', hue='TenYearCHD', 
                             palette=['#4CAF50', '#F44336'], alpha=0.7, s=80)
    plt.title('Age vs. Total Cholesterol by Heart Disease Risk')
    plt.xlabel('Age')
    plt.ylabel('Total Cholesterol (mg/dL)')
    
    # Add a line for high cholesterol threshold
    plt.axhline(y=240, color='#FF9800', linestyle='--', alpha=0.7, label='High Cholesterol Threshold (240 mg/dL)')
    
    # Add legend
    handles, labels = scatter.get_legend_handles_labels()
    plt.legend(handles=handles, labels=['No Heart Disease', 'Heart Disease', 'High Cholesterol Threshold'])
    
    plt.tight_layout()
    plt.savefig('static/age_vs_cholesterol.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 9. BMI Distribution by Heart Disease
    plt.figure(figsize=(10, 6))
    sns.histplot(data=df, x='BMI', hue='TenYearCHD', kde=True, bins=20, palette=['#4CAF50', '#F44336'])
    
    # Add vertical lines for BMI categories
    plt.axvline(x=18.5, color='#2196F3', linestyle='--', alpha=0.7, label='Underweight/Normal')
    plt.axvline(x=25, color='#FF9800', linestyle='--', alpha=0.7, label='Normal/Overweight')
    plt.axvline(x=30, color='#F44336', linestyle='--', alpha=0.7, label='Overweight/Obese')
    
    plt.title('BMI Distribution by Heart Disease Risk')
    plt.xlabel('Body Mass Index (BMI)')
    plt.ylabel('Count')
    plt.legend(title='Heart Disease Risk')
    plt.tight_layout()
    plt.savefig('static/bmi_distribution.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 10. Diabetes and Heart Disease
    plt.figure(figsize=(8, 6))
    diabetes_chd = pd.crosstab(df['diabetes'], df['TenYearCHD'])
    diabetes_chd.columns = ['No Heart Disease', 'Heart Disease']
    diabetes_chd.index = ['No Diabetes', 'Diabetes']
    
    ax = diabetes_chd.plot(kind='bar', stacked=True, color=['#4CAF50', '#F44336'])
    
    # Add percentage labels
    for i, (no_hd, hd) in enumerate(zip(diabetes_chd['No Heart Disease'], diabetes_chd['Heart Disease'])):
        total = no_hd + hd
        pct_no_hd = no_hd / total * 100
        pct_hd = hd / total * 100
        
        ax.text(i, no_hd/2, f"{pct_no_hd:.1f}%", ha='center', va='center', color='white', fontweight='bold')
        ax.text(i, no_hd + hd/2, f"{pct_hd:.1f}%", ha='center', va='center', color='white', fontweight='bold')
    
    plt.title('Diabetes Status by Heart Disease Risk')
    plt.xlabel('Diabetes Status')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('static/diabetes_heart_disease.png', dpi=300, bbox_inches='tight')
    plt.close()

if __name__ == "__main__":
    train_model(perform_grid_search=False)