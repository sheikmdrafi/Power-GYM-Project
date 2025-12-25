// Mobile Menu Logic
document.querySelector(".mobile-btn").addEventListener("click", function () {
    document.querySelector(".menu").classList.toggle("active");
});

// --- CHATBOT LOGIC ---

// Toggle Chat Window
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    const notification = document.getElementById('chatNotification');

    if (chatBox.style.display === 'flex') {
        chatBox.style.display = 'none';
    } else {
        chatBox.style.display = 'flex';
        // Hide notification badge when opened
        if(notification) notification.style.display = 'none';
    }
}

// Handle Quick Options (Button Click)
function handleOption(option) {
    let message = "";
    
    // Check kon button click kora hoise
    if (option === 'fees') {
        message = "Admission & Fees?";
    } else if (option === 'time') {
        message = "Gym Timings?";
    } else if (option === 'ladies') {
        message = "Ladies Section?";
    }

    // Jodi message khali na thake, tahole send koro
    if (message !== "") {
        sendMessageManual(message);
    }
}

// Message Send Function (Manual Text or Button)
function sendMessage() {
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
    
    if (message !== "") {
        sendMessageManual(message);
        inputField.value = ''; // Input clear koro
    }
}

// Helper function to process message
function sendMessageManual(msgText) {
    addMessage(msgText, 'user-message');
    
    // Bot reply delay
    setTimeout(() => {
        getBotResponse(msgText);
    }, 500);
}

// Enter Key Listener
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add Message to UI
function addMessage(text, className) {
    const chatBody = document.getElementById('chatBody');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(className);
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Bot Response Logic (Main Logic)
function getBotResponse(input) {
    // Sob text choto hater (lowercase) kore newa hocche matching er jonno
    const lowerInput = input.toLowerCase();
    let reply = "";

    // 1. Time / Schedule Check (Ekhane 'time', 'timing', 'schedule' thaklei hobe)
    if (lowerInput.includes("time") || lowerInput.includes("timing") || lowerInput.includes("schedule") || lowerInput.includes("open") || lowerInput.includes("khola")) {
        reply = `Power Gym Weekly Schedule:
        
        Mon - Thu: 6:30 AM - 11:00 PM
        Friday: 4:00 PM - 10:00 PM
        Sat - Sun: 6:30 AM - 11:00 PM
        
        Note: Sanarpar & Siddhirganj (Combined), Saddam Market (Separate Ladies Section).`;
    }
    // 2. Fees / Admission Check
    else if (lowerInput.includes("price") || lowerInput.includes("fee") || lowerInput.includes("cost") || lowerInput.includes("money") || lowerInput.includes("package") || lowerInput.includes("admission")) {
        reply = `Power Gym Membership Options:
        
        1. Regular Membership:
        - Admission Fee: 2000/-
        - Monthly Fee: 600/-
        
        2. Package System:
        - 1 Month: 1500/-
        - 2 Months: 2100/-
        - 3 Months: 2700/-
        - 6 Months: 4200/-
        - 12 Months: 7200/- (Free Membership)
        
        WhatsApp: 01674643870`;
    } 
    // 3. Ladies Section Check
    else if (lowerInput.includes("ladies") || lowerInput.includes("girl") || lowerInput.includes("woman") || lowerInput.includes("female")) {
        reply = `Yes! Our Saddam Market Branch has a dedicated and private workout space for ladies ensuring full privacy and safety.`;
    }
    // 4. Greeting
    else if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
        reply = "Hi! How can I help you regarding Power Gym?";
    }
    // 5. Default
    else {
        reply = "I didn't understand. Please click on the buttons above or ask about 'Fees' or 'Time'.";
    }

    addMessage(reply, 'bot-message');
}

// Auto Greeting on Load
window.onload = function() {
    setTimeout(() => {
        const chatBox = document.getElementById('chatBox');
        if(chatBox.style.display !== 'flex') {
             addMessage("Hi Sir/Mam, is there any question? Ask me!", 'bot-message');
        }
    }, 1500);
};
// --- REGISTRATION FORM LOGIC ---

// Open Modal
function openRegister() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "flex"; // Show the modal
}

// Close Modal
function closeRegister() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "none";
}

// Close if clicked outside the box
window.onclick = function(event) {
    const modal = document.getElementById("registerModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle Form Submit
function submitForm(event) {
    event.preventDefault(); // Page reload bondho kora
    
    const name = document.getElementById("regName").value;
    const phone = document.getElementById("regPhone").value;
    const package = document.getElementById("regPackage").value;

    if(name && phone) {
        alert(`Thank you ${name}! Registration request sent for: ${package}.\nWe will contact you at ${phone}.`);
        closeRegister();
        // Optional: Ekhane form data server e pathanor code likhte hobe pore
    } else {
        alert("Please fill all details!");
    }
}