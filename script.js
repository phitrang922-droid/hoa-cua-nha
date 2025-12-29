const products = [
    {
        id: 1,
        name: "Hoa Hồng Đỏ",
        price: 35000,
        image: "C:/Users/Admin/.gemini/antigravity/brain/80d6d400-97ca-4d38-b32f-076330b77b33/roses_red_1766367916386.png",
        unit: "cành"
    },
    {
        id: 2,
        name: "Tulip Hồng",
        price: 45000,
        image: "C:/Users/Admin/.gemini/antigravity/brain/80d6d400-97ca-4d38-b32f-076330b77b33/tulips_pink_1766367933524.png",
        unit: "cành"
    },
    {
        id: 3,
        name: "Hoa Ly Trắng",
        price: 50000,
        image: "C:/Users/Admin/.gemini/antigravity/brain/80d6d400-97ca-4d38-b32f-076330b77b33/lilies_white_1766367953211.png",
        unit: "cành"
    },
    {
        id: 4,
        name: "Hướng Dương",
        price: 30000,
        image: "C:/Users/Admin/.gemini/antigravity/brain/80d6d400-97ca-4d38-b32f-076330b77b33/sunflowers_yellow_1766367977974.png",
        unit: "cành"
    },
    {
        id: 5,
        name: "Bó Hoa Mix",
        price: 550000,
        image: "C:/Users/Admin/.gemini/antigravity/brain/80d6d400-97ca-4d38-b32f-076330b77b33/mixed_bouquet_1766367995249.png",
        unit: "bó"
    }
];

const styles = [
    {
        id: 'round',
        name: 'Bó Tròn',
        price: 50000,
        description: 'Cổ điển & Sang trọng'
    },
    {
        id: 'handtied',
        name: 'Bó Tự Nhiên',
        price: 30000,
        description: 'Mộc mạc & Tinh tế'
    },
    {
        id: 'cascade',
        name: 'Bó Thác Đổ',
        price: 100000,
        description: 'Lộng lẫy & Ấn tượng'
    }
];

let cart = {};
let currentStyle = null;

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function initProducts() {
    const grid = document.getElementById('flower-grid');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="card-image">
            <div class="card-details">
                <h3 class="card-title">${product.name}</h3>
                <div class="card-price">${formatCurrency(product.price)} / ${product.unit}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span class="qty-display" id="qty-${product.id}">0</span>
                    <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initStyles() {
    const grid = document.getElementById('style-grid');
    styles.forEach(style => {
        const card = document.createElement('div');
        card.className = 'style-card';
        card.onclick = () => selectStyle(style.id);
        card.id = `style-${style.id}`;
        card.innerHTML = `
            <div class="style-icon">🎁</div>
            <h3>${style.name}</h3>
            <p>${style.description}</p>
            <p style="margin-top:0.5rem; color:var(--primary-dark)">+${formatCurrency(style.price)}</p>
        `;
        grid.appendChild(card);
    });
}

function updateQuantity(productId, change) {
    if (!cart[productId]) cart[productId] = 0;
    cart[productId] += change;
    if (cart[productId] < 0) cart[productId] = 0;

    document.getElementById(`qty-${productId}`).innerText = cart[productId];
    updateSummary();
}

function selectStyle(styleId) {
    currentStyle = styleId;
    
    // Update UI
    document.querySelectorAll('.style-card').forEach(el => el.classList.remove('selected'));
    document.getElementById(`style-${styleId}`).classList.add('selected');
    
    updateSummary();
}

function updateSummary() {
    let total = 0;
    let itemCount = 0;
    let itemsDescription = [];

    // Calculate flowers
    products.forEach(p => {
        const qty = cart[p.id] || 0;
        if (qty > 0) {
            total += p.price * qty;
            itemCount += qty;
            itemsDescription.push(`${qty} ${p.name}`);
        }
    });

    // Calculate style
    let stylePrice = 0;
    let styleName = 'Mặc định (Không gói)';
    if (currentStyle) {
        const style = styles.find(s => s.id === currentStyle);
        if (style) {
            stylePrice = style.price;
            styleName = style.name;
            total += stylePrice;
        }
    }

    // Update UI Elements
    const summaryPanel = document.getElementById('summary-panel');
    const selectedItemsEl = document.getElementById('selected-items');
    const selectedStyleEl = document.getElementById('selected-style');
    const totalPriceEl = document.getElementById('total-price');
    const cartCountEl = document.getElementById('cart-count');

    if (total > 0 || currentStyle) {
        summaryPanel.classList.add('visible');
    } else {
        summaryPanel.classList.remove('visible');
    }

    selectedItemsEl.innerText = itemsDescription.length > 0 ? itemsDescription.join(', ') : 'Chưa chọn hoa';
    selectedStyleEl.innerText = `Kiểu gói: ${styleName}`;
    totalPriceEl.innerText = formatCurrency(total);
    cartCountEl.innerText = itemCount;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    initStyles();
});
