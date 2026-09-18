// CampusEats task list
const tasks = [
  "Design the menu screen",
  "Build the orders API",
  "Add user login",
];

console.log(`CampusEats has ${tasks.length} open tasks`);


// =============================================================
// BEFORE — Code Quality & Security Issues (DO NOT USE)
// =============================================================
// function calc(a, b, t) {
//   var x = a * b;
//   if (t == "vip") { x = x - x * 0.1 }
//   console.log("API_KEY=sk_live_9f8a7b6c5d");  // !!
//   return x
// }
//
// Problems identified:
// 1. UNCLEAR NAMES     — `calc`, `a`, `b`, `t`, `x` give no hint of purpose.
// 2. HARDCODED SECRET  — API key logged to console; visible in logs & git history.
// 3. MAGIC NUMBER      — 0.1 has no label; reader cannot tell it is a discount rate.
// 4. var INSTEAD OF const/let — `var` has function scope and allows re-declaration.
// 5. LOOSE EQUALITY (==) — `t == "vip"` allows type coercion; use `===` instead.
// 6. NO INPUT VALIDATION — negative price/quantity silently returns wrong totals.
// =============================================================


// =============================================================
// AFTER — Clean, safe version
// =============================================================

const VIP_DISCOUNT = 0.1; // named constant — no magic numbers

/**
 * Calculates the total price for an order, applying a VIP discount if applicable.
 *
 * @param {number} price        - Unit price (must be >= 0)
 * @param {number} quantity     - Number of units (must be >= 0)
 * @param {string} customerType - Customer tier, e.g. "vip" or "regular"
 * @returns {number} Final total after any applicable discount
 * @throws {Error} If price or quantity is negative
 */
function calculateTotal(price, quantity, customerType) {
  // Input validation — catch bad data early
  if (typeof price !== "number" || typeof quantity !== "number") {
    throw new Error("price and quantity must be numbers");
  }
  if (price < 0 || quantity < 0) {
    throw new Error("price and quantity must be >= 0");
  }

  const subtotal = price * quantity;

  // Strict equality (===) — no type coercion
  return customerType === "vip"
    ? subtotal * (1 - VIP_DISCOUNT)
    : subtotal;
}

// API key comes from an environment variable — NEVER hard-coded
// const apiKey = process.env.API_KEY;

module.exports = { calculateTotal };
