function applyStrategy() {
    const strategy = document.getElementById('strategy').value;
    console.log('Strategy Applied:', strategy);
    // Implement strategy application logic
}

function createRule() {
    const ruleName = document.getElementById('rule-name').value;
    console.log('Rule Created:', ruleName);
    // Implement rule creation logic
}

// Example function to fetch and display recommendations
function fetchRecommendations() {
    // Fetch recommendations from backend (placeholder here)
    const recommendations = 'Increase bids for high-performing keywords.';
    document.getElementById('recommendation-text').innerText = recommendations;
}

window.applyStrategy = applyStrategy;
window.createRule = createRule;
window.onload = fetchRecommendations;
