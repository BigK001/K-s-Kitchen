// Global Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add Item to Cart
function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  saveCart();
  alert(item + " added to cart!");
}

// Render Cart Page
function renderCart() {
  let cartList = document.getElementById("cart-list");
  let totalEl = document.getElementById("total");

  if (cartList) {
    cartList.innerHTML = "";
    cart.forEach((c) => {
      let li = document.createElement("li");
      li.textContent = `${c.item} - ₦${c.price}`;
      cartList.appendChild(li);
    });
  }
  if (totalEl) totalEl.textContent = total;
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order placed successfully! ✅ You chose 'Pay Later'.");
  localStorage.removeItem("cart");
  window.location.href = "confirm.html";
}

// ============================
// User Authentication (Simple)
// ============================
let users = JSON.parse(localStorage.getItem("users")) || [];

// Register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful! Welcome " + user.name);
      window.location.href = "menu.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

// ============================
// Voice Ordering (Menu Page)
// ============================
function startVoiceOrder() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser doesn't support speech recognition.");
    return;
  }
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    let voiceInput = event.results[0][0].transcript.toLowerCase();
    alert("You said: " + voiceInput);

    // Match against some Nigerian meals
    if (voiceInput.includes("jollof")) addToCart("Jollof Rice", 2000);
    else if (voiceInput.includes("fried rice")) addToCart("Fried Rice", 2200);
    else if (voiceInput.includes("amala")) addToCart("Amala & Ewedu", 1800);
    else if (voiceInput.includes("egusi")) addToCart("Pounded Yam & Egusi", 2500);
    else if (voiceInput.includes("suya")) addToCart("Suya", 1500);
    else alert("Meal not recognized. Try saying 'Jollof Rice', 'Amala', 'Egusi', 'Suya'.");
  };
}

// ============================
// Render Cart if on Cart Page
// ============================
document.addEventListener("DOMContentLoaded", renderCart);
// Get all slides
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Function to change slide
function changeSlide() {
  // Remove active class from current slide
  slides[currentSlide].classList.remove("active");

  // Move to next slide (loop back if at the end)
  currentSlide = (currentSlide + 1) % slides.length;

  // Add active class to new slide
  slides[currentSlide].classList.add("active");
}

// Run changeSlide every 5 seconds
setInterval(changeSlide, 5000);

