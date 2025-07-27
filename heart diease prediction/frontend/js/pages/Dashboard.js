// Dashboard.js - Dashboard page component
const Dashboard = () => {
    // In a real application, this data would come from an API
    const [stats, setStats] = React.useState({
        total_records: 4240,
        positive_rate: 0.15,
        positive_cases: 636,
        negative_cases: 3604,
        avg_age: 49.6,
        smokers_percentage: 38.5,
        avg_systolic_bp: 132.4,
        avg_diastolic_bp: 82.9,
        avg_cholesterol: 236.8
    });
    
    const [loading, setLoading] = React.useState(false);
    
    // In a real application, you would fetch the data from an API
    React.useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        // Example of how the API call would look:
        // const fetchStats = async () => {
        //     try {
        //         const response = await fetch('/api/stats');
        //         const data = await response.json();
        //         setStats(data);
        //     } catch (error) {
        //         console.error('Error fetching stats:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // 
        // fetchStats();
    }, []);
    
    // Initialize tooltips when component mounts
    React.useEffect(() => {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Set the width of the smokers percentage progress bar dynamically
        const smokersPercentageBar = document.getElementById('smokers-percentage-bar');
        if (smokersPercentageBar) {
            smokersPercentageBar.style.width = stats.smokers_percentage + '%';
        }
        
        // Set the width of the positive rate progress bar dynamically
        const positiveRateBar = document.getElementById('positive-rate-bar');
        if (positiveRateBar) {
            positiveRateBar.style.width = (stats.positive_rate * 100) + '%';
        }
    }, [stats]);
    
    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading dashboard data...</p>
            </div>
        );
    }
    
    return (
        <>
            <div className="header text-center">
                <h1><i className="bi bi-speedometer2"></i> Heart Disease Dashboard</h1>
                <p>Key metrics and insights from the heart disease dataset</p>
            </div>
            
            {/* Key Metrics */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <i className="bi bi-people"></i> Total Records
                        </div>
                        <div className="card-body text-center">
                            <div className="dashboard-value">{stats.total_records}</div>
                            <div className="dashboard-label">Participants</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <i className="bi bi-heart"></i> Heart Disease Rate
                        </div>
                        <div className="card-body text-center">
                            <div className="dashboard-value">{(stats.positive_rate * 100).toFixed(1)}%</div>
                            <div className="dashboard-label">Positive Cases</div>
                            <div className="progress">
                                <div className="progress-bar bg-danger" role="progressbar" 
                                     id="positive-rate-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <i className="bi bi-gender-ambiguous"></i> Average Age
                        </div>
                        <div className="card-body text-center">
                            <div className="dashboard-value">{stats.avg_age.toFixed(1)}</div>
                            <div className="dashboard-label">Years</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <i className="bi bi-lungs"></i> Smokers
                        </div>
                        <div className="card-body text-center">
                            <div className="dashboard-value">{stats.smokers_percentage.toFixed(1)}%</div>
                            <div className="dashboard-label">of Participants</div>
                            <div className="progress">
                                <div className="progress-bar bg-danger" role="progressbar" 
                                     id="smokers-percentage-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Health Metrics */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="content-container">
                        <h4 className="mb-3"><i className="bi bi-clipboard2-pulse"></i> Health Metrics</h4>
                        
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Blood Pressure</h5>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-0 text-muted">Systolic (avg)</p>
                                                <h3>{stats.avg_systolic_bp.toFixed(1)} <small className="text-muted">mmHg</small></h3>
                                            </div>
                                            <div>
                                                <p className="mb-0 text-muted">Diastolic (avg)</p>
                                                <h3>{stats.avg_diastolic_bp.toFixed(1)} <small className="text-muted">mmHg</small></h3>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="mb-1 small">Systolic BP Classification:</p>
                                            <div className="progress mb-2" style={{ height: '10px' }}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '25%' }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="Normal: <120 mmHg"></div>
                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '15%' }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="Elevated: 120-129 mmHg"></div>
                                                <div className="progress-bar bg-danger" role="progressbar" style={{ width: '60%' }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="Hypertension: >130 mmHg"></div>
                                            </div>
                                            <div className="d-flex justify-content-between small text-muted">
                                                <span>Normal</span>
                                                <span>Elevated</span>
                                                <span>Hypertension</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Cholesterol</h5>
                                        <div className="text-center">
                                            <p className="mb-0 text-muted">Total Cholesterol (avg)</p>
                                            <h3>{stats.avg_cholesterol.toFixed(1)} <small className="text-muted">mg/dL</small></h3>
                                        </div>
                                        <div className="mt-3">
                                            <p className="mb-1 small">Cholesterol Classification:</p>
                                            <div className="progress mb-2" style={{ height: '10px' }}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '40%' }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="Desirable: <200 mg/dL"></div>
                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '20%' }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="Borderline: 200-239 mg/dL"></div>
                                                <div className="progress-bar bg-danger" role="progressbar" style={{ width: '40%' }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="High: >240 mg/dL"></div>
                                            </div>
                                            <div className="d-flex justify-content-between small text-muted">
                                                <span>Desirable</span>
                                                <span>Borderline</span>
                                                <span>High</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Risk Distribution</h5>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-0 text-muted">Low Risk</p>
                                                <h3>{stats.negative_cases} <small className="text-muted">cases</small></h3>
                                            </div>
                                            <div>
                                                <p className="mb-0 text-muted">High Risk</p>
                                                <h3>{stats.positive_cases} <small className="text-muted">cases</small></h3>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="mb-1 small">Risk Distribution:</p>
                                            <div className="progress mb-2" style={{ height: '20px' }}>
                                                <div className="progress-bar bg-success" role="progressbar" 
                                                     style={{ width: `${((1 - stats.positive_rate) * 100).toFixed(1)}%` }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="Low Risk">
                                                    {((1 - stats.positive_rate) * 100).toFixed(1)}%
                                                </div>
                                                <div className="progress-bar bg-danger" role="progressbar" 
                                                     style={{ width: `${(stats.positive_rate * 100).toFixed(1)}%` }} 
                                                     data-bs-toggle="tooltip" data-bs-placement="top" title="High Risk">
                                                    {(stats.positive_rate * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Visualizations */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-graph-up"></i> Age Distribution</h4>
                        <img src="images/age_distribution.png" alt="Age Distribution" className="viz-img" />
                        <p className="mt-2">Age distribution by heart disease risk shows that older individuals tend to have a higher risk of developing heart disease.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-graph-up"></i> Blood Pressure Analysis</h4>
                        <img src="images/blood_pressure.png" alt="Blood Pressure Analysis" className="viz-img" />
                        <p className="mt-2">Relationship between systolic and diastolic blood pressure, colored by heart disease risk. Higher blood pressure is associated with increased risk.</p>
                    </div>
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-graph-up"></i> Smoking Impact</h4>
                        <img src="images/smoking_status.png" alt="Smoking Impact" className="viz-img" />
                        <p className="mt-2">Impact of smoking status on heart disease risk. Smoking is a significant risk factor for heart disease.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-graph-up"></i> Feature Importance</h4>
                        <img src="images/feature_importance.png" alt="Feature Importance" className="viz-img" />
                        <p className="mt-2">Most important features in predicting heart disease risk according to our machine learning model.</p>
                    </div>
                </div>
            </div>
            
            {/* Model Performance */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="content-container">
                        <h4 className="mb-3"><i className="bi bi-cpu"></i> Model Performance</h4>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Accuracy Metrics</h5>
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <div className="text-center mb-3">
                                                    <h6 className="text-muted">Accuracy</h6>
                                                    <div className="display-6 fw-bold text-primary">86.5%</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-center mb-3">
                                                    <h6 className="text-muted">F1 Score</h6>
                                                    <div className="display-6 fw-bold text-primary">0.78</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-center">
                                                    <h6 className="text-muted">Precision</h6>
                                                    <div className="display-6 fw-bold text-primary">0.82</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-center">
                                                    <h6 className="text-muted">Recall</h6>
                                                    <div className="display-6 fw-bold text-primary">0.75</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Confusion Matrix</h5>
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <div className="text-center p-3 bg-success bg-opacity-10 border border-success rounded m-1">
                                                    <h6>True Negative</h6>
                                                    <div className="display-6 fw-bold">721</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-center p-3 bg-danger bg-opacity-10 border border-danger rounded m-1">
                                                    <h6>False Positive</h6>
                                                    <div className="display-6 fw-bold">28</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-center p-3 bg-danger bg-opacity-10 border border-danger rounded m-1">
                                                    <h6>False Negative</h6>
                                                    <div className="display-6 fw-bold">42</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-center p-3 bg-success bg-opacity-10 border border-success rounded m-1">
                                                    <h6>True Positive</h6>
                                                    <div className="display-6 fw-bold">127</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};