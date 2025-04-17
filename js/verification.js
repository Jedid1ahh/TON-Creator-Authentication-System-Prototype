// verification.js

document.addEventListener('DOMContentLoaded', () => {
    // Check wallet connection
    checkWalletConnection();
    
    // Set up form submission handlers
    const fileVerifyForm = document.getElementById('fileVerifyForm');
    const urlVerifyForm = document.getElementById('urlVerifyForm');
    const hashVerifyForm = document.getElementById('hashVerifyForm');
    
    if (fileVerifyForm) {
        fileVerifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            verifyContent('file');
        });
    }
    
    if (urlVerifyForm) {
        urlVerifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            verifyContent('url');
        });
    }
    
    if (hashVerifyForm) {
        hashVerifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            verifyContent('hash');
        });
    }
    
    // Enable Bootstrap tabs
    const tabElements = document.querySelectorAll('a[data-bs-toggle="tab"]');
    tabElements.forEach(tabEl => {
        tabEl.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane
            target.classList.add('active');
            
            // Update active tab
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Set up certificate download button
    const downloadCertBtn = document.getElementById('downloadCertBtn');
    if (downloadCertBtn) {
        downloadCertBtn.addEventListener('click', generateCertificate);
    }
});

// Verify content based on input type
async function verifyContent(type) {
    try {
        // Hide previous results
        hideVerificationResults();
        
        // Get input based on type
        let contentIdentifier;
        let contentHash;
        
        switch (type) {
            case 'file':
                const file = document.getElementById('verifyFile').files[0];
                if (!file) {
                    alert('Please select a file to verify');
                    return;
                }
                // Simulate file hash calculation
                contentHash = await simulateFileHash(file);
                break;
                
            case 'url':
                const url = document.getElementById('verifyUrl').value;
                if (!url) {
                    alert('Please enter a URL to verify');
                    return;
                }
                // Simulate URL content hash calculation
                contentHash = await simulateUrlHash(url);
                break;
                
            case 'hash':
                contentHash = document.getElementById('verifyHash').value;
                if (!contentHash) {
                    alert('Please enter a content hash');
                    return;
                }
                break;
                
            default:
                throw new Error('Invalid verification type');
        }
        
        // Simulate loading
        await simulateLoading(1500);
        
        // Look up content in stored registrations (simulating blockchain query)
        const registrationData = findRegistrationByHash(contentHash);
        
        if (registrationData) {
            // Show verification results
            displayVerificationResults(registrationData);
            
            // Enable certificate download
            document.getElementById('downloadCertBtn').disabled = false;
        } else {
            // Show not found message
            document.getElementById('verificationFailed').style.display = 'block';
        }
        
    } catch (error) {
        console.error('Verification error:', error);
        alert('Verification failed: ' + error.message);
    }
}

// Simulate file hash calculation
async function simulateFileHash(file) {
    // In a real implementation, this would calculate the actual file hash
    // For the prototype, we'll simulate it
    
    // Use the file name as part of the hash simulation to make it deterministic
    const fileName = file.name || 'unknown';
    const fileSize = file.size || 0;
    
    // Simple hash simulation based on file properties
    const hashBase = fileName + fileSize + Date.now();
    
    // Wait to simulate processing
    await simulateLoading(1000);
    
    // For demo purposes, either return a random hash or check if we have a matching one in localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // If we have registrations, return one of those hashes 50% of the time for demo purposes
    if (registrations.length > 0 && Math.random() > 0.5) {
        return registrations[Math.floor(Math.random() * registrations.length)].hash;
    }
    
    // Otherwise return a random hash
    return "0x" + generateRandomHex(64);
}

// Simulate URL hash calculation
async function simulateUrlHash(url) {
    // In a real implementation, this would fetch the content and calculate its hash
    // For the prototype, we'll simulate it
    
    // Wait to simulate processing
    await simulateLoading(1000);
    
    // For demo purposes, either return a random hash or check if we have a matching one in localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // If we have registrations, return one of those hashes 50% of the time for demo purposes
    if (registrations.length > 0 && Math.random() > 0.5) {
        return registrations[Math.floor(Math.random() * registrations.length)].hash;
    }
    
    // Otherwise return a random hash
    return "0x" + generateRandomHex(64);
}

// Find registration by hash
function findRegistrationByHash(hash) {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    return registrations.find(reg => reg.hash === hash);
}

// Display verification results
function displayVerificationResults(registration) {
    // Hide the "not found" message
    document.getElementById('verificationFailed').style.display = 'none';
    
    // Set result values
    document.getElementById('resultTitle').textContent = registration.title;
    document.getElementById('resultOwner').textContent = registration.owner;
    document.getElementById('resultDate').textContent = new Date(registration.timestamp).toLocaleString();
    document.getElementById('resultHash').textContent = registration.hash;
    
    // Set rights information (simulated for prototype)
    const rightsList = document.getElementById('resultRights');
    rightsList.innerHTML = '';
    
    const rights = [
        { name: 'Commercial Use', value: Math.random() > 0.5 ? 'Allowed' : 'Not Allowed' },
        { name: 'Derivatives', value: Math.random() > 0.5 ? 'Allowed' : 'Not Allowed' },
        { name: 'Attribution', value: 'Required' }
    ];
    
    rights.forEach(right => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.textContent = right.name;
        
        const badge = document.createElement('span');
        badge.className = right.value.includes('Allowed') || right.value === 'Required' 
            ? 'badge bg-success' 
            : 'badge bg-danger';
        badge.textContent = right.value;
        
        listItem.appendChild(badge);
        rightsList.appendChild(listItem);
    });
    
    // Show the results container
    document.getElementById('verificationResults').style.display = 'block';
}

// Hide verification results
function hideVerificationResults() {
    document.getElementById('verificationResults').style.display = 'none';
    document.getElementById('verificationFailed').style.display = 'none';
    document.getElementById('downloadCertBtn').disabled = true;
}

// Generate verification certificate (simulated)
function generateCertificate() {
    // In a real application, this would generate a PDF certificate
    // For the prototype, we'll just show an alert
    alert('Certificate generation is not implemented in this prototype.');
}

// Helper function to simulate loading time
function simulateLoading(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to generate random hex string
function generateRandomHex(length) {
    let result = '';
    const characters = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}