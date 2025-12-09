// --- MESSAGE BOX LOGIC ---
window.showMessageBox = (title, text) => {
    document.getElementById('message-title').textContent = title;
    document.getElementById('message-text').textContent = text;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById('message-box').classList.add('active');
};

window.hideMessageBox = () => {
    document.getElementById('message-overlay').classList.remove('active');
    document.getElementById('message-box').classList.remove('active');
};

// --- PAGE NAVIGATION LOGIC ---
window.showPage = (pageId) => {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
};

// --- GIFT CREATION FLOW ---
window.startGiftCreation = (moment) => {
    document.getElementById('selected-moment').value = moment;
    document.getElementById('current-moment-title').textContent = moment;
    showPage('create-gift');
}

// --- IMAGE UPLOAD PREVIEW ---
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-upload-input');
    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const input = event.target;
            const preview = document.getElementById('upload-preview');
            const status = document.getElementById('upload-status');
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                    status.textContent = input.files[0].name;
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                preview.src = '#';
                preview.style.display = 'none';
                status.textContent = 'Click to upload image or video moment';
            }
        });
    }

    // Initial load: Hide splash and show welcome after a delay
    setTimeout(() => {
        showPage('welcome');
    }, 1500);
    
    // Attach form submission handlers
    document.getElementById('gift-creation-form').addEventListener('submit', handleGiftSubmission);
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmission);
    document.getElementById('register-form').addEventListener('submit', handleRegisterSubmission);
    
    // Render effects on load for the modal
    renderEffects();
});


// --- EFFECT SELECTION LOGIC ---
const effects = [
    { id: 'none', name: 'None', icon: 'fas fa-times-circle' },
    { id: 'confetti', name: 'Confetti', icon: 'fas fa-party-horn' },
    { id: 'sparkle', name: 'Sparkle', icon: 'fas fa-star' },
    { id: 'hearts', name: 'Falling Hearts', icon: 'fas fa-heart' },
];
let selectedEffectId = 'none';

function renderEffects() {
    const container = document.getElementById('effect-grid-container');
    container.innerHTML = '';
    effects.forEach(effect => {
        const isActive = effect.id === selectedEffectId ? 'selected' : '';
        const item = document.createElement('div');
        item.className = `effect-item ${isActive}`;
        item.dataset.effectId = effect.id;
        item.innerHTML = `
            <i class="${effect.icon} effect-icon"></i>
            <div class="effect-name">${effect.name}</div>
        `;
        item.addEventListener('click', () => {
            document.querySelectorAll('.effect-item').forEach(e => e.classList.remove('selected'));
            item.classList.add('selected');
            selectedEffectId = effect.id;
        });
        container.appendChild(item);
    });
}

window.showEffectSelection = () => {
    selectedEffectId = document.getElementById('selected-effect').value || 'none';
    renderEffects();
    document.getElementById('effect-selection-page').classList.add('active');
};

window.hideEffectSelection = () => {
    document.getElementById('effect-selection-page').classList.remove('active');
};

window.applyEffect = () => {
    const effectName = effects.find(e => e.id === selectedEffectId).name;
    document.getElementById('selected-effect').value = selectedEffectId;
    document.getElementById('effect-display').textContent = effectName;
    hideEffectSelection();
};

// --- FORM SUBMISSION HANDLERS ---
function handleGiftSubmission(event) {
    event.preventDefault();

    // Get form values
    const recipientName = document.getElementById('recipient-name').value;
    const senderName = document.getElementById('sender-name').value;
    const message = document.getElementById('gift-message').value;
    const momentType = document.getElementById('selected-moment').value;
    const effect = document.getElementById('selected-effect').value;
    
    // Simulate data saving
    console.log("Simulating gift creation...");
    const giftData = {
        recipientName,
        senderName,
        message,
        momentType,
        effect,
        createdAt: new Date().toISOString(),
    };
    
    // In a real app, data would be sent to a server/database here.
    console.log("Gift Data:", giftData);
    
    // Show success message
    showMessageBox("Success!", `Gift for ${recipientName} created successfully! (Simulated Save)`);
    
    // Reset form
    this.reset();
    document.getElementById('upload-preview').style.display = 'none';
    document.getElementById('upload-status').textContent = 'Click to upload image or video moment';
    document.getElementById('selected-effect').value = 'none';
    document.getElementById('effect-display').textContent = 'None';
}

function handleLoginSubmission(event) {
    event.preventDefault();
    showMessageBox("Login Simulated", "Logging in... In a real app, this would verify credentials and redirect.");
    setTimeout(() => showPage('moment-selection'), 1000);
}

function handleRegisterSubmission(event) {
    event.preventDefault();
    showMessageBox("Registration Simulated", "Account created! You are now logged in.");
    setTimeout(() => showPage('moment-selection'), 1000);
}

// Di bagian form submit handler
document.getElementById('gift-creation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const recipientName = document.getElementById('recipient-name').value;
    const senderName = document.getElementById('sender-name').value;
    const message = document.getElementById('gift-message').value;
    const uploadedImage = document.getElementById('upload-preview').src;
    
    // Simpan data ke localStorage atau variabel
    localStorage.setItem('giftData', JSON.stringify({
        recipient: recipientName,
        sender: senderName,
        message: message,
        image: uploadedImage,
        moment: document.getElementById('selected-moment').value
    }));
    
    // Redirect ke halaman amplop
    window.location.href = 'envelope.html';
});