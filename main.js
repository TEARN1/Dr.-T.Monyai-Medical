import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCustomCursor();
    initLiquidBackground();
    initDNAHelix();
    initParticles();
    createAdvancedMedicalSphere();
    initHeartModel();
    initVitals();
    initBentoTilt();
    initTextReveal();
    initWaterRipple();
    initAdvancedParallax();
    initScrollProgress();
    initMagneticNav();
    initServiceModals();
    initPatientPortal();
    initBodyMap();
    initBMICalculator();
    initScrollPathDrawing();
    initScrollTop();
    initClinicStatus();
    loadNews();
    initContactForm();
    initNewsletterForm();
    initChatWidget();
    initVoiceCommands();
    initBookingSystem();
    initFAQ();
    initCookieConsent();
    initMobileMenu();
    initStickyHeader();
    
    // Remove skeleton loaders after 1.5s
    setTimeout(() => {
        document.querySelectorAll('.skeleton').forEach(el => el.classList.remove('skeleton'));
    }, 1500);
});

// --- FAQ ---
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

// --- Booking System ---
function initBookingSystem() {
    const btn = document.getElementById('hero-book-btn');
    const modal = document.getElementById('booking-modal');
    const form = document.getElementById('booking-form');
    const status = document.getElementById('booking-status');

    if (!btn || !modal) return;

    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = 'Processing...';
        
        setTimeout(() => {
            status.innerHTML = '<span style="color: #4caf50;">Appointment requested! We will call you to confirm.</span>';
            form.reset();
            setTimeout(() => {
                modal.style.display = 'none';
                status.textContent = '';
            }, 3000);
        }, 1500);
    });
}

