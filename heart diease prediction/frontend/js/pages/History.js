// History.js - History page component
const History = () => {
    // In a real application, this data would come from an API
    const [history, setHistory] = React.useState([
        {
            id: 1,
            timestamp: "2023-11-15 14:32:45",
            input_data: {
                age: 45,
                sex: 1,
                education: 3,
                is_smoking: 1,
                cigsPerDay: 10,
                BPMeds: 0,
                prevalentStroke: 0,
                prevalentHyp: 1,
                diabetes: 0,
                totChol: 210,
                sysBP: 140,
                diaBP: 90,
                BMI: 28.5,
                heartRate: 75,
                glucose: 95
            },
            prediction: 1,
            probability: 0.78
        },
        {
            id: 2,
            timestamp: "2023-11-14 09:15:22",
            input_data: {
                age: 38,
                sex: 0,
                education: 4,
                is_smoking: 0,
                cigsPerDay: 0,
                BPMeds: 0,
                prevalentStroke: 0,
                prevalentHyp: 0,
                diabetes: 0,
                totChol: 185,
                sysBP: 120,
                diaBP: 80,
                BMI: 24.2,
                heartRate: 68,
                glucose: 85
            },
            prediction: 0,
            probability: 0.15
        },
        {
            id: 3,
            timestamp: "2023-11-13 16:45:10",
            input_data: {
                age: 62,
                sex: 1,
                education: 2,
                is_smoking: 1,
                cigsPerDay: 20,
                BPMeds: 1,
                prevalentStroke: 0,
                prevalentHyp: 1,
                diabetes: 1,
                totChol: 245,
                sysBP: 160,
                diaBP: 95,
                BMI: 31.8,
                heartRate: 82,
                glucose: 130
            },
            prediction: 1,
            probability: 0.92
        }
    ]);
    
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [selectedRecord, setSelectedRecord] = React.useState(null);
    
    // In a real application, you would fetch the data from an API
    React.useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        // Example of how the API call would look:
        // const fetchHistory = async () => {
        //     try {
        //         const response = await fetch('/api/history');
        //         const data = await response.json();
        //         setHistory(data);
        //     } catch (error) {
        //         setError('Failed to load prediction history. Please try again later.');
        //         console.error('Error fetching history:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // 
        // fetchHistory();
    }, []);
    
    const clearHistory = () => {
        // In a real application, this would make an API call to clear the history
        setHistory([]);
        
        // Example of how the API call would look:
        // const clearHistoryData = async () => {
        //     try {
        //         const response = await fetch('/api/history/clear', {
        //             method: 'POST',
        //         });
        //         
        //         if (response.ok) {
        //             setHistory([]);
        //         } else {
        //             setError('Failed to clear history. Please try again later.');
        //         }
        //     } catch (error) {
        //         setError('Failed to clear history. Please try again later.');
        //         console.error('Error clearing history:', error);
        //     }
        // };
        // 
        // clearHistoryData();
    };
    
    const viewRecordDetails = (record) => {
        setSelectedRecord(record);
        const modal = new bootstrap.Modal(document.getElementById('recordDetailsModal'));
        modal.show();
    };
    
    const showClearHistoryModal = () => {
        const modal = new bootstrap.Modal(document.getElementById('clearHistoryModal'));
        modal.show();
    };
    
    // Helper function to get education level text
    const getEducationLevel = (level) => {
        const educationLevels = {
            '1': 'Some High School',
            '2': 'High School or GED',
            '3': 'Some College or Vocational School',
            '4': 'College'
        };
        return level ? educationLevels[level] : 'Not specified';
    };
    
    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading prediction history...</p>
            </div>
        );
    }
    
    return (
        <>
            <div className="header text-center">
                <h1><i className="bi bi-clock-history"></i> Prediction History</h1>
                <p>Record of previous heart disease risk predictions</p>
            </div>
            
            <div className="content-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3><i className="bi bi-list-check"></i> Prediction Records</h3>
                    <div>
                        <button 
                            className="btn btn-outline-danger" 
                            onClick={showClearHistoryModal}
                            disabled={history.length === 0}
                        >
                            <i className="bi bi-trash"></i> Clear History
                        </button>
                    </div>
                </div>
                
                {error && (
                    <div className="alert alert-danger">
                        <i className="bi bi-exclamation-triangle"></i> Error: {error}
                    </div>
                )}
                
                {history.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-danger">
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Age</th>
                                    <th>Sex</th>
                                    <th>Key Risk Factors</th>
                                    <th>Prediction</th>
                                    <th>Probability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map(record => (
                                    <tr key={record.id}>
                                        <td>{record.timestamp}</td>
                                        <td>{record.input_data.age}</td>
                                        <td>{record.input_data.sex === 1 ? "Male" : "Female"}</td>
                                        <td>
                                            <ul className="list-unstyled mb-0">
                                                {record.input_data.is_smoking === 1 && (
                                                    <li><span className="badge bg-danger">Smoker</span></li>
                                                )}
                                                {record.input_data.prevalentHyp === 1 && (
                                                    <li><span className="badge bg-danger">Hypertension</span></li>
                                                )}
                                                {record.input_data.diabetes === 1 && (
                                                    <li><span className="badge bg-danger">Diabetes</span></li>
                                                )}
                                                {record.input_data.prevalentStroke === 1 && (
                                                    <li><span className="badge bg-danger">Previous Stroke</span></li>
                                                )}
                                            </ul>
                                        </td>
                                        <td>
                                            {record.prediction === 1 ? (
                                                <span className="badge bg-danger">High Risk</span>
                                            ) : (
                                                <span className="badge bg-success">Low Risk</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="progress" style={{ height: '20px' }}>
                                                <div 
                                                    className={`progress-bar ${record.prediction === 1 ? 'bg-danger' : 'bg-success'}`} 
                                                    role="progressbar" 
                                                    style={{ width: `${record.probability * 100}%` }} 
                                                    aria-valuenow={record.probability * 100} 
                                                    aria-valuemin="0" 
                                                    aria-valuemax="100"
                                                >
                                                    {(record.probability * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-primary" 
                                                onClick={() => viewRecordDetails(record)}
                                            >
                                                <i className="bi bi-eye"></i> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <div className="alert alert-info">
                            <i className="bi bi-info-circle"></i> No prediction history found. Make a prediction to see it here.
                        </div>
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-danger"
                                onClick={() => window.location.href = '/'}
                            >
                                <i className="bi bi-calculator"></i> Make a Prediction
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Record Details Modal */}
            <div className="modal fade" id="recordDetailsModal" tabIndex="-1" aria-labelledby="recordDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="recordDetailsModalLabel">Prediction Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {selectedRecord && (
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Personal Information</h6>
                                        <table className="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <th>Age:</th>
                                                    <td>{selectedRecord.input_data.age}</td>
                                                </tr>
                                                <tr>
                                                    <th>Sex:</th>
                                                    <td>{selectedRecord.input_data.sex === 1 ? 'Male' : 'Female'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Education:</th>
                                                    <td>{getEducationLevel(selectedRecord.input_data.education)}</td>
                                                </tr>
                                                <tr>
                                                    <th>BMI:</th>
                                                    <td>{selectedRecord.input_data.BMI} kg/m²</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        <h6 className="mt-3">Medical History</h6>
                                        <table className="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <th>Previous Stroke:</th>
                                                    <td>{selectedRecord.input_data.prevalentStroke === 1 ? 'Yes' : 'No'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Hypertension:</th>
                                                    <td>{selectedRecord.input_data.prevalentHyp === 1 ? 'Yes' : 'No'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Diabetes:</th>
                                                    <td>{selectedRecord.input_data.diabetes === 1 ? 'Yes' : 'No'}</td>
                                                </tr>
                                                <tr>
                                                    <th>BP Medication:</th>
                                                    <td>{selectedRecord.input_data.BPMeds === 1 ? 'Yes' : 'No'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Clinical Measurements</h6>
                                        <table className="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <th>Systolic BP:</th>
                                                    <td>{selectedRecord.input_data.sysBP} mmHg</td>
                                                </tr>
                                                <tr>
                                                    <th>Diastolic BP:</th>
                                                    <td>{selectedRecord.input_data.diaBP} mmHg</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Cholesterol:</th>
                                                    <td>{selectedRecord.input_data.totChol} mg/dL</td>
                                                </tr>
                                                <tr>
                                                    <th>Heart Rate:</th>
                                                    <td>{selectedRecord.input_data.heartRate} bpm</td>
                                                </tr>
                                                <tr>
                                                    <th>Glucose:</th>
                                                    <td>{selectedRecord.input_data.glucose ? `${selectedRecord.input_data.glucose} mg/dL` : 'Not specified'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        <h6 className="mt-3">Lifestyle Factors</h6>
                                        <table className="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <th>Smoking Status:</th>
                                                    <td>{selectedRecord.input_data.is_smoking === 1 ? 'Smoker' : 'Non-smoker'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Cigarettes Per Day:</th>
                                                    <td>{selectedRecord.input_data.is_smoking === 1 ? `${selectedRecord.input_data.cigsPerDay} per day` : 'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <h6>Prediction Result</h6>
                                    <div className={`alert ${selectedRecord.prediction === 1 ? 'high-risk' : 'low-risk'}`}>
                                        <h5>
                                            {selectedRecord.prediction === 1 
                                                ? 'High Risk of Heart Disease in 10 Years' 
                                                : 'Low Risk of Heart Disease in 10 Years'}
                                        </h5>
                                        <p>Probability: {(selectedRecord.probability * 100).toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Clear History Confirmation Modal */}
            <div className="modal fade" id="clearHistoryModal" tabIndex="-1" aria-labelledby="clearHistoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="clearHistoryModalLabel">Confirm Clear History</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to clear all prediction history? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={() => {
                                    clearHistory();
                                    const modal = bootstrap.Modal.getInstance(document.getElementById('clearHistoryModal'));
                                    modal.hide();
                                }}
                            >
                                Clear History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};