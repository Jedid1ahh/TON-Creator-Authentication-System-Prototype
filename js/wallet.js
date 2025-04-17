// wallet.js

// Simulate TON SDK wallet connection
let walletConnected = false;
let userAddress = null;

// Initialize wallet connection buttons
document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }
    
    // Check if wallet was previously connected
    checkWalletConnection();
});

// Function to connect wallet
async function connectWallet() {
    try {
        // In a real implementation, this would use the actual TON SDK
        // For the prototype, we'll simulate the connection
        
        console.log("Connecting to TON wallet...");
        
        // Simulate connection process
        await simulateLoading(1000);
        
        // Generate a random TON address for demonstration
        userAddress = "0:" + generateRandomHex(64);
        walletConnected = true;
        
        // Save wallet connection to localStorage
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('userAddress', userAddress);
        
        // Update UI
        updateWalletUI();
        
        // Show success message
        alert("Wallet connected successfully!");
        
    } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

// Function to check if wallet is already connected
function checkWalletConnection() {
    walletConnected = localStorage.getItem('walletConnected') === 'true';
    userAddress = localStorage.getItem('userAddress');
    
    if (walletConnected && userAddress) {
        updateWalletUI();
    }
}

// Function to update UI based on wallet connection status
function updateWalletUI() {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    if (connectWalletBtn) {
        if (walletConnected) {
            connectWalletBtn.textContent = userAddress.substring(0, 6) + '...' + userAddress.substring(userAddress.length - 4);
            connectWalletBtn.classList.remove('btn-light');
            connectWalletBtn.classList.add('btn-success');
        } else {
            connectWalletBtn.textContent = 'Connect Wallet';
            connectWalletBtn.classList.remove('btn-success');
            connectWalletBtn.classList.add('btn-light');
        }
    }
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

// Function to disconnect wallet (for demo purposes)
function disconnectWallet() {
    walletConnected = false;
    userAddress = null;
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('userAddress');
    updateWalletUI();
}