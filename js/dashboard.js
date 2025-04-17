// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // Check wallet connection
    checkWalletConnection();
    
    // Update dashboard visibility based on wallet connection
    updateDashboardVisibility();
    
    // Load dashboard data if wallet is connected
    if (walletConnected) {
        loadDashboardData();
    }
});

// Update dashboard visibility based on wallet connection
function updateDashboardVisibility() {
    const walletRequired = document.getElementById('walletRequired');
    const dashboardContent = document.getElementById('dashboardContent');
    
    if (walletConnected) {
        walletRequired.style.display = 'none';
        dashboardContent.style.display = 'block';
        
        // Display user wallet address
        const userWalletAddressElement = document.getElementById('userWalletAddress');
        if (userWalletAddressElement) {
            userWalletAddressElement.textContent = userAddress;
        }
    } else {
        walletRequired.style.display = 'block';
        dashboardContent.style.display = 'none';
    }
}

// Load dashboard data
function loadDashboardData() {
    // Get registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Filter registrations for current user
    const userRegistrations = registrations.filter(reg => reg.owner === userAddress);
    
    // Update content count
    document.getElementById('contentCount').textContent = userRegistrations.length;
    
    // Populate registered content table
    populateContentTable(userRegistrations);
    
    // Populate activity list
    populateActivityList(userRegistrations);
}

// Populate content table
function populateContentTable(registrations) {
    const tableBody = document.getElementById('registeredContentTable');
    const noContentMessage = document.getElementById('noContentMessage');
    
    if (registrations.length === 0) {
        tableBody.innerHTML = '';
        noContentMessage.classList.remove('d-none');
        return;
    }
    
    noContentMessage.classList.add('d-none');
    tableBody.innerHTML = '';
    
    registrations.forEach(registration => {
        // Format date
        const date = new Date(registration.timestamp);
        const formattedDate = date.toLocaleDateString();
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${registration.title}</td>
            <td>${formattedDate}</td>
            <td><span class="badge bg-success">Verified</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="showContentDetails('${registration.hash}')">Details</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Populate activity list
function populateActivityList(registrations) {
    const activityList = document.getElementById('activityList');
    
    if (registrations.length === 0) {
        activityList.innerHTML = '<li class="list-group-item">No recent activity</li>';
        return;
    }
    
    activityList.innerHTML = '';
    
    // Sort registrations by timestamp (newest first)
    const sortedRegistrations = [...registrations].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    // Show up to 5 most recent activities
    const recentRegistrations = sortedRegistrations.slice(0, 5);
    
    recentRegistrations.forEach(registration => {
        // Format date
        const date = new Date(registration.timestamp);
        const formattedDate = date.toLocaleDateString();
        
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>Content Registered:</strong> ${registration.title}
                </div>
                <span class="badge bg-light text-dark">${formattedDate}</span>
            </div>
        `;
        
        activityList.appendChild(listItem);
    });
    
    // Add a simulated verification activity if there are registrations
    if (registrations.length > 0) {
        const randomIndex = Math.floor(Math.random() * registrations.length);
        const randomRegistration = registrations[randomIndex];
        
        // Calculate a random verification date after registration
        const regDate = new Date(randomRegistration.timestamp);
        const verificationDate = new Date(regDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
        const formattedVerificationDate = verificationDate.toLocaleDateString();
        
        const verificationItem = document.createElement('li');
        verificationItem.className = 'list-group-item';
        verificationItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>Content Verified:</strong> ${randomRegistration.title}
                </div>
                <span class="badge bg-light text-dark">${formattedVerificationDate}</span>
            </div>
        `;
        
        activityList.appendChild(verificationItem);
    }
}

// Show content details modal
function showContentDetails(contentHash) {
    // Get registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Find the registration with matching hash
    const registration = registrations.find(reg => reg.hash === contentHash);
    
    if (!registration) {
        alert('Content details not found');
        return;
    }
    
    // Format date
    const date = new Date(registration.timestamp);
    const formattedDate = date.toLocaleString();
    
    // Set modal content
    document.getElementById('detailsTitle').textContent = registration.title;
    document.getElementById('detailsDescription').textContent = registration.description || 'No description provided';
    document.getElementById('detailsHash').textContent = registration.hash;
    document.getElementById('detailsTransactionId').textContent = registration.transactionId;
    document.getElementById('detailsDate').textContent = formattedDate;
    
    // Generate verification URL
    const baseUrl = window.location.origin + window.location.pathname.replace('dashboard.html', '');
    const verificationUrl = `${baseUrl}verify.html?hash=${registration.hash}`;
    document.getElementById('verificationUrl').value = verificationUrl;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('contentDetailsModal'));
    modal.show();
}

// Copy to clipboard function
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    
    // Show feedback (in a real app, use a toast notification)
    alert('Copied to clipboard!');
}