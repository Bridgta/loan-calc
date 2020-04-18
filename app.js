//listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
    //hide results
    document.getElementById("results").style.display = "none";

    //show loader
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

//Calc Results
function calculateResults() {
    console.log("calc");

    //UI vars
    const amount = document.getElementById("amount");
    const intrest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalIntrest = document.getElementById("total-interest");

    const principal = parseFloat(amount.value);
    const calculatedIntrest = parseFloat(intrest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment

    const x = Math.pow(1 + calculatedIntrest, calculatedPayments);
    const monthly = (principal * x * calculatedIntrest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalIntrest.value = (monthly * calculatedPayments - principal).toFixed(
            2
        );
        //show reults
        document.getElementById("results").style.display = "block";

        //hide loader
        document.getElementById("loading").style.display = "none";
    } else {
        showError("Please check your numbers");
    }
}

//show error

function showError(error) {
    //hide reults
    document.getElementById("results").style.display = "none";

    //hide loader
    document.getElementById("loading").style.display = "none";

    //create div
    const errorDiv = document.createElement("div");

    //get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //add class
    errorDiv.className = "alert alert-danger";

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error after3 seconds
    setTimeout(clearError, 3000);
}

//clear error
function clearError() {
    document.querySelector(".alert").remove();
}
