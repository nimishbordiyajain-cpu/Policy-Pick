// compare.js - JS for compare page

var currentMode = "monthly";
var coverageVisible = true;

// plan data with their column positions
var planList = [
  { id: "col-basiccare",   price: 799,  colIndex: 2 },
  { id: "col-youngindia",  price: 999,  colIndex: 3 },
  { id: "col-smartshield", price: 1499, colIndex: 4 },
  { id: "col-familyfirst", price: 2499, colIndex: 5 },
  { id: "col-premiumplus", price: 2999, colIndex: 6 },
  { id: "col-seniorsafe",  price: 5999, colIndex: 7 }
];


// ---- 1. STICKY HEADER LOGIC ----
// We listen to the scroll event on the window
// When user scrolls down more than 100px, we add class "header-scrolled" to the thead
// When they scroll back up, we remove it
// The CSS then uses this class to change the header style

var tableHead = document.querySelector("#compareTable thead");

window.addEventListener("scroll", function () {
  // window.scrollY gives how many pixels the page has been scrolled from top
  if (window.scrollY > 100) {
    // user has scrolled down - add the scrolled class
    tableHead.classList.add("header-scrolled");
  } else {
    // user is near top - remove the class
    tableHead.classList.remove("header-scrolled");
  }
});


// ---- 2. PREMIUM RANGE FILTER ----

var slider = document.getElementById("premiumRange");
var rangeLabel = document.getElementById("rangeValue");

slider.addEventListener("input", function () {
  rangeLabel.textContent = slider.value;
  filterByPremium();
});

function filterByPremium() {
  var maxPremium = parseInt(slider.value);
  var allHidden = true;

  for (var i = 0; i < planList.length; i++) {
    var plan = planList[i];
    var allRows = document.querySelectorAll("#compareTable tr");

    allRows.forEach(function(row) {
      // get cell by column index
      var cell = row.children[plan.colIndex - 1];
      if (cell) {
        cell.style.display = plan.price <= maxPremium ? "" : "none";
      }
    });

    if (plan.price <= maxPremium) allHidden = false;
  }

  // show msg if no plans visible
  var msg = document.getElementById("noPlansMsg");
  msg.style.display = allHidden ? "block" : "none";
}


// ---- 3. MONTHLY / YEARLY TOGGLE ----

function switchPricing(mode) {
  currentMode = mode;

  document.getElementById("btnMonthly").classList.toggle("active", mode === "monthly");
  document.getElementById("btnYearly").classList.toggle("active", mode === "yearly");

  // update all price cells
  var priceCells = document.querySelectorAll(".price");
  priceCells.forEach(function(cell) {
    var m = cell.getAttribute("data-monthly");
    var y = cell.getAttribute("data-yearly");
    cell.textContent = mode === "monthly" ? "₹" + m + "/mo" : "₹" + y + "/yr";
  });
}


// ---- 4. COVERAGE ROWS TOGGLE ----

function toggleCoverage() {
  var rows = document.querySelectorAll(".coverage-row");
  var btn = document.getElementById("coverageToggleBtn");

  coverageVisible = !coverageVisible;

  rows.forEach(function(row) {
    row.style.display = coverageVisible ? "" : "none";
  });

  btn.textContent = coverageVisible ? "Hide Coverage" : "Show Coverage";
  btn.classList.toggle("active", coverageVisible);
}