// --- Voice Commands ---
function initVoiceCommands() {
    const btn = document.getElementById('voice-trigger');
    if (!btn) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        btn.style.display = 'none';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    btn.addEventListener('click', () => {
        if (btn.classList.contains('listening')) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

    recognition.onstart = () => {
        btn.classList.add('listening');
    };

    recognition.onend = () => {
        btn.classList.remove('listening');
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log('Voice Command:', command);

        if (command.includes('about')) {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('service')) {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('contact') || command.includes('book')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('dark mode') || command.includes('theme')) {
            document.getElementById('theme-toggle').click();
        } else if (command.includes('chat') || command.includes('help')) {
            document.getElementById('open-chat').click();
        }
    };
}

// --- Chat Widget ---
function initChatWidget() {
    const widget = document.getElementById('chat-widget');
    const openBtn = document.getElementById('open-chat');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-chat');
    const input = document.getElementById('chat-input-field');
    const messages = document.getElementById('chat-messages');

    if (!widget) return;

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            widget.style.display = widget.style.display === 'flex' ? 'none' : 'flex';
            if (messages.children.length === 0) {
                addMessage('Hello! I am your AI medical assistant. How can I help you today?', 'bot');
            }
        });
    }

    closeBtn.addEventListener('click', () => widget.style.display = 'none');

    const addMessage = (text, type) => {
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    };

    const handleSend = () => {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        
        setTimeout(() => {
            let response = "I'm sorry, I'm still learning. Please contact our clinic directly for specific medical advice.";
            const lower = text.toLowerCase();
            if (lower.includes('appointment') || lower.includes('book')) response = "You can book an appointment using the 'Book Now' button in the header or hero section!";
            if (lower.includes('hours') || lower.includes('open')) response = "We are open Monday to Friday, 8 AM to 5 PM, and Saturdays 9 AM to 1 PM.";
            if (lower.includes('location') || lower.includes('where')) response = "We are located at 123 Health St, Johannesburg.";
            if (lower.includes('emergency')) response = "If this is a medical emergency, please call 112 or your local emergency number immediately.";
            
            addMessage(response, 'bot');
        }, 1000);
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

function initPatientPortal() {
    const portalCard = document.querySelector('.portal-card');
    if (!portalCard) return;

    portalCard.addEventListener('click', () => {
        const modal = document.getElementById('service-modal');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="portal-dashboard">
                <h2>Patient Portal Dashboard</h2>
                <div class="portal-stats">
                    <div class="stat-item">
                        <span class="stat-label">Next Appointment</span>
                        <span class="stat-value">Oct 24, 2026</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Recent Lab Results</span>
                        <span class="stat-value positive">Normal</span>
                    </div>
                </div>
                <div class="portal-actions">
                    <button class="portal-btn glass">View Medical Records</button>
                    <button class="portal-btn glass" id="generate-report-btn">Generate Health Report</button>
                    <button class="portal-btn glass">Message Doctor</button>
                </div>
                <div class="portal-records" style="display:none; margin-top: 20px;">
                    <h4>Recent Records</h4>
                    <ul style="list-style:none; padding:0;">
                        <li style="padding:10px; border-bottom:1px solid var(--glass-border);">Annual Checkup - Sept 2025</li>
                        <li style="padding:10px; border-bottom:1px solid var(--glass-border);">Blood Work - June 2025</li>
                    </ul>
                </div>
                <div id="report-status" style="margin-top: 15px; font-size: 0.9rem; color: var(--primary);"></div>
            </div>
        `;
        
        const recordsBtn = modalBody.querySelector('.portal-btn');
        const recordsDiv = modalBody.querySelector('.portal-records');
        recordsBtn.addEventListener('click', () => {
            recordsDiv.style.display = recordsDiv.style.display === 'none' ? 'block' : 'none';
        });

        const reportBtn = modalBody.querySelector('#generate-report-btn');
        const reportStatus = modalBody.querySelector('#report-status');
        reportBtn.addEventListener('click', () => {
            reportStatus.textContent = 'Analyzing health data...';
            setTimeout(() => {
                reportStatus.textContent = 'Report generated! Downloading...';
                setTimeout(() => {
                    reportStatus.textContent = 'Health_Report_2026.pdf downloaded successfully.';
                    createConfetti();
                }, 2000);
            }, 2000);
        });

        modal.style.display = 'flex';
    });
}

// --- Newsletter ---
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const status = document.getElementById('newsletter-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = 'Subscribing...';
        status.style.color = 'var(--primary)';
        
        // Mock subscription
        setTimeout(() => {
            status.textContent = 'Thank you for subscribing!';
            form.reset();
        }, 1500);
    });
}

// --- Clinic Status ---
function initClinicStatus() {
    const statusEl = document.getElementById('clinic-status');
    if (!statusEl) return;

    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    const hour = now.getHours();
    
    let isOpen = false;
    if (day >= 1 && day <= 5) { // Mon-Fri
        if (hour >= 9 && hour < 17) isOpen = true;
    } else if (day === 6) { // Sat
        if (hour >= 9 && hour < 13) isOpen = true;
    }

    if (isOpen) {
        statusEl.innerHTML = '<span style="color: #4caf50;">● Open Now</span> · Closes ' + (day === 6 ? '1 pm' : '5 pm');
    } else {
        statusEl.innerHTML = '<span style="color: #ff4081;">● Closed</span> · Opens 9 am';
    }
}

// --- Custom Interactive Cursor ---
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('cursor-dot');
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .bento-item, .testimonial-card, .info-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            el.style.transform = '';
        });

        el.addEventListener('mousemove', (e) => {
            if (el.tagName === 'A' || el.tagName === 'BUTTON') {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            }
        });
    });
}

// --- 3D Shaders & Models ---

function initLiquidBackground() {
    const canvas = document.getElementById('liquid-bg');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
            varying vec2 vUv;
            void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
        `,
        fragmentShader: `
            uniform float u_time;
            uniform vec2 u_resolution;
            varying vec2 vUv;
            void main() {
                vec2 uv = vUv;
                float time = u_time * 0.15;
                vec3 color = vec3(0.9, 0.98, 1.0);
                for(float i = 1.0; i < 4.0; i++) {
                    uv.x += 0.3 / i * sin(i * 3.0 * uv.y + time);
                    uv.y += 0.3 / i * cos(i * 3.0 * uv.x + time);
                }
                color += 0.05 * sin(uv.x * 10.0 + time);
                gl_FragColor = vec4(color, 0.3);
            }
        `,
        transparent: true
    });

    scene.add(new THREE.Mesh(geometry, material));

    function animate() {
        uniforms.u_time.value = performance.now() * 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    });
}

