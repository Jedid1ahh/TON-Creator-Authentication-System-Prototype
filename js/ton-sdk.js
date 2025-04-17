// ton-sdk.js

// This is a mock of the TON SDK for prototype purposes

const TonSDK = {
    isWebExtensionAvailable: function() {
        // Simulate checking if TON wallet extension is available
        return Promise.resolve(true);
    },
    
    requestConnection: function() {
        // Simulate requesting connection to wallet
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    address: "0:" + generateRandomHex(64),
                    publicKey: generateRandomHex(64),
                    walletVersion: "v4R2"
                });
            }, 1000);
        });
    },
    
    disconnect: function() {
        // Simulate disconnecting from wallet
        return Promise.resolve(true);
    },
    
    getBalance: function() {
        // Simulate getting wallet balance
        return Promise.resolve("10.5");
    },
    
    sendTransaction: function(params) {
        // Simulate sending a transaction
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    transactionId: "0x" + generateRandomHex(64)
                });
            }, 2000);
        });
    },
    
    signData: function(data) {
        // Simulate signing data
        return Promise.resolve({
            signature: "0x" + generateRandomHex(128)
        });
    }
};

// Helper function to generate random hex string
function generateRandomHex(length) {
    let result = '';
    const characters = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// If this was a real implementation, we would expose the SDK globally
window.TonSDK = TonSDK;