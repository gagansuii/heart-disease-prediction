// Footer.js - Footer component
const Footer = () => {
    return (
        <footer className="mt-5 text-center text-muted">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5><i className="bi bi-heart-pulse"></i> Heart Disease Prediction</h5>
                        <p className="small">A machine learning tool to predict 10-year risk of coronary heart disease</p>
                    </div>
                    <div className="col-md-4">
                        <h5><i className="bi bi-shield-check"></i> Disclaimer</h5>
                        <p className="small">This tool is for educational purposes only and should not replace medical advice</p>
                    </div>
                    <div className="col-md-4">
                        <h5><i className="bi bi-link-45deg"></i> Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-muted" onClick={(e) => {
                                e.preventDefault();
                                // You would use navigateTo here, but we need to pass it as a prop
                            }}>About</a></li>
                            <li><a href="#" className="text-muted" onClick={(e) => {
                                e.preventDefault();
                                // You would use navigateTo here, but we need to pass it as a prop
                            }}>Data Insights</a></li>
                            <li><a href="#" className="text-muted" onClick={(e) => {
                                e.preventDefault();
                                // You would use navigateTo here, but we need to pass it as a prop
                            }}>Prediction Tool</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p>&copy; 2023 Heart Disease Prediction Tool</p>
            </div>
        </footer>
    );
};