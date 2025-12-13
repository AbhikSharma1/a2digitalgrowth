// Simple test script to verify contact form functionality
const testContactForm = async () => {
    const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        subject: "Test Subject",
        message: "This is a test message to verify the contact form is working",
        serviceInterest: "web-development"
    };

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Contact form test successful:', result);
        return true;
    } catch (error) {
        console.error('❌ Contact form test failed:', error.message);
        return false;
    }
};

// Test server health first
const testServerHealth = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/health');
        const result = await response.json();
        console.log('✅ Server health check:', result.message);
        return true;
    } catch (error) {
        console.error('❌ Server health check failed:', error.message);
        return false;
    }
};

// Run tests
const runTests = async () => {
    console.log('🧪 Running contact form tests...\n');
    
    const healthOk = await testServerHealth();
    if (!healthOk) {
        console.log('❌ Server is not running. Please start the backend server first.');
        return;
    }

    const contactOk = await testContactForm();
    
    console.log('\n📊 Test Results:');
    console.log(`Server Health: ${healthOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Contact Form: ${contactOk ? '✅ PASS' : '❌ FAIL'}`);
};

runTests();