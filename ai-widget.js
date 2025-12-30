document.addEventListener("DOMContentLoaded", function() {
    // 1. INJECT FONTS (Inter - Professional Font)
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // 2. WIDGET HTML (Clean & Minimalist)
    const widgetHTML = `
    <div id="ai-widget-container" style="position: fixed; bottom: 110px; right: 30px; z-index: 9999; font-family: 'Inter', sans-serif;">
        
        <div id="ai-chat-box" style="display: none; width: 380px; height: 550px; background: rgba(20, 20, 30, 0.85); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3); flex-direction: column; overflow: hidden; transform-origin: bottom right; animation: scaleIn 0.2s ease-out;">
            
            <div style="padding: 20px 24px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                        <i class="fas fa-sparkles" style="color: white; font-size: 0.9rem;"></i>
                    </div>
                    <div>
                        <span style="color: white; font-weight: 600; font-size: 0.95rem; display: block; letter-spacing: 0.3px;">Chandra Assistant</span>
                        <span style="color: #94a3b8; font-size: 0.75rem; display: block;">Powered by Gemini Pro</span>
                    </div>
                </div>
                <button onclick="toggleChat()" style="background: none; border: none; color: #64748b; cursor: pointer; transition: 0.2s; padding: 5px;">
                    <i class="fas fa-times" style="font-size: 1.1rem;"></i>
                </button>
            </div>

            <div id="ai-messages" style="flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <div style="width: 28px; height: 28px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="fas fa-robot" style="color: #94a3b8; font-size: 0.8rem;"></i>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 0 12px 12px 12px; color: #e2e8f0; font-size: 0.9rem; line-height: 1.5; border: 1px solid rgba(255,255,255,0.05);">
                        Welcome! I can help you deploy apps or find professionals (like Photographers) on our cloud. How can I help?
                    </div>
                </div>
            </div>

            <div style="padding: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                <div style="position: relative; display: flex; align-items: center;">
                    <input type="text" id="ai-user-input" placeholder="Ask anything..." style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 14px 45px 14px 16px; border-radius: 12px; font-size: 0.9rem; outline: none; transition: 0.3s; font-family: 'Inter', sans-serif;">
                    <button onclick="sendMessage()" style="position: absolute; right: 8px; background: #3b82f6; border: none; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s;">
                        <i class="fas fa-arrow-up" style="color: white; font-size: 0.9rem;"></i>
                    </button>
                </div>
                <div style="text-align: center; margin-top: 8px;">
                    <span style="font-size: 0.7rem; color: #64748b;">Powered by Chandra Neural Engine</span>
                </div>
            </div>
        </div>

        <div id="ai-trigger-btn" onclick="toggleChat()" style="width: 56px; height: 56px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4); transition: transform 0.2s ease;">
            <i class="fas fa-comment-dots" style="color: white; font-size: 1.5rem;"></i>
        </div>
    </div>

    <style>
        /* Hover Effects */
        #ai-trigger-btn:hover { transform: scale(1.05); background: #2563eb; }
        #ai-user-input:focus { border-color: #3b82f6; background: rgba(0,0,0,0.4); }
        
        /* Scrollbar */
        #ai-messages::-webkit-scrollbar { width: 4px; }
        #ai-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        /* Animations */
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Enter Key Listener
    document.getElementById('ai-user-input').addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });
});

// 2. LOGIC FUNCTIONS
function toggleChat() {
    const box = document.getElementById('ai-chat-box');
    const btn = document.getElementById('ai-trigger-btn');
    
    if (box.style.display === 'none') {
        box.style.display = 'flex';
        btn.style.transform = 'scale(0)';
        setTimeout(() => document.getElementById('ai-user-input').focus(), 100);
    } else {
        box.style.display = 'none';
        btn.style.transform = 'scale(1)';
    }
}

async function sendMessage() {
    const input = document.getElementById('ai-user-input');
    const msgArea = document.getElementById('ai-messages');
    const userText = input.value.trim();

    if (!userText) return;

    // A. User Message Bubble
    msgArea.innerHTML += `
        <div style="display: flex; justify-content: flex-end; animation: fadeIn 0.3s ease;">
            <div style="background: #3b82f6; color: white; padding: 10px 16px; border-radius: 12px 12px 0 12px; font-size: 0.9rem; max-width: 80%; line-height: 1.5; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);">
                ${userText}
            </div>
        </div>`;
    input.value = "";
    msgArea.scrollTop = msgArea.scrollHeight;

    // B. Loading Indicator
    const loadingId = "loading-" + Date.now();
    msgArea.innerHTML += `
        <div id="${loadingId}" style="display: flex; gap: 12px; align-items: center; margin-top: 10px;">
            <div style="width: 28px; height: 28px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-robot" style="color: #94a3b8; font-size: 0.8rem;"></i>
            </div>
            <div style="color: #94a3b8; font-size: 0.8rem; font-style: italic;">Thinking...</div>
        </div>`;
    msgArea.scrollTop = msgArea.scrollHeight;

    // C. CALL THE BRAIN (🔥 CONNECTED HERE)
    const backendUrl = "https://chandra-ai-brain-845756299432.us-central1.run.app"; 

    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        const reply = data.reply || "I am connected, but I have no words.";

        // Remove Loading & Show Reply
        document.getElementById(loadingId).remove();
        msgArea.innerHTML += `
            <div style="display: flex; gap: 12px; align-items: flex-start; animation: fadeIn 0.3s ease;">
                <div style="width: 28px; height: 28px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-robot" style="color: #94a3b8; font-size: 0.8rem;"></i>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 0 12px 12px 12px; color: #e2e8f0; font-size: 0.9rem; line-height: 1.5; border: 1px solid rgba(255,255,255,0.05);">
                    ${reply}
                </div>
            </div>`;
        
        // Link Clickable Logic (Formatting)
        const links = msgArea.querySelectorAll('a');
        links.forEach(link => { link.style.color = '#3b82f6'; link.style.textDecoration = 'underline'; });

        msgArea.scrollTop = msgArea.scrollHeight;

    } catch (error) {
        document.getElementById(loadingId).remove();
        msgArea.innerHTML += `
            <div style="margin-top: 10px; color: #ff6b6b; font-size: 0.8rem; text-align: center;">
                ⚠️ Brain Offline: ${error.message}
            </div>`;
    }
}
