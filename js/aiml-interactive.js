/* ==========================================================================
   AI/ML INTERACTIVE SIMULATOR & CLIENT INFERENCE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. NeuroStroke Simulator Logic
    const ageInput = document.getElementById('input-age');
    const glucoseInput = document.getElementById('input-glucose');
    const bmiInput = document.getElementById('input-bmi');
    const hypertensionInput = document.getElementById('input-hypertension');
    const heartDiseaseInput = document.getElementById('input-heart-disease');

    const ageVal = document.getElementById('age-val');
    const glucoseVal = document.getElementById('glucose-val');
    const bmiVal = document.getElementById('bmi-val');

    const riskScore = document.getElementById('risk-score');
    const riskCategory = document.getElementById('risk-category');
    const riskAdvice = document.getElementById('risk-advice');
    const riskDialCircle = document.getElementById('risk-dial-circle');

    function calculateRisk() {
        if (!ageInput || !glucoseInput || !bmiInput || !riskScore) return;

        const age = parseFloat(ageInput.value);
        const glucose = parseFloat(glucoseInput.value);
        const bmi = parseFloat(bmiInput.value);
        const hypertension = hypertensionInput && hypertensionInput.checked ? 1 : 0;
        const heartDisease = heartDiseaseInput && heartDiseaseInput.checked ? 1 : 0;

        // UI label updates
        if (ageVal) ageVal.textContent = `${age} years`;
        if (glucoseVal) glucoseVal.textContent = `${glucose} mg/dL`;
        if (bmiVal) bmiVal.textContent = bmi.toFixed(1);

        // Simulated Logistic / Weighted Regression Coefficients inspired by clinical stroke datasets
        // Baseline intercept
        let logit = -5.8;
        logit += (age * 0.068);
        logit += ((glucose - 90) * 0.012);
        logit += ((bmi - 22) * 0.038);
        logit += (hypertension * 0.85);
        logit += (heartDisease * 0.95);

        // Sigmoid mapping to 0-100%
        let probability = 1 / (1 + Math.exp(-logit));
        let percentage = Math.min(Math.max(Math.round(probability * 100), 2), 98);

        riskScore.textContent = `${percentage}%`;

        // Classification & Visual Styling
        if (percentage < 25) {
            riskCategory.textContent = "Low Clinical Risk Profile";
            riskCategory.style.color = "#00ffaa";
            riskDialCircle.style.borderColor = "#00ffaa";
            riskDialCircle.style.boxShadow = "0 0 25px rgba(0, 255, 170, 0.3)";
            riskAdvice.textContent = "Biomarkers are well-balanced within normal clinical thresholds. Recommended: Maintain routine physical activity.";
        } else if (percentage < 55) {
            riskCategory.textContent = "Moderate Risk Profile";
            riskCategory.style.color = "#00f0ff";
            riskDialCircle.style.borderColor = "#00f0ff";
            riskDialCircle.style.boxShadow = "0 0 25px rgba(0, 240, 255, 0.3)";
            riskAdvice.textContent = "Slight biomarker elevation noted in age/glucose parameters. Recommended: Regular cardiovascular checkups.";
        } else if (percentage < 75) {
            riskCategory.textContent = "Elevated Risk Profile";
            riskCategory.style.color = "#ffb700";
            riskDialCircle.style.borderColor = "#ffb700";
            riskDialCircle.style.boxShadow = "0 0 25px rgba(255, 183, 0, 0.35)";
            riskAdvice.textContent = "Substantial compound markers detected. Recommend physician consultation for glucose & blood pressure regulation.";
        } else {
            riskCategory.textContent = "High Risk Warning";
            riskCategory.style.color = "#ff0055";
            riskDialCircle.style.borderColor = "#ff0055";
            riskDialCircle.style.boxShadow = "0 0 30px rgba(255, 0, 85, 0.45)";
            riskAdvice.textContent = "Critical biometric overlap (hypertension, elevated glucose, cardiac indicators). Immediate preventive attention advised.";
        }
    }

    [ageInput, glucoseInput, bmiInput, hypertensionInput, heartDiseaseInput].forEach(elem => {
        if (elem) {
            elem.addEventListener('input', calculateRisk);
            elem.addEventListener('change', calculateRisk);
        }
    });

    calculateRisk();
});
