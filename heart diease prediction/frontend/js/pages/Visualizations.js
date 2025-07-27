// Visualizations.js - Visualizations page component
const Visualizations = () => {
    return (
        <>
            <div className="header text-center">
                <h1><i className="bi bi-graph-up"></i> Data Insights</h1>
                <p>Visual exploration of heart disease risk factors and patterns</p>
            </div>
            
            <div className="content-container mb-4">
                <h3 className="mb-3"><i className="bi bi-info-circle"></i> Understanding the Visualizations</h3>
                <p>
                    These visualizations are based on the Framingham Heart Study dataset, which is a long-term ongoing cardiovascular study of residents of Framingham, Massachusetts.
                    The visualizations help to understand the relationships between various risk factors and the development of coronary heart disease (CHD).
                </p>
                <div className="alert alert-info">
                    <i className="bi bi-lightbulb"></i> <strong>Tip:</strong> Click on the visualization sections to explore interactive features and hover over data points for more details.
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-bar-chart"></i> Age Distribution by Heart Disease Risk</h4>
                        <img src="images/age_distribution.png" alt="Age Distribution" className="viz-img" />
                        <div className="mt-3">
                            <h5>Key Insights:</h5>
                            <ul>
                                <li>Risk of heart disease increases significantly with age</li>
                                <li>The highest risk group is between 55-70 years old</li>
                                <li>Men tend to develop heart disease at an earlier age than women</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-heart-pulse"></i> Blood Pressure and Heart Disease</h4>
                        <img src="images/blood_pressure.png" alt="Blood Pressure Analysis" className="viz-img" />
                        <div className="mt-3">
                            <h5>Key Insights:</h5>
                            <ul>
                                <li>Higher systolic and diastolic blood pressure correlate with increased heart disease risk</li>
                                <li>Systolic BP above 140 mmHg shows a strong association with heart disease</li>
                                <li>The combination of high systolic and diastolic BP presents the highest risk</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-gender-ambiguous"></i> Gender Differences in Risk Factors</h4>
                        <img src="images/gender_differences.png" alt="Gender Differences" className="viz-img" />
                        <div className="mt-3">
                            <h5>Key Insights:</h5>
                            <ul>
                                <li>Men have a higher overall risk of heart disease than women</li>
                                <li>Smoking has a more pronounced effect on heart disease risk in men</li>
                                <li>Diabetes appears to be a stronger risk factor for women</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-lungs"></i> Impact of Smoking on Heart Disease</h4>
                        <img src="images/smoking_status.png" alt="Smoking Impact" className="viz-img" />
                        <div className="mt-3">
                            <h5>Key Insights:</h5>
                            <ul>
                                <li>Smokers have approximately twice the risk of heart disease compared to non-smokers</li>
                                <li>The risk increases with the number of cigarettes smoked per day</li>
                                <li>Even light smoking (1-10 cigarettes per day) significantly increases risk</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-droplet"></i> Cholesterol Levels and Heart Disease</h4>
                        <img src="images/cholesterol_analysis.png" alt="Cholesterol Analysis" className="viz-img" />
                        <div className="mt-3">
                            <h5>Key Insights:</h5>
                            <ul>
                                <li>Total cholesterol levels above 240 mg/dL are associated with higher heart disease risk</li>
                                <li>The relationship between cholesterol and heart disease is stronger in younger individuals</li>
                                <li>The combination of high cholesterol and high blood pressure multiplies the risk</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="viz-container">
                        <h4 className="mb-3"><i className="bi bi-cpu"></i> Feature Importance in Prediction Model</h4>
                        <img src="images/feature_importance.png" alt="Feature Importance" className="viz-img" />
                        <div className="mt-3">
                            <h5>Key Insights:</h5>
                            <ul>
                                <li>Age is the most important predictor of heart disease risk</li>
                                <li>Systolic blood pressure ranks second in importance</li>
                                <li>Smoking status, cholesterol, and diabetes are also significant predictors</li>
                                <li>Education level has the least impact on heart disease prediction</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="content-container mb-4">
                <h3 className="mb-3"><i className="bi bi-clipboard-data"></i> Risk Factor Interactions</h3>
                <p>
                    Heart disease risk factors often interact with each other, creating a combined effect that is greater than the sum of individual risks.
                    Understanding these interactions is crucial for accurate risk assessment and prevention strategies.
                </p>
                
                <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                        <thead className="table-danger">
                            <tr>
                                <th>Risk Factor Combination</th>
                                <th>Risk Multiplier</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Smoking + Hypertension</td>
                                <td>2.5x</td>
                                <td>These factors together significantly increase the risk of heart disease</td>
                            </tr>
                            <tr>
                                <td>Diabetes + High Cholesterol</td>
                                <td>3.0x</td>
                                <td>Particularly dangerous combination that accelerates atherosclerosis</td>
                            </tr>
                            <tr>
                                <td>Age (&gt;60) + Hypertension</td>
                                <td>2.8x</td>
                                <td>Blood pressure management becomes increasingly important with age</td>
                            </tr>
                            <tr>
                                <td>Smoking + Diabetes</td>
                                <td>3.5x</td>
                                <td>One of the most dangerous combinations for heart health</td>
                            </tr>
                            <tr>
                                <td>Obesity + High Cholesterol</td>
                                <td>2.2x</td>
                                <td>Weight management can help reduce cholesterol levels</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};