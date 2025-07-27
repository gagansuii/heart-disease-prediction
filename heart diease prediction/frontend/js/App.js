// App.js - Main application component
const App = () => {
    const [currentPage, setCurrentPage] = React.useState('home');

    // Function to handle navigation
    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    // Render the appropriate page based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'dashboard':
                return <Dashboard />;
            case 'visualizations':
                return <Visualizations />;
            case 'history':
                return <History />;
            case 'about':
                return <About />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="container">
            <div className="header text-center">
                <h1><i className="bi bi-heart-pulse"></i> Heart Disease Prediction</h1>
                <p>Predict your 10-year risk of coronary heart disease (CHD)</p>
            </div>
            
            <Navigation currentPage={currentPage} navigateTo={navigateTo} />
            
            {renderPage()}
            
            <Footer />
        </div>
    );
};