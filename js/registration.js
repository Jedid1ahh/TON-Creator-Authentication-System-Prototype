// registration.js

document.addEventListener('DOMContentLoaded', () => {
    // Check wallet connection
    checkWalletConnection();
    
    // Update form visibility based on wallet connection
    updateFormVisibility();
    
    // Set up form submission handler
    const contentForm = document.getElementById('contentForm');
    if (contentForm) {
        contentForm.addEventListener('submit', handleContentRegistration);
    }
});

// Update form visibility based on wallet connection
function updateFormVisibility() {
    const walletRequired = document.getElementById('walletRequired');
    const registrationForm = document.getElementById('registrationForm');
    
    if (walletConnected) {
        walletRequired.style.display = 'none';
        registrationForm.style.display = 'block';
    } else {
        walletRequired.style.display = 'block';
        registrationForm.style.display = 'none';
    }
}

// Handle content registration form submission
async function handleContentRegistration(e) {
    e.preventDefault();
    
    // Get form values
    const contentTitle = document.getElementById('contentTitle').value;
    const contentDescription = document.getElementById('contentDescription').value;
    const contentFile = document.getElementById('contentFile').files[0];
    const contentUrl = document.getElementById('contentUrl').value;
    const allowCommercial = document.getElementById('allowCommercial').checked;
    const allowDerivatives = document.getElementById('allowDerivatives').checked;
    const requireAttribution = document.getElementById('requireAttribution').checked;
    
    // Validate form
    if (!contentTitle) {
        alert('Please enter a content title');
        return;
    }
    
    if (!contentFile && !contentUrl) {
        alert('Please upload a file or provide a URL');
        return;
    }
    
    try {
        // Show loading state
        // In a real app, add a loading indicator here
        
        // Generate a hash for the content (simulated)
        const contentHash = await generateContentHash(contentFile || contentUrl);
        
        // Simulate blockchain registration
        const transactionId = await registerOnBlockchain(contentHash, {
            title: contentTitle,
            description: contentDescription,
            url: contentUrl || null,
            rights: {
                allowCommercial,
                allowDerivatives,
                requireAttribution
            }
        });
        
        // Store registration data in localStorage for the prototype
        saveRegistration(contentHash, contentTitle, contentDescription, transactionId);
        
        // Show success modal
        displaySuccessModal(contentHash, transactionId);
        
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed: ' + error.message);
    }
}

// Simulate content hash generation
async function generateContentHash(content) {
    // In a real app, this would compute an actual hash of the content
    // For the prototype, we'll generate a random hash
    await simulateLoading(1000); // Simulate processing time
    
    return "0x" + generateRandomHex(64);
}

// Simulate blockchain registration
async function registerOnBlockchain(contentHash, metadata) {
    // In a real app, this would create a blockchain transaction
    // For the prototype, we'll simulate the process
    await simulateLoading(2000); // Simulate blockchain transaction time
    
    return "0x" + generateRandomHex(64); // Return a simulated transaction ID
}

// Save registration to localStorage
function saveRegistration(contentHash, title, description, transactionId) {
    // Get existing registrations or initialize empty array
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Add new registration
    registrations.push({
        hash: contentHash,
        title: title,
        description: description,
        transactionId: transactionId,
        timestamp: new Date().toISOString(),
        owner: userAddress
    });
    
    // Save updated registrations
    localStorage.setItem('registrations', JSON.stringify(registrations));
}

// Display success modal
function displaySuccessModal(contentHash, transactionId) {
    // Set result values
    document.getElementById('contentHashResult').value = contentHash;
    document.getElementById('transactionIdResult').value = transactionId;
    
    // Create and show modal
    const successModal = new bootstrap.Modal(document.getElementById('registrationSuccessModal'));
    successModal.show();
}

// Helper function to simulate loading time
function simulateLoading(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}