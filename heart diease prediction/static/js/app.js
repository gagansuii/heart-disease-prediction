/**
 * Heart Disease Prediction Application
 * Main JavaScript file for handling form submission and UI interactions
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        predictionForm.addEventListener('submit', handlePredictionSubmit);
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize smoking status handler
    const smokingStatus = document.getElementById('is_smoking');
    if (smokingStatus) {
        smokingStatus.addEventListener('change', updateCigsPerDay);
        // Initialize on page load
        updateCigsPerDay.call(smokingStatus);
    }

    // Initialize BMI calculator
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiInput = document.getElementById('BMI');
    
    if (heightInput && weightInput && bmiInput) {
        heightInput.addEventListener('input', calculateBMI);
        weightInput.addEventListener('input', calculateBMI);
    }

    // Initialize risk factor highlights
    highlightRiskFactors();
});

/**
 * Handles the prediction form submission
 * @param {Event} e - The form submission event
 */
async function handlePredictionSubmit(e) {
    e.preventDefault();
    
    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    const resultElement = document.getElementById('prediction-result');
    
    if (loadingElement) loadingElement.style.display = 'block';
    if (resultElement) resultElement.style.display = 'none';
    
    // Collect form data
    const formData = {
        age: getInputValue('age', 'int'),
        education: getInputValue('education', 'float'),
        sex: getInputValue('sex', 'int'),
        is_smoking: getInputValue('is_smoking', 'int'),
        cigsPerDay: getInputValue('cigsPerDay', 'float', 0),
        BPMeds: getInputValue('BPMeds', 'int'),
        prevalentStroke: getInputValue('prevalentStroke', 'int'),
        prevalentHyp: getInputValue('prevalentHyp', 'int'),
        diabetes: getInputValue('diabetes', 'int'),
        totChol: getInputValue('totChol', 'float'),
        sysBP: getInputValue('sysBP', 'float'),
        diaBP: getInputValue('diaBP', 'float'),
        BMI: getInputValue('BMI', 'float'),
        heartRate: getInputValue('heartRate', 'float'),
        glucose: getInputValue('glucose', 'float')
    };
    
    try {
        // Send data to API
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        // Hide loading indicator
        if (loadingElement) loadingElement.style.display = 'none';
        
        // Display result
        displayPredictionResult(result);
        
    } catch (error) {
        console.error('Error:', error);
        if (loadingElement) loadingElement.style.display = 'none';
        
        displayPredictionResult({
            error: 'An error occurred while processing your request.'
        });
    }
}

/**
 * Gets the value from an input element and converts it to the specified type
 * @param {string} elementId - The ID of the input element
 * @param {string} type - The type to convert to ('int', 'float', or 'string')
 * @param {any} defaultValue - The default value to use if the input is empty
 * @returns {any} The converted value
 */
function getInputValue(elementId, type = 'string', defaultValue = null) {
    const element = document.getElementById(elementId);
    if (!element || element.value === '') return defaultValue;
    
    switch (type) {
        case 'int':
            return parseInt(element.value);
        case 'float':
            return parseFloat(element.value);
        default:
            return element.value;
    }
}

/**
 * Displays the prediction result on the page
 * @param {Object} result - The prediction result from the API
 */
