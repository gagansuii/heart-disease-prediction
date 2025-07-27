import pandas as pd

# Load the dataset
df = pd.read_csv('train_updated.csv')

# Print basic information
print(f"Dataset shape: {df.shape}")
print("\nColumn names:")
for col in df.columns:
    print(f"- {col}")

print("\nMissing values:")
print(df.isnull().sum())

print("\nTarget variable distribution:")
print(df['TenYearCHD'].value_counts())