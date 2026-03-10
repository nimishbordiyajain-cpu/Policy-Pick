// plan-details.js - JS for plan details page

// all plan data stored here
var plans = {

  "basiccare": {
    name: "BasicCare",
    subtitle: "Affordable starter coverage for individuals",
    coverage: "₹2 Lakh",
    hospitals: "1,200+",
    waitingPeriod: "4 Years",
    noClaimBonus: "Not Available",
    monthlyPrice: "₹799",
    yearlyPrice: "₹8,629",
    bonusNote: "ℹ️ This plan does not offer a No-Claim Bonus.",
    covered: [
      "Hospitalisation charges",
      "Pre & post hospitalisation (30/60 days)",
      "Day care procedures",
      "Ambulance cover up to ₹2,000",
      "AYUSH treatment"
    ]
  },

  "youngindia": {
    name: "YoungIndia",
    subtitle: "Designed for students and young working professionals",
    coverage: "₹3 Lakh",
    hospitals: "2,000+",
    waitingPeriod: "3 Years",
    noClaimBonus: "3% increase per claim-free year",
    monthlyPrice: "₹999",
    yearlyPrice: "₹10,789",
    bonusNote: "🎁 No-Claim Bonus: Coverage grows 3% every claim-free year!",
    covered: [
      "Hospitalisation charges",
      "Pre & post hospitalisation (30/60 days)",
      "Day care procedures",
      "Ambulance cover up to ₹3,000",
      "Vision / Eye care",
      "Mental health cover",
      "AYUSH treatment"
    ]
  },

  "smartshield": {
    name: "SmartShield",
    subtitle: "Well-rounded plan for families and young professionals",
    coverage: "₹5 Lakh",
    hospitals: "4,500+",
    waitingPeriod: "2 Years",
    noClaimBonus: "5% increase per claim-free year",
    monthlyPrice: "₹1,499",
    yearlyPrice: "₹16,189",
    bonusNote: "🎁 No-Claim Bonus: Coverage increases by 5% every claim-free year!",
    covered: [
      "Hospitalisation charges",
      "Pre & post hospitalisation (60/90 days)",
      "Day care procedures",
      "Ambulance cover up to ₹5,000",
      "Vision / Eye care",
      "Critical illness basic cover",
      "AYUSH treatment"
    ]
  },

  "familyfirst": {
    name: "FamilyFirst",
    subtitle: "Complete family floater plan for parents and kids",
    coverage: "₹10 Lakh",
    hospitals: "6,000+",
    waitingPeriod: "2 Years",
    noClaimBonus: "7% increase per claim-free year",
    monthlyPrice: "₹2,499",
    yearlyPrice: "₹26,989",
    bonusNote: "🎁 No-Claim Bonus: Coverage grows by 7% for every claim-free year!",
    covered: [
      "Hospitalisation charges",
      "Pre & post hospitalisation (60/90 days)",
      "Day care procedures",
      "Ambulance cover up to ₹7,500",
      "Dental cover",
      "Vision / Eye care",
      "Maternity cover (after 2 years)",
      "Mental health cover",
      "Child vaccination cover",
      "AYUSH treatment"
    ]
  },

  "premiumplus": {
    name: "PremiumPlus",
    subtitle: "Complete protection for you and your entire family",
    coverage: "₹15 Lakh",
    hospitals: "8,000+",
    waitingPeriod: "1 Year",
    noClaimBonus: "10% increase per claim-free year",
    monthlyPrice: "₹2,999",
    yearlyPrice: "₹32,389",
    bonusNote: "🎁 No-Claim Bonus: Coverage increases by 10% every claim-free year!",
    covered: [
      "Hospitalisation charges",
      "Pre & post hospitalisation (90/180 days)",
      "Day care & OPD cover",
      "Ambulance cover up to ₹10,000",
      "Dental cover",
      "Vision / Eye care",
      "Maternity cover (after 2 years)",
      "Critical illness comprehensive cover",
      "Mental health cover",
      "AYUSH treatment"
    ]
  },

  "seniorsafe": {
    name: "SeniorSafe",
    subtitle: "Specially designed for citizens aged 60 and above",
    coverage: "₹20 Lakh",
    hospitals: "9,500+",
    waitingPeriod: "1 Year",
    noClaimBonus: "8% increase per claim-free year",
    monthlyPrice: "₹5,999",
    yearlyPrice: "₹64,789",
    bonusNote: "🎁 No-Claim Bonus: Coverage grows 8% every claim-free year!",
    covered: [
      "Hospitalisation charges",
      "Pre & post hospitalisation (90/180 days)",
      "Day care & OPD cover",
      "Ambulance cover up to ₹12,000",
      "Dental cover",
      "Vision / Eye care",
      "Mental health cover",
      "Domiciliary (home) treatment",
      "Organ donor cover",
      "Annual health check-up",
      "AYUSH treatment"
    ]
  }
};

// read plan name from URL like: plan-details.html?plan=smartshield
// using split because URLSearchParams doesn't work with file://
var planKey = "basiccare";
var query = window.location.search;

if (query.indexOf("plan=") !== -1) {
  planKey = query.split("plan=")[1].split("&")[0];
}

if (!plans[planKey]) planKey = "basiccare";

var plan = plans[planKey];

// fill page with plan data
document.getElementById("planTitle").textContent    = plan.name;
document.getElementById("planSubtitle").textContent = plan.subtitle;

// build info table
var infoTable = document.getElementById("infoTable");
var infoRows = [
  ["Coverage Limit",    plan.coverage],
  ["Network Hospitals", plan.hospitals],
  ["Waiting Period",    plan.waitingPeriod],
  ["No-Claim Bonus",    plan.noClaimBonus]
];

for (var i = 0; i < infoRows.length; i++) {
  var row = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  td1.textContent = infoRows[i][0];
  td2.textContent = infoRows[i][1];
  row.appendChild(td1);
  row.appendChild(td2);
  infoTable.appendChild(row);
}

// build coverage list
var coverList = document.getElementById("coverList");
for (var j = 0; j < plan.covered.length; j++) {
  var li = document.createElement("li");
  li.textContent = plan.covered[j];
  coverList.appendChild(li);
}

// set prices
document.getElementById("monthlyPrice").textContent = plan.monthlyPrice + "/mo";
document.getElementById("yearlyPrice").textContent  = plan.yearlyPrice  + "/yr";
document.getElementById("bonusNote").textContent    = plan.bonusNote;
