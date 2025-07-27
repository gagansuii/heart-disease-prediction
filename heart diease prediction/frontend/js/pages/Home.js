// Home.js - Home page component (Prediction Tool)
const Home = () => {
    const [formData, setFormData] = React.useState({
        age: '',
        sex: '1',
        education: '1',
        is_smoking: '0',
        cigsPerDay: '0',
        BPMeds: '0',
        prevalentStroke: '0',
        prevalentHyp: '0',
        diabetes: '0',
        totChol: '',
        sysBP: '',
        diaBP: '',
        BMI: '',
        heartRate: '',
        glucose: ''
    });
    
    const [prediction, setPrediction] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Handle cigarettes per day field visibility
        if (name === 'is_smoking' && value === '0') {
            setFormData({
                ...formData,
                is_smoking: '0',
                cigsPerDay: '0'
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);
        
        try {
            // In a real application, this would be an API call
            // For now, we'll simulate a prediction
            setTimeout(() => {
                const randomProbability = Math.random();
                setPrediction({
                    prediction: randomProbability > 0.5 ? 1 : 0,
                    probability: randomProbability
                });
                setLoading(false);
            }, 1500);
            
            // Example of how the API call would look:
            // const response = await fetch('/api/predict', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            // 
            // if (!response.ok) {
            //     throw new Error('Failed to get prediction');
            // }
            // 
            // const data = await response.json();
            // setPrediction(data);
        } catch (err) {
            setError('An error occurred while making the prediction. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const resetForm = () => {
        setFormData({
            age: '',
            sex: '1',
            education: '1',
            is_smoking: '0',
            cigsPerDay: '0',
            BPMeds: '0',
            prevalentStroke: '0',
            prevalentHyp: '0',
            diabetes: '0',
            totChol: '',
            sysBP: '',
            diaBP: '',
            BMI: '',
            heartRate: '',
            glucose: ''
        });
        setPrediction(null);
        setError(null);
    };
    
    return (
        <div className="row">
            <div className="col-lg-8 mx-auto">
                <div className="content-container">
                    <h3 className="mb-4"><i className="bi bi-calculator"></i> Heart Disease Risk Calculator</h3>
                    
                    {error && (
                        <div className="alert alert-danger">
                            <i className="bi bi-exclamation-triangle"></i> {error}
                        </div>
                    )}
                    
                    {!prediction ? (
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h5><i className="bi bi-person"></i> Personal Information</h5>
                                    <hr />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="age" 
                                        name="age" 
                                        value={formData.age} 
                                        onChange={handleInputChange} 
                                        min="20" 
                                        max="100" 
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="sex" className="form-label">Sex</label>
                                    <select 
                                        className="form-select" 
                                        id="sex" 
                                        name="sex" 
                                        value={formData.sex} 
                                        onChange={handleInputChange} 
                                        required
                                    >
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="education" className="form-label">Education Level</label>
                                    <select 
                                        className="form-select" 
                                        id="education" 
                                        name="education" 
                                        value={formData.education} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Some High School</option>
                                        <option value="2">High School or GED</option>
                                        <option value="3">Some College or Vocational School</option>
                                        <option value="4">College</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h5><i className="bi bi-clipboard2-pulse"></i> Medical History</h5>
                                    <hr />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="prevalentStroke" className="form-label">Previous Stroke</label>
                                    <select 
                                        className="form-select" 
                                        id="prevalentStroke" 
                                        name="prevalentStroke" 
                                        value={formData.prevalentStroke} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="prevalentHyp" className="form-label">Hypertension</label>
                                    <select 
                                        className="form-select" 
                                        id="prevalentHyp" 
                                        name="prevalentHyp" 
                                        value={formData.prevalentHyp} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="diabetes" className="form-label">Diabetes</label>
                                    <select 
                                        className="form-select" 
                                        id="diabetes" 
                                        name="diabetes" 
                                        value={formData.diabetes} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="BPMeds" className="form-label">BP Medication</label>
                                    <select 
                                        className="form-select" 
                                        id="BPMeds" 
                                        name="BPMeds" 
                                        value={formData.BPMeds} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h5><i className="bi bi-heart-pulse"></i> Clinical Measurements</h5>
                                    <hr />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="sysBP" className="form-label">Systolic BP (mmHg)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="sysBP" 
                                        name="sysBP" 
                                        value={formData.sysBP} 
                                        onChange={handleInputChange} 
                                        min="80" 
                                        max="300" 
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="diaBP" className="form-label">Diastolic BP (mmHg)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="diaBP" 
                                        name="diaBP" 
                                        value={formData.diaBP} 
                                        onChange={handleInputChange} 
                                        min="40" 
                                        max="150" 
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="totChol" className="form-label">Total Cholesterol (mg/dL)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="totChol" 
                                        name="totChol" 
                                        value={formData.totChol} 
                                        onChange={handleInputChange} 
                                        min="100" 
                                        max="600" 
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="BMI" className="form-label">BMI (kg/m²)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="BMI" 
                                        name="BMI" 
                                        value={formData.BMI} 
                                        onChange={handleInputChange} 
                                        min="15" 
                                        max="50" 
                                        step="0.1" 
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="heartRate" className="form-label">Heart Rate (bpm)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="heartRate" 
                                        name="heartRate" 
                                        value={formData.heartRate} 
                                        onChange={handleInputChange} 
                                        min="40" 
                                        max="200" 
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="glucose" className="form-label">Glucose (mg/dL)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="glucose" 
                                        name="glucose" 
                                        value={formData.glucose} 
                                        onChange={handleInputChange} 
                                        min="40" 
                                        max="400" 
                                    />
                                </div>
                            </div>
                            
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h5><i className="bi bi-lungs"></i> Lifestyle Factors</h5>
                                    <hr />
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="is_smoking" className="form-label">Smoking Status</label>
                                    <select 
                                        className="form-select" 
                                        id="is_smoking" 
                                        name="is_smoking" 
                                        value={formData.is_smoking} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="0">Non-smoker</option>
                                        <option value="1">Smoker</option>
                                    </select>
                                </div>
                                
                                {formData.is_smoking === '1' && (
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cigsPerDay" className="form-label">Cigarettes Per Day</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="cigsPerDay" 
                                            name="cigsPerDay" 
                                            value={formData.cigsPerDay} 
                                            onChange={handleInputChange} 
                                            min="1" 
                                            max="100" 
                                            required={formData.is_smoking === '1'} 
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" className="btn btn-outline-secondary me-md-2" onClick={resetForm}>
                                    <i className="bi bi-arrow-counterclockwise"></i> Reset
                                </button>
                                <button type="submit" className="btn btn-danger" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-heart-pulse"></i> Predict Risk
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className={`result-container ${prediction.prediction === 1 ? 'high-risk' : 'low-risk'}`}>
                                <h3>
                                    {prediction.prediction === 1 ? (
                                        <><i className="bi bi-exclamation-triangle"></i> High Risk</>
                                    ) : (
                                        <><i className="bi bi-shield-check"></i> Low Risk</>
                                    )}
                                </h3>
                                <p className="lead">
                                    {prediction.prediction === 1 
                                        ? "You have a higher risk of developing coronary heart disease in the next 10 years." 
                                        : "You have a lower risk of developing coronary heart disease in the next 10 years."}
                                </p>
                                <div className="progress mb-3" style={{ height: '25px' }}>
                                    <div 
                                        className={`progress-bar ${prediction.prediction === 1 ? 'bg-danger' : 'bg-success'}`} 
                                        role="progressbar" 
                                        style={{ width: `${prediction.probability * 100}%` }} 
                                        aria-valuenow={prediction.probability * 100} 
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
                                    >
                                        {(prediction.probability * 100).toFixed(1)}%
                                    </div>
                                </div>
                                <p>
                                    <strong>Risk Probability:</strong> {(prediction.probability * 100).toFixed(1)}%
                                </p>
                                
                                <div className="mt-4">
                                    <button className="btn btn-outline-secondary me-2" onClick={resetForm}>
                                        <i className="bi bi-arrow-counterclockwise"></i> Start Over
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <h4>What does this mean?</h4>
                                <p>
                                    This prediction is based on the Framingham Heart Study data and indicates your estimated 10-year risk of developing coronary heart disease (CHD).
                                </p>
                                <div className="alert alert-warning">
                                    <i className="bi bi-info-circle"></i> This tool is for educational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};