function initDNAHelix() {
    const canvas = document.getElementById('dna-helix-bg');
    if (!canvas) return;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    const dnaGroup = new THREE.Group();
    const sphereGeom = new THREE.SphereGeometry(0.1, 16, 16);
    const blueMat = new THREE.MeshPhongMaterial({ color: 0x00e0ff, emissive: 0x004466 });
    const greenMat = new THREE.MeshPhongMaterial({ color: 0x4caf50, emissive: 0x002200 });
    
    for (let i = 0; i < 60; i++) {
        const y = (i - 30) * 0.5;
        const angle = i * 0.3;
        
        const s1 = new THREE.Mesh(sphereGeom, blueMat);
        s1.position.set(Math.cos(angle) * 3, y, Math.sin(angle) * 3);
        dnaGroup.add(s1);
        
        const s2 = new THREE.Mesh(sphereGeom, greenMat);
        s2.position.set(Math.cos(angle + Math.PI) * 3, y, Math.sin(angle + Math.PI) * 3);
        dnaGroup.add(s2);
        
        const lineGeom = new THREE.CylinderGeometry(0.01, 0.01, 6);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05 });
        const line = new THREE.Mesh(lineGeom, lineMat);
        line.position.set(0, y, 0);
        line.rotation.z = Math.PI / 2;
        line.rotation.y = -angle;
        dnaGroup.add(line);
    }
    
    scene.add(dnaGroup);
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));
    
    function animate() {
        dnaGroup.rotation.y += 0.003;
        dnaGroup.rotation.x = window.scrollY * 0.0002;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // Add floating data points
    const dataPoints = [
        { label: 'Purity', value: '99.9%' },
        { label: 'Viscosity', value: 'High' },
        { label: 'Temp', value: '36.5°C' }
    ];
    
    dataPoints.forEach((dp, i) => {
        const el = document.createElement('div');
        el.className = 'hero-data-point glass';
        el.innerHTML = `<strong>${dp.label}</strong><span>${dp.value}</span>`;
        el.style.position = 'absolute';
        el.style.left = (20 + i * 30) + '%';
        el.style.top = (30 + i * 20) + '%';
        el.style.padding = '10px 20px';
        el.style.borderRadius = '15px';
        el.style.fontSize = '0.8rem';
        el.style.zIndex = '15';
        el.style.opacity = '0.7';
        document.getElementById('hero-3d-sphere').appendChild(el);
        
        // Animate floating
        let angle = Math.random() * Math.PI * 2;
        function float() {
            angle += 0.02;
            el.style.transform = `translateY(${Math.sin(angle) * 10}px)`;
            requestAnimationFrame(float);
        }
        float();
    });
}

function initParticles() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = Array.from({length: 50}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 3,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? '#00e0ff' : '#4caf50',
        alpha: 0.1 + Math.random() * 0.3
    }));

    function draw() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > width) p.dx *= -1;
            if (p.y < 0 || p.y > height) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