function displayPredictionResult(result) {
    const resultElement = document.getElementById('prediction-result');
    const messageElement = document.getElementById('result-message');
    const detailsElement = document.getElementById('result-details');
    const riskFactorsElement = document.getElementById('risk-factors');
    
    if (!resultElement || !messageElement || !detailsElement) return;
    
    if (result.error) {
        messageElement.textContent = 'Error';
        detailsElement.textContent = result.error;
        resultElement.className = 'prediction-result text-center high-risk';
        if (riskFactorsElement) riskFactorsElement.style.display = 'none';
    } else {
        if (result.prediction === 1) {
            messageElement.textContent = result.message;
            detailsElement.textContent = `Probability: ${(result.probability * 100).toFixed(2)}%`;
            resultElement.className = 'prediction-result text-center high-risk';
        } else {
            messageElement.textContent = result.message;
            detailsElement.textContent = `Probability: ${(result.probability * 100).toFixed(2)}%`;
            resultElement.className = 'prediction-result text-center low-risk';
        }
        
        // Display risk factors if available
        if (riskFactorsElement && result.risk_factors) {
            riskFactorsElement.innerHTML = '';
            riskFactorsElement.style.display = 'block';
            
            const factorsList = document.createElement('ul');
            factorsList.className = 'list-group';
            
            result.risk_factors.forEach(factor => {
                const item = document.createElement('li');
                item.className = 'list-group-item d-flex justify-content-between align-items-center';
                item.textContent = factor.name;
                
                const badge = document.createElement('span');
                badge.className = `badge ${factor.impact > 0 ? 'bg-danger' : 'bg-success'} rounded-pill`;
                badge.textContent = factor.impact > 0 ? 'Increases Risk' : 'Decreases Risk';
                
                item.appendChild(badge);
                factorsList.appendChild(item);
            });
            
            riskFactorsElement.appendChild(factorsList);
        }
    }
    
    resultElement.style.display = 'block';
    
    // Scroll to result
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Updates the cigarettes per day field based on smoking status
 */
function updateCigsPerDay() {
    const cigsPerDayField = document.getElementById('cigsPerDay');
    if (!cigsPerDayField) return;
    
    if (this.value === '0') {
        cigsPerDayField.value = '0';
        cigsPerDayField.disabled = true;
    } else {
        cigsPerDayField.disabled = false;
    }
}

/**
 * Calculates BMI based on height and weight inputs
 */
function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiInput = document.getElementById('BMI');
    
    if (!heightInput || !weightInput || !bmiInput) return;
    
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    if (height && weight) {
        // Convert height from cm to meters
        const heightInMeters = height / 100;
        // Calculate BMI: weight (kg) / (height (m))^2
        const bmi = weight / (heightInMeters * heightInMeters);
        bmiInput.value = bmi.toFixed(2);
    }
}

/**
 * Highlights risk factors based on input values
 */
function highlightRiskFactors() {
    const formInputs = document.querySelectorAll('#prediction-form input, #prediction-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Reset all highlights
            formInputs.forEach(inp => {
                const formGroup = inp.closest('.mb-3');
                if (formGroup) {
                    formGroup.classList.remove('risk-factor-high', 'risk-factor-moderate', 'risk-factor-low');
                }
            });
            
            // Check for high-risk factors
            const age = getInputValue('age', 'int', 0);
            const isSmoking = getInputValue('is_smoking', 'int', 0);
            const cigsPerDay = getInputValue('cigsPerDay', 'float', 0);
            const prevalentStroke = getInputValue('prevalentStroke', 'int', 0);
            const prevalentHyp = getInputValue('prevalentHyp', 'int', 0);
            const diabetes = getInputValue('diabetes', 'int', 0);
            const totChol = getInputValue('totChol', 'float', 0);
            const sysBP = getInputValue('sysBP', 'float', 0);
            const diaBP = getInputValue('diaBP', 'float', 0);
            const bmi = getInputValue('BMI', 'float', 0);
            
            // Apply highlights based on risk factors
            if (age > 60) highlightInput('age', 'high');
            else if (age > 50) highlightInput('age', 'moderate');
            
            if (isSmoking === 1) highlightInput('is_smoking', 'high');
            if (cigsPerDay > 20) highlightInput('cigsPerDay', 'high');
            else if (cigsPerDay > 10) highlightInput('cigsPerDay', 'moderate');
            
            if (prevalentStroke === 1) highlightInput('prevalentStroke', 'high');
            if (prevalentHyp === 1) highlightInput('prevalentHyp', 'high');
            if (diabetes === 1) highlightInput('diabetes', 'high');
            
            if (totChol > 240) highlightInput('totChol', 'high');
            else if (totChol > 200) highlightInput('totChol', 'moderate');
            
            if (sysBP > 140) highlightInput('sysBP', 'high');
            else if (sysBP > 120) highlightInput('sysBP', 'moderate');
            
            if (diaBP > 90) highlightInput('diaBP', 'high');
            else if (diaBP > 80) highlightInput('diaBP', 'moderate');
            
            if (bmi > 30) highlightInput('BMI', 'high');
            else if (bmi > 25) highlightInput('BMI', 'moderate');
        });
    });
}

/**
 * Highlights an input field based on risk level
 * @param {string} elementId - The ID of the input element
 * @param {string} level - The risk level ('high', 'moderate', or 'low')
 */
function highlightInput(elementId, level) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const formGroup = element.closest('.mb-3');
    if (!formGroup) return;
    
    formGroup.classList.add(`risk-factor-${level}`);
}