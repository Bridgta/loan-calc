//listen for submit
document
    .getElementById("loan-form")
    .addEventListener("submit", calculateResults);

//Calc Results
function calculateResults(e) {
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
    } else {
        showError("Please check your numbers");
    }

    e.preventDefault();
}

//show error

function showError(error) {
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
