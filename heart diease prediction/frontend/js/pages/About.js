// About.js - About page component
const About = () => {
    return (
        <>
            <div className="header text-center">
                <h1><i className="bi bi-info-circle"></i> About This Project</h1>
                <p>Understanding the heart disease prediction tool and its development</p>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-8">
                    <div className="content-container">
                        <h3 className="mb-3">Project Overview</h3>
                        <p>
                            The Heart Disease Prediction Tool is a machine learning-based application designed to estimate an individual's 10-year risk of developing coronary heart disease (CHD).
                            The prediction model is trained on data from the Framingham Heart Study, a landmark longitudinal study that has contributed significantly to our understanding of cardiovascular disease.
                        </p>
                        <p>
                            This tool is intended for educational purposes to help individuals understand the various risk factors associated with heart disease and how they might impact overall cardiovascular health.
                            It should not be used as a substitute for professional medical advice, diagnosis, or treatment.
                        </p>
                        
                        <h4 className="mt-4 mb-3">The Framingham Heart Study</h4>
                        <p>
                            The Framingham Heart Study is a long-term, ongoing cardiovascular study of residents of Framingham, Massachusetts. The study began in 1948 with 5,209 adult subjects and is now on its third generation of participants.
                            The Framingham Heart Study has led to the identification of major cardiovascular disease risk factors and has resulted in numerous important discoveries including:
                        </p>
                        <ul>
                            <li>The effects of blood pressure, cholesterol, and smoking on heart disease risk</li>
                            <li>The impact of related factors such as blood triglyceride and HDL cholesterol levels</li>
                            <li>The relationship between physical activity and heart disease risk</li>
                            <li>The effects of demographic characteristics such as age and gender</li>
                        </ul>
                        
                        <h4 className="mt-4 mb-3">Model Development</h4>
                        <p>
                            Our prediction model was developed using machine learning techniques applied to the Framingham Heart Study dataset. The development process included:
                        </p>
                        <ol>
                            <li>Data preprocessing and cleaning to handle missing values and outliers</li>
                            <li>Feature selection to identify the most relevant risk factors</li>
                            <li>Model training using various algorithms including logistic regression, random forests, and gradient boosting</li>
                            <li>Model evaluation and selection based on performance metrics such as accuracy, precision, recall, and F1 score</li>
                            <li>Validation on separate test data to ensure generalizability</li>
                        </ol>
                        <p>
                            The final model achieves an accuracy of approximately 86.5% in predicting 10-year CHD risk, with a balanced approach to sensitivity and specificity.
                        </p>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="content-container">
                        <h3 className="mb-3">Key Features</h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <i className="bi bi-calculator text-danger me-2"></i>
                                <strong>Risk Prediction:</strong> Calculate your 10-year heart disease risk
                            </li>
                            <li className="list-group-item">
                                <i className="bi bi-speedometer2 text-danger me-2"></i>
                                <strong>Dashboard:</strong> View key metrics and statistics
                            </li>
                            <li className="list-group-item">
                                <i className="bi bi-graph-up text-danger me-2"></i>
                                <strong>Data Insights:</strong> Explore visualizations of risk factors
                            </li>
                            <li className="list-group-item">
                                <i className="bi bi-clock-history text-danger me-2"></i>
                                <strong>History:</strong> Track your previous predictions
                            </li>
                            <li className="list-group-item">
                                <i className="bi bi-shield-check text-danger me-2"></i>
                                <strong>Privacy:</strong> All data is processed locally
                            </li>
                        </ul>
                    </div>
                    
                    <div className="content-container mt-4">
                        <h3 className="mb-3">Disclaimer</h3>
                        <div className="alert alert-warning">
                            <p>
                                <strong>This tool is for educational purposes only.</strong> It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                            </p>
                            <p>
                                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="content-container">
                        <h3 className="mb-3">Risk Factors Explained</h3>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-danger">
                                    <tr>
                                        <th>Risk Factor</th>
                                        <th>Description</th>
                                        <th>Impact on Heart Disease</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Age</strong></td>
                                        <td>The risk of heart disease increases with age, particularly after 45 for men and 55 for women.</td>
                                        <td>High - Age is one of the strongest predictors of heart disease risk.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sex</strong></td>
                                        <td>Men are generally at higher risk than women, though women's risk increases after menopause.</td>
                                        <td>Moderate to High - Men typically develop heart disease 7-10 years earlier than women.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Smoking</strong></td>
                                        <td>Smoking damages blood vessels, reduces oxygen in the blood, and raises blood pressure.</td>
                                        <td>Very High - Smokers are 2-4 times more likely to develop heart disease.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Blood Pressure</strong></td>
                                        <td>High blood pressure forces the heart to work harder, leading to heart enlargement and weakness.</td>
                                        <td>High - Each 20 mmHg increase in systolic BP doubles the risk of heart disease.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cholesterol</strong></td>
                                        <td>High levels of LDL cholesterol can lead to plaque buildup in arteries.</td>
                                        <td>High - Each 40 mg/dL increase in total cholesterol increases heart disease risk by about 50%.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Diabetes</strong></td>
                                        <td>Diabetes damages blood vessels and nerves that control the heart.</td>
                                        <td>Very High - Diabetics are 2-4 times more likely to develop heart disease.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>BMI</strong></td>
                                        <td>Body Mass Index is a measure of body fat based on height and weight.</td>
                                        <td>Moderate - Obesity increases risk through multiple mechanisms including inflammation.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Previous Stroke</strong></td>
                                        <td>Having had a stroke indicates underlying vascular issues that also affect the heart.</td>
                                        <td>High - Stroke and heart disease share many risk factors and pathological mechanisms.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="content-container">
                        <h3 className="mb-3">Frequently Asked Questions</h3>
                        <div className="accordion" id="faqAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        How accurate is this prediction tool?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        The model achieves approximately 86.5% accuracy on test data. However, it's important to note that no prediction model is perfect, and this tool should be used for educational purposes only, not for medical diagnosis.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Is my data stored or shared when I use this tool?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        All predictions are processed locally in your browser. Your data is not sent to any server or shared with any third parties. Your prediction history is stored only in your browser's local storage.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        What should I do if the tool predicts a high risk?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        If the tool predicts a high risk, it's important to consult with a healthcare professional. This tool is not a substitute for medical advice. A healthcare provider can perform a more comprehensive assessment and provide personalized recommendations.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Can I reduce my heart disease risk?
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Yes, many heart disease risk factors are modifiable. Lifestyle changes such as quitting smoking, maintaining a healthy diet, regular physical activity, and managing conditions like high blood pressure, high cholesterol, and diabetes can significantly reduce your risk of heart disease.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        How often should I check my heart disease risk?
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        It's generally recommended to have your cardiovascular risk assessed by a healthcare provider at least once every 4-6 years if you're a healthy adult. However, if you have risk factors such as high blood pressure, diabetes, or a family history of heart disease, more frequent assessments may be recommended.
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