function createAdvancedMedicalSphere() {
    const canvas = document.getElementById('medical-sphere-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 2.5;

    const geometry = new THREE.IcosahedronGeometry(1, 128);
    const uniforms = {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector3() },
        u_velocity: { value: 0 },
        u_pulse: { value: 0 },
        u_click: { value: 0 },
        u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) }
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying float vDistortion;
            varying vec3 vWorldPosition;
            uniform float u_time;
            uniform vec3 u_mouse;
            uniform float u_velocity;
            uniform float u_pulse;
            uniform float u_click;

            // Simplex 3D Noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                vec3 i  = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;
                i = mod289(i);
                vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);
                vec4 x = x_ * ns.x + ns.yyyy;
                vec4 y = y_ * ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);
                vec4 s0 = floor(b0) * 2.0 + 1.0;
                vec4 s1 = floor(b1) * 2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
                vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
            }

            void main() {
                vNormal = normalize(normalMatrix * normal);
                
                // Subtle Space Wobble
                float noise = snoise(position * 1.5 + u_time * 0.2);
                
                // Magnetic Attraction Effect
                float dist = distance(position, u_mouse);
                float magneticPull = smoothstep(1.5, 0.0, dist) * 0.3;
                
                // Click Explosion Effect
                float explosion = u_click * snoise(position * 4.0 + u_time) * 0.4;
                
                vDistortion = noise * 0.05 + magneticPull + explosion;
                vec3 newPosition = position + normal * vDistortion;
                
                // Floating Motion
                newPosition.y += sin(u_time * 0.5) * 0.1;
                
                vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
                vWorldPosition = worldPosition.xyz;
                
                vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
                vViewPosition = -mvPosition.xyz;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying float vDistortion;
            varying vec3 vWorldPosition;
            uniform float u_time;

            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                
                // Fresnel for space-like edge glow
                float fresnel = pow(1.0 - dot(normal, viewDir), 5.0);
                
                // Procedural Space Reflection
                vec3 reflectDir = reflect(-viewDir, normal);
                
                // Distant stars in reflection
                float stars = pow(fract(sin(dot(reflectDir, vec3(12.9898, 78.233, 45.164))) * 43758.5453), 32.0);
                
                // Nebula-like color variations
                float nebula = smoothstep(0.4, 1.0, sin(reflectDir.x * 2.0 + u_time * 0.05) * cos(reflectDir.z * 2.0));
                
                // Base Space Silver (Chrome)
                vec3 silver = vec3(0.95, 0.96, 1.0);
                vec3 deepSpace = vec3(0.01, 0.02, 0.05);
                
                vec3 color = mix(deepSpace, silver, nebula * 0.4 + 0.1);
                color += stars * 1.2; // Bright stars
                color = mix(color, silver, fresnel * 0.8);
                
                // Subtle iridescence (Space oil effect)
                vec3 irid = vec3(
                    sin(reflectDir.x * 10.0),
                    sin(reflectDir.y * 10.0),
                    sin(reflectDir.z * 10.0)
                ) * 0.05 * fresnel;
                color += irid;
                
                // Specular highlights from "Distant Suns"
                float spec = pow(max(dot(reflectDir, normalize(vec3(1.0, 1.0, 1.0))), 0.0), 128.0);
                spec += pow(max(dot(reflectDir, normalize(vec3(-1.0, 0.5, -1.0))), 0.0), 64.0);
                color += spec * 0.8;
                
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        transparent: true
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Mouse tracking for interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let lastMousePos = new THREE.Vector2();
    let clickEffect = 0;

    window.addEventListener('mousedown', () => { clickEffect = 1.0; });
    window.addEventListener('mouseup', () => { clickEffect = 0.0; });

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(sphere);
        if (intersects.length > 0) {
            uniforms.u_mouse.value.copy(intersects[0].point);
            canvas.style.cursor = 'none';
        } else {
            uniforms.u_mouse.value.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        }
    });

    function animate() {
        const time = performance.now() * 0.001;
        uniforms.u_time.value = time;
        uniforms.u_click.value = THREE.MathUtils.lerp(uniforms.u_click.value, clickEffect, 0.1);

        sphere.rotation.y += 0.003;
        sphere.rotation.z += 0.001;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        uniforms.u_resolution.value.set(width, height);
    });
}


function initHeartModel() {
    const container = document.getElementById('heart-canvas');
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Advanced Heart Shader Material
    const heartUniforms = {
        u_time: { value: 0 },
        u_pulse: { value: 0 },
        u_color: { value: new THREE.Color('#ff4081') },
        u_glowColor: { value: new THREE.Color('#ff80ab') }
    };

    const heartMaterial = new THREE.ShaderMaterial({
        uniforms: heartUniforms,
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            uniform float u_time;
            uniform float u_pulse;

            void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = position;
                
                // Organic heart deformation
                vec3 pos = position;
                float heartShape = 1.0;
                
                // Mathematical heart shape deformation
                // x^2 + (9/4)y^2 + z^2 - 1 = 0
                float pulseEffect = u_pulse * 0.15;
                pos *= (1.0 + pulseEffect);
                
                // Add some organic wobble
                pos.x += sin(pos.y * 5.0 + u_time) * 0.02;
                pos.z += cos(pos.x * 5.0 + u_time) * 0.02;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            uniform vec3 u_color;
            uniform vec3 u_glowColor;
            uniform float u_pulse;

            void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                vec3 glow = u_glowColor * intensity;
                
                // Add "vein" patterns
                float veins = sin(vPosition.x * 20.0) * sin(vPosition.y * 20.0) * sin(vPosition.z * 20.0);
                veins = smoothstep(0.8, 1.0, veins);
                
                vec3 finalColor = mix(u_color, u_glowColor, intensity + veins * 0.5);
                finalColor += u_pulse * 0.2; // Brighten on pulse
                
                gl_FragColor = vec4(finalColor, 0.9);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide
    });

    // Create a more organic heart geometry using a subdivided sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const positions = geometry.attributes.position.array;
    
    // Deform sphere into a heart shape
    for (let i = 0; i < positions.length; i += 3) {
        let x = positions[i];
        let y = positions[i+1];
        let z = positions[i+2];
        
        // Heart formula: (x^2 + (9/4)y^2 + z^2 - 1)^3 - x^2z^3 - (9/80)y^2z^3 = 0
        // Simplified deformation for better performance
        positions[i] *= 1.2;
        positions[i+1] *= 1.2;
        if (y > 0) {
            positions[i] *= (1.0 + y * 0.5);
        }
        positions[i+2] *= 0.8;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    const heart = new THREE.Mesh(geometry, heartMaterial);
    scene.add(heart);

    // Add a holographic ring around the heart
    const ringGeom = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e0ff, transparent: true, opacity: 0.3 });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Add scanning particles
    const partCount = 200;
    const partGeom = new THREE.BufferGeometry();
    const partPos = new Float32Array(partCount * 3);
    for(let i=0; i<partCount*3; i++) partPos[i] = (Math.random() - 0.5) * 5;
    partGeom.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({ color: 0x00e0ff, size: 0.02, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(partGeom, partMat);
    scene.add(particles);

    function animate() {
        const time = performance.now() * 0.001;
        heartUniforms.u_time.value = time;
        
        // Realistic "Lub-Dub" Heartbeat
        let pulse = 0;
        const cycle = time % 1.5;
        if (cycle < 0.2) {
            pulse = Math.sin((cycle / 0.2) * Math.PI);
        } else if (cycle > 0.3 && cycle < 0.5) {
            pulse = Math.sin(((cycle - 0.3) / 0.2) * Math.PI) * 0.7;
        }
        
        heartUniforms.u_pulse.value = pulse;
        heart.scale.set(1 + pulse * 0.1, 1 + pulse * 0.1, 1 + pulse * 0.1);
        
        // Update BPM display with slight variation
        if (Math.random() > 0.98) {
            const bpmEl = document.getElementById('heart-bpm');
            if (bpmEl) {
                const currentBpm = parseInt(bpmEl.textContent);
                const variation = Math.floor(Math.random() * 3) - 1;
                bpmEl.textContent = Math.min(85, Math.max(65, currentBpm + variation));
            }
        }
        
        heart.rotation.y += 0.005;
        ring.rotation.z += 0.01;
        ring.position.y = Math.sin(time) * 0.1;
        
        particles.rotation.y += 0.001;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}


// --- UI Interactivity ---

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (bar) bar.style.width = scrolled + "%";
    });
}

