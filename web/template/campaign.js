document.addEventListener('DOMContentLoaded', function() {
    // Sample data (replace with real data fetching in practice)
    const campaigns = [
        {
            "name": "Summer Sale Campaign",
            "status": "Active",
            "budget": 1000,
            "spent": 750,
            "clicks": 1500,
            "impressions": 30000
        },
        {
            "name": "Winter Collection Launch",
            "status": "Paused",
            "budget": 500,
            "spent": 300,
            "clicks": 800,
            "impressions": 20000
        }
    ];

    // Populate the campaigns table
    const tableBody = document.querySelector('#campaigns-table tbody');
    campaigns.forEach(campaign => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${campaign.name}</td>
            <td>${campaign.status}</td>
            <td>$${campaign.budget}</td>
            <td>$${campaign.spent}</td>
            <td>${campaign.clicks}</td>
            <td>${campaign.impressions}</td>
        `;
        tableBody.appendChild(row);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Sample data
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    const clicksData = {
        labels: labels,
        datasets: [{
            label: 'Clicks',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [50, 60, 70, 80, 90, 100],
        }]
    };

    const impressionsData = {
        labels: labels,
        datasets: [{
            label: 'Impressions',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [200, 400, 600, 800, 1000, 1200],
        }]
    };

    // Config for clicks chart
    const clicksConfig = {
        type: 'line',
        data: clicksData,
        options: {}
    };

    // Config for impressions chart
    const impressionsConfig = {
        type: 'line',
        data: impressionsData,
        options: {}
    };

    // Render the charts
    new Chart(
        document.getElementById('clicksChart'),
        clicksConfig
    );

    new Chart(
        document.getElementById('impressionsChart'),
        impressionsConfig
    );
    document.getElementById('settings-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const enableNotifications = document.getElementById('notification').checked;
        const selectedTimezone = document.getElementById('timezone').value;

        // Here, you would typically send this data to a server or store it locally
        console.log('Settings Saved:', { enableNotifications, selectedTimezone });
        alert('Settings have been saved.');
    });
    document.addEventListener('DOMContentLoaded', function() {
        // Facebook Ads sample data
        const facebookAdsData = [
            {
                "name": "Facebook Brand Awareness Campaign",
                "status": "Running",
                "type": "Brand Awareness",
                "budget": 1200,
                "spent": 600,
                "impressions": 50000,
                "clicks": 2500,
                "startDate": "2023-02-01",
                "endDate": "2023-02-28"
            },
            {
                "name": "Facebook Retargeting Campaign",
                "status": "Paused",
                "type": "Conversion",
                "budget": 800,
                "spent": 400,
                "impressions": 30000,
                "clicks": 1500,
                "startDate": "2023-01-10",
                "endDate": "2023-01-24"
            }
        ];

        // Function to load campaign data into the dashboard
        function loadCampaignData(campaigns) {
            const container = document.getElementById('campaignsContainer');
            container.innerHTML = ''; // Clear existing data

            campaigns.forEach(campaign => {
                const div = document.createElement('div');
                div.className = 'campaign';
                div.innerHTML = `
                <h3>${campaign.name}</h3>
                <p>Status: ${campaign.status}</p>
                <p>Type: ${campaign.type}</p>
                <p>Budget: $${campaign.budget}</p>
                <p>Spent: $${campaign.spent}</p>
                <p>Impressions: ${campaign.impressions}</p>
                <p>Clicks: ${campaign.clicks}</p>
                <p>Duration: ${campaign.startDate} to ${campaign.endDate}</p>
            `;
                container.appendChild(div);
            });
        }

        // Load Facebook Ads data
        loadCampaignData(facebookAdsData);
    });

});
