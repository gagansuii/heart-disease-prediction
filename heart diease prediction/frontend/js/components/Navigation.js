// Navigation.js - Navigation component
const Navigation = ({ currentPage, navigateTo }) => {
    return (
        <ul className="nav nav-pills mb-4 justify-content-center">
            <li className="nav-item">
                <a 
                    className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo('home');
                    }}
                >
                    <i className="bi bi-calculator"></i> Prediction Tool
                </a>
            </li>
            <li className="nav-item">
                <a 
                    className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo('dashboard');
                    }}
                >
                    <i className="bi bi-speedometer2"></i> Dashboard
                </a>
            </li>
            <li className="nav-item">
                <a 
                    className={`nav-link ${currentPage === 'visualizations' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo('visualizations');
                    }}
                >
                    <i className="bi bi-graph-up"></i> Data Insights
                </a>
            </li>
            <li className="nav-item">
                <a 
                    className={`nav-link ${currentPage === 'history' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo('history');
                    }}
                >
                    <i className="bi bi-clock-history"></i> History
                </a>
            </li>
            <li className="nav-item">
                <a 
                    className={`nav-link ${currentPage === 'about' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo('about');
                    }}
                >
                    <i className="bi bi-info-circle"></i> About
                </a>
            </li>
        </ul>
    );
};