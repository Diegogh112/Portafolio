import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAuth as getAuth2, createUserWithEmailAndPassword as createUser2 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, onValue, set, get, child, update, remove, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import firebaseConfig from './firebase-config.js';

// Initialize Main Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Initialize Secondary App (For Admin creating other Admins without logout)
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const secondaryAuth = getAuth2(secondaryApp);

// State
let currentUserRole = null;
let cart = JSON.parse(localStorage.getItem('techStoreCart')) || [];
let productsCache = {};

// Helpers
function showMessage(type, text, containerId = 'message-container') {
    const container = document.getElementById(containerId);
    if (container) {
        container.textContent = text;
        container.className = `message-container message-${type}`;
        container.style.display = 'block';
        setTimeout(() => container.style.display = 'none', 5000);
    } else {
        alert(text);
    }
}

function getFriendlyErrorMessage(code) {
    switch (code) {
        case 'auth/email-already-in-use': return 'Este correo ya está registrado.';
        case 'auth/invalid-email': return 'El correo no es válido.';
        case 'auth/weak-password': return 'La contraseña es muy débil (mínimo 6 caracteres).';
        case 'auth/wrong-password': return 'Contraseña incorrecta.';
        case 'auth/user-not-found':
            return 'No existe una cuenta con este correo. ¿Ya te registraste?';
        case 'auth/operation-not-allowed': return 'Operación no permitida.';
        case 'auth/configuration-not-found': return 'Error de configuración de Firebase.';
        default: return `Error: ${code}`;
    }
}

// Router & Init
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('index.html') || path === '/' || path.endsWith('/');
    const isRegisterPage = path.endsWith('register.html');
    const isStorePage = path.endsWith('store.html');

    if (isLoginPage) setupLogin();
    if (isRegisterPage) setupRegister();
    if (isStorePage) setupStore();

    // Global Auth Listener
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            if (isLoginPage || isRegisterPage) {
                window.location.href = 'store.html';
            } else if (isStorePage) {
                document.getElementById('user-display').textContent = user.email;
                await checkUserRole(user);
            }
        } else {
            if (isStorePage) {
                window.location.href = 'index.html';
            }
        }
    });
});

async function checkUserRole(user) {
    // Default Admin Check
    if (user.email === 'admin@gmail.com') {
        currentUserRole = 'admin';
        updateUIForRole();
        // Ensure this user is in DB as admin
        const userRef = ref(database, `users/${user.uid}`);
        get(userRef).then(snap => {
            if (!snap.exists() || snap.val().role !== 'admin') {
                set(userRef, { email: user.email, role: 'admin' });
            }
        });
        return;
    }

    // DB Role Check
    const dbRef = ref(database);
    try {
        const snapshot = await get(child(dbRef, `users/${user.uid}`));
        if (snapshot.exists()) {
            currentUserRole = snapshot.val().role || 'client';
        } else {
            currentUserRole = 'client';
        }
        updateUIForRole();
    } catch (error) {
        console.error("Error fetching role", error);
        currentUserRole = 'client'; // Default fallback
        updateUIForRole();
    }
}

function updateUIForRole() {
    const adminPanel = document.getElementById('admin-panel');
    const adminBadge = document.getElementById('admin-badge-container');
    
    if (currentUserRole === 'admin') {
        if (adminPanel) adminPanel.style.display = 'block';
        if (adminBadge) adminBadge.style.display = 'block';
        document.body.classList.add('role-admin');
    } else {
        if (adminPanel) adminPanel.style.display = 'none';
        if (adminBadge) adminBadge.style.display = 'none';
        document.body.classList.remove('role-admin');
    }
    // Re-render products to show/hide admin controls
    renderProducts(); 
}

// --- Auth Functions ---

function setupLogin() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('login-btn');

        try {
            btn.disabled = true;
            btn.textContent = "Entrando...";
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
            showMessage('error', getFriendlyErrorMessage(error.code));
            btn.disabled = false;
            btn.textContent = "Entrar";
        }
    });
}

function setupRegister() {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPass = document.getElementById('confirm-password').value;
        const btn = document.getElementById('register-btn');

        if (password !== confirmPass) {
            showMessage('error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            btn.disabled = true;
            btn.textContent = "Registrando...";
            
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Save Role to DB
            const role = email === 'admin@gmail.com' ? 'admin' : 'client';
            
            console.log("Guardando usuario en DB...", user.uid, role);
            
            await set(ref(database, 'users/' + user.uid), {
                email: email,
                role: role
            }).catch(dbError => {
                console.error("Error guardando en DB:", dbError);
                alert("Usuario creado en Auth, pero falló al guardar en Base de Datos: " + dbError.message);
                throw dbError; // Re-throw to stop flow
            });
            
            console.log("Usuario guardado en DB exitosamente.");

            // 3. Sign Out (per requirement)
            await signOut(auth);
            
            alert("Registrado correctamente. Ahora inicia sesión.");
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error(error);
            showMessage('error', getFriendlyErrorMessage(error.code));
            btn.disabled = false;
            btn.textContent = "Registrarse";
        }
    });
}

// --- Store Functions ---

function setupStore() {
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => signOut(auth));

    // Cart UI Events
    document.getElementById('cart-btn').addEventListener('click', openCart);
    updateCartCount();

    // Listen to Products
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        productsCache = data || {};
        renderProducts();
    });

    // Listen to Users Count
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
        document.getElementById('total-users').textContent = snapshot.size;
    });

    // Admin Register Logic
    setupAdminRegister();
    // Product Form Logic
    setupProductForm();
}

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    if (Object.keys(productsCache).length === 0) {
        if (currentUserRole === 'admin') {
             // If admin and empty, offer to seed
             productsGrid.innerHTML = '<p style="text-align:center; width:100%;">No hay productos. <button onclick="seedDefaultProducts()" class="btn-buy" style="width:auto; display:inline-block;">Crear Demo</button></p>';
        } else {
             productsGrid.innerHTML = '<p style="text-align:center; width:100%;">No hay productos disponibles.</p>';
        }
        return;
    }

    Object.entries(productsCache).forEach(([id, product]) => {
        productsGrid.appendChild(createProductCard(id, product));
    });
}

function createProductCard(id, product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    const isAdmin = currentUserRole === 'admin';
    
    const adminControls = isAdmin ? `
        <div style="margin-top: 10px; display: flex; gap: 5px;">
            <button class="btn-admin btn-edit" onclick="editProduct('${id}')">Editar</button>
            <button class="btn-admin btn-delete" onclick="deleteProduct('${id}')">Eliminar</button>
        </div>
    ` : '';

    const buyButton = !isAdmin ? `
        <button class="btn-buy" onclick="addToCart('${id}')">Comprar</button>
    ` : ''; // Admins view but manage, typically don't buy, but let's hide it to be clean

    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <span class="product-price">$${parseFloat(product.price).toFixed(2)}</span>
            <div class="product-actions">
                ${buyButton}
            </div>
            ${adminControls}
        </div>
    `;
    return div;
}

// --- Cart Logic ---

window.addToCart = (id) => {
    const product = productsCache[id];
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, ...product, quantity: 1 });
    }
    
    localStorage.setItem('techStoreCart', JSON.stringify(cart));
    updateCartCount();
    showMessage('success', 'Producto agregado al carrito');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-amount');
    
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #aaa;">Tu carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span>$${itemTotal.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:var(--error-color); cursor:pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    totalEl.textContent = total.toFixed(2);
    modal.style.display = 'flex';
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('techStoreCart', JSON.stringify(cart));
    openCart(); // Re-render
    updateCartCount();
}

window.checkout = () => {
    if (cart.length === 0) return;
    alert("¡Gracias por tu compra! (Simulación completada)");
    cart = [];
    localStorage.removeItem('techStoreCart');
    updateCartCount();
    document.getElementById('cart-modal').style.display = 'none';
}

// --- Admin Logic ---

// Seed Default Products
window.seedDefaultProducts = () => {
    const defaultProducts = [
        { name: "Laptop Gamer", price: 1200, description: "Alta potencia para juegos.", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=60" },
        { name: "Smartphone 5G", price: 800, description: "Conectividad ultra rápida.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=60" },
        { name: "Auriculares Pro", price: 150, description: "Cancelación de ruido activa.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60" },
        { name: "Smart Watch", price: 200, description: "Monitor de salud avanzado.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60" }
    ];
    
    defaultProducts.forEach(p => push(ref(database, 'products'), p));
}

// Product CRUD
window.editProduct = (id) => {
    const product = productsCache[id];
    if (!product) return;
    
    document.getElementById('prod-id').value = id;
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-image').value = product.image;
    document.getElementById('prod-desc').value = product.description;
    
    window.openProductModal(id);
}

window.deleteProduct = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        remove(ref(database, `products/${id}`));
    }
}

function setupProductForm() {
    const form = document.getElementById('product-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('prod-id').value;
        const productData = {
            name: document.getElementById('prod-name').value,
            price: parseFloat(document.getElementById('prod-price').value),
            image: document.getElementById('prod-image').value,
            description: document.getElementById('prod-desc').value
        };

        try {
            if (id) {
                await update(ref(database, `products/${id}`), productData);
            } else {
                await push(ref(database, 'products'), productData);
            }
            window.closeModal('product-modal');
        } catch (error) {
            console.error(error);
            alert("Error guardando producto: " + error.message);
        }
    });
}

// Admin Register Admin
function setupAdminRegister() {
    const form = document.getElementById('admin-register-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-pass').value;
        
        try {
            // Use Secondary App to create user without logging out current admin
            const userCred = await createUser2(secondaryAuth, email, password);
            const newUser = userCred.user;
            
            // Set Role in DB
            await set(ref(database, `users/${newUser.uid}`), {
                email: email,
                role: 'admin'
            });

            // Sign out the secondary auth (just to be clean)
            await signOut(secondaryAuth);

            alert(`Administrador ${email} creado exitosamente.`);
            window.closeModal('admin-register-modal');
            form.reset();
            
        } catch (error) {
            console.error(error);
            const msg = document.getElementById('admin-msg-container');
            msg.style.display = 'block';
            msg.textContent = getFriendlyErrorMessage(error.code);
            msg.className = 'message-container message-error';
        }
    });
}
