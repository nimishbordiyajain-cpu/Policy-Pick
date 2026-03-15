// compare.js - JS for compare page

var currentMode = "monthly";
var coverageVisible = true;

// Plan data: colIndex is the position of this plan's column in each table row.
// children[0] is always the feature label (e.g. "Coverage Limit"),
// so children[1] = BasicCare, children[2] = YoungIndia, and so on.
var planList = [
  { id: "col-basiccare",   price: 799,  colIndex: 1 },
  { id: "col-youngindia",  price: 999,  colIndex: 2 },
  { id: "col-smartshield", price: 1499, colIndex: 3 },
  { id: "col-familyfirst", price: 2499, colIndex: 4 },
  { id: "col-premiumplus", price: 2999, colIndex: 5 },
  { id: "col-seniorsafe",  price: 5999, colIndex: 6 }
];


// ---- 1. STICKY HEADER LOGIC ----
// When the user scrolls more than 100px down the page,
// we add the "header-scrolled" class to the thead.
// The CSS uses this class to make the header look more
// distinct (darker background, accent border) so the user
// always knows which column belongs to which plan.

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

    // Get ALL table rows but SKIP the price row (#priceRow)
    // because the price row cells are updated by switchPricing()
    // and should never be hidden by the filter
    var allRows = document.querySelectorAll("#compareTable tr:not(#priceRow)");

    var shouldShow = plan.price <= maxPremium;

    allRows.forEach(function(row) {
      // children[0] = feature label column, children[1..6] = plan columns
      // colIndex 1-6 maps directly to the correct plan cell in every row
      var cell = row.children[plan.colIndex];
      if (cell) {
        cell.style.display = shouldShow ? "" : "none";
      }
    });

    // Also hide/show the header column for this plan
    var headerCol = document.getElementById(plan.id);
    if (headerCol) {
      headerCol.style.display = shouldShow ? "" : "none";
    }

    // Also hide/show the price row cell for this plan
    var priceRow = document.getElementById("priceRow");
    if (priceRow) {
      var priceCell = priceRow.children[plan.colIndex];
      if (priceCell) {
        priceCell.style.display = shouldShow ? "" : "none";
      }
    }

    if (shouldShow) allHidden = false;
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

  // update all price cells in the price row
  var priceCells = document.querySelectorAll("#priceRow .price");
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