function initMagneticNav() {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            link.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}

function initServiceModals() {
    const modal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const bentoItems = document.querySelectorAll('.bento-item:not(.portal-card):not(.bmi-card):not(.vitals-card)');

    const serviceData = {
        'General Practitioner': {
            desc: 'Our GP services provide comprehensive medical care for patients of all ages. With over 15 years of experience, Dr. T. Monyai offers expert diagnosis, treatment, and preventative care.',
            features: ['Chronic Disease Management', 'Pediatric Care', 'Preventative Screenings', 'Minor Surgical Procedures'],
            icon: '👨‍⚕️'
        },
        'Dental Services': {
            desc: 'Professional dental care including routine checkups, advanced cleaning, fillings, and specialized procedures to ensure your oral health is at its best.',
            features: ['Teeth Whitening', 'Root Canal Treatment', 'Dental Implants', 'Orthodontics Consultation'],
            icon: '🦷'
        },
        'In-house Stitching': {
            desc: 'Immediate and professional care for fresh wounds. Our in-house stitching service ensures quick recovery and minimal scarring.',
            features: ['Emergency Wound Care', 'Local Anesthesia', 'Suture Removal', 'Scar Management Advice'],
            icon: '🩹'
        },
        'Diagnostics': {
            desc: 'State-of-the-art laboratory and screening services for accurate and timely results, helping us provide the best possible treatment plans.',
            features: ['Blood Tests', 'X-Ray Referrals', 'ECG Monitoring', 'Genomic Screening'],
            icon: '🔬'
        }
    };

    bentoItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const data = serviceData[title];
            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-service-header">
                        <span class="modal-icon">${data.icon}</span>
                        <h2>${title}</h2>
                    </div>
                    <p class="modal-desc">${data.desc}</p>
                    <div class="modal-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${data.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <a href="#contact" class="modal-book-btn glass">Book This Service</a>
                `;
                modal.style.display = 'flex';
                
                // Close modal when clicking the book button
                modalBody.querySelector('.modal-book-btn').addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

function initVitals() {
    const bpEl = document.querySelector('.vitals-data span:first-child');
    const o2El = document.querySelector('.vitals-data span:last-child');
    
    if (!bpEl || !o2El) return;

    setInterval(() => {
        // Simulate slight fluctuations
        const bpSys = 115 + Math.floor(Math.random() * 10);
        const bpDia = 75 + Math.floor(Math.random() * 10);
        const o2 = 97 + Math.floor(Math.random() * 3);
        
        bpEl.textContent = `BP: ${bpSys}/${bpDia}`;
        o2El.textContent = `O2: ${o2}%`;
    }, 3000);
}

function initBentoTilt() {
    const items = document.querySelectorAll('.bento-item:not(.flip-card):not(.bmi-card), .testimonial-card, .info-card');
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            item.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-5px)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
}

function initTextReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                entry.target.classList.remove('reveal-hidden');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('h2, h3, .hero-overlay h2, .hero-overlay p, .bento-item, .testimonial-card, .info-card, .about-content').forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });
}

function initWaterRipple() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
}

function initAdvancedParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            layer.style.transform = `translateY(${-(scrolled * speed)}px)`;
        });
        
        const hero = document.getElementById('hero-3d-sphere');
        if (hero) hero.style.transform = `translateY(${scrolled * 0.15}px)`;
    });
}

// --- Data & Forms ---

async function loadNews() {
    const container = document.getElementById('news-container');
    const searchInput = document.getElementById('news-search');
    if (!container) return;

    // Show skeletons
    container.innerHTML = Array(3).fill(0).map(() => `
        <div class="news-article glass skeleton">
            <div style="height: 24px; margin-bottom: 10px;"></div>
            <div style="height: 14px; width: 50%; margin-bottom: 15px;"></div>
            <div style="height: 60px;"></div>
        </div>
    `).join('');

    try {
        const res = await fetch('news.json');
        const news = await res.json();
        
        // Artificial delay for skeleton demo
        setTimeout(() => {
            const renderNews = (data) => {
                if (data.length === 0) {
                    container.innerHTML = '<p>No articles found matching your search.</p>';
                    return;
                }
                container.innerHTML = data.map(item => `
                    <div class="news-article glass">
                        <h3>${item.title}</h3>
                        <p class="date">${new Date(item.date).toLocaleDateString()}</p>
                        <p>${item.summary}</p>
                        <a href="${item.link}" class="read-more">Read More →</a>
                    </div>
                `).join('');
            };

            renderNews(news);

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const term = e.target.value.toLowerCase();
                    const filtered = news.filter(item => 
                        item.title.toLowerCase().includes(term) || 
                        item.summary.toLowerCase().includes(term)
                    );
                    renderNews(filtered);
                });
            }
        }, 1000);
    } catch (e) {
        container.innerHTML = '<p>Latest updates coming soon...</p>';
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = 'Sending...';
        
        const data = new FormData(e.target);
        fetch(e.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.textContent = 'Message sent successfully! We will contact you soon.';
                form.reset();
                createConfetti();
            } else {
                status.textContent = "Oops! There was a problem submitting your form";
            }
        }).catch(error => {
            status.textContent = "Oops! There was a problem submitting your form";
        });
    });
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

function initCookieConsent() {
    const banner = document.getElementById('cookie-consent-banner');
    const btn = document.getElementById('accept-cookies');
    if (!banner || !btn) return;

    if (localStorage.getItem('cookies-accepted')) {
        banner.style.display = 'none';
    }

    btn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        banner.style.opacity = '0';
        setTimeout(() => banner.style.display = 'none', 500);
    });
}

function initBodyMap() {
    const parts = document.querySelectorAll('.body-part');
    const infoBox = document.getElementById('part-info');
    
    const partData = {
        'Head': { title: 'Neurology & ENT', desc: 'Specialized care for headaches, sinus issues, and neurological health.' },
        'Chest': { title: 'Cardiology & Pulmonology', desc: 'Heart and lung health monitoring with advanced diagnostics.' },
        'Arms': { title: 'Orthopedics', desc: 'Joint and muscle care for upper extremities and sports injuries.' },
        'Legs': { title: 'Physiotherapy', desc: 'Mobility support and rehabilitation for lower body health.' }
    };

    parts.forEach(part => {
        part.addEventListener('click', () => {
            const partName = part.getAttribute('data-part');
            const data = partData[partName];
            
            infoBox.style.opacity = 0;
            setTimeout(() => {
                infoBox.innerHTML = '<h3>' + data.title + '</h3><p>' + data.desc + '</p>';
                infoBox.style.opacity = 1;
            }, 200);
        });
    });
}

function initBMICalculator() {
    const btn = document.getElementById('calc-bmi-btn');
    const result = document.getElementById('bmi-result');
    
    if (!btn) return;

    btn.addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('bmi-weight').value);
        const height = parseFloat(document.getElementById('bmi-height').value) / 100;

        if (weight > 0 && height > 0) {
            const bmi = (weight / (height * height)).toFixed(1);
            let category = '';
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';
            
            result.innerHTML = 'Result: ' + bmi + ' (' + category + ')';
            result.style.color = category === 'Normal' ? '#4caf50' : '#ff4081';
        } else {
            result.innerHTML = 'Please enter valid values';
        }
    });
}

function initScrollPathDrawing() {
    const path = document.querySelector('.scroll-path');
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
        const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        const drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;
    });
}

function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggle.checked = true;
        }
    }

    toggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('main-nav');
    const links = nav.querySelectorAll('a');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initStickyHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
