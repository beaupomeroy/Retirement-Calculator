const resultContainer = document.getElementById("result-box")
const retirementBtn = document.getElementById("calculate-btn")
const saveBtn = document.getElementById("save-result-btn")
const resultList = document.getElementById("saved-results-list")
const retirementQuoteBtn = document.getElementById("retirementQuoteButton")
const headerQuote =document.getElementById("quote")

console.log("hhhhhhh")

let retirementObject;

function displayResults(results) {
    resultList.innerHTML = '';
    
    
    results.forEach((result, index) => {
        const { monthlySavings,
               yearsUntilRetirement,
               annualRateOfReturn,
               retirementSavings }
               =result
            
        let message = `$${monthlySavings} per month for ${yearsUntilRetirement} years at ${annualRateOfReturn} = $${retirementSavings}`;
        let resultItem = document.createElement('li')
        resultItem.textContent = message;
        // Add the new result to the saved results list
        resultList.appendChild(resultItem);
        // Add delete button to the saved results list
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => deleteRetirementData(index));
        resultItem.appendChild(deleteBtn) 
    });
 };

function submitHandler(e){
    // Get user input values
    e.preventDefault()
    const monthlySavings = parseFloat(document.getElementById("monthly-savings").value);
    const yearsUntilRetirement = parseInt(document.getElementById("years-until-retirement").value);
    const annualRateOfReturn = parseFloat(document.getElementById("annual-rate-of-return").value);
    
    // Calculate retirement savings
    const retirementSavings = calculateRetirementSavings(monthlySavings, yearsUntilRetirement, annualRateOfReturn);
    let retirementLabel = document.createElement('h2')
    retirementLabel.textContent = retirementSavings;
    resultContainer.appendChild(retirementLabel)

    retirementObject = {monthlySavings, yearsUntilRetirement, annualRateOfReturn, retirementSavings}
};

const errCallback = (err) => {
    if (err.response && err.response.data) {
        console.log(err.response.data);
    } else {
        console.log('An error occurred:', err);
    }
};

const getRetirementQuote = () => {
    axios.get("http://localhost:4000/api/quote/")
        .then(res => {
            const data = res.data;
            if(headerQuote.textContent !== data){
                headerQuote.textContent = data
            }else{
                axios.get("http://localhost:4000/api/quote/")
                .then(res => {
                    const data2 = res.data
                    headerQuote.textContent = data2
                })
            }
    });
};

function deleteRetirementData(index) {
    console.log("Data deleted successfully",index);
    axios.delete(`http://localhost:4000/api/delete/${index}`) 
        .then(res => {
            console.log("Data deleted successfully");
            displayResults(res.data); 
        })
        .catch(e => {
            console.error("Error deleting data:", e);
            errCallback(e); 
        });
}



// Event listener for the Save This Result button
saveBtn.addEventListener("click", function() {
    // Get the current result
    const currentResult = document.getElementById("result").innerText;
    createRetirement(retirementObject)
    // Create a new list item
    const listItem = document.createElement("li");
    listItem.textContent = currentResult;

    // Add the new result to the saved results list
    document.getElementById("saved-results-list").appendChild(listItem);
});

// Function to calculate retirement savings
function calculateRetirementSavings(monthlySavings, yearsUntilRetirement, annualRateOfReturn) {
    return monthlySavings * 12 * yearsUntilRetirement; // Simple calculation for demonstration
}

const createRetirement = (body) => {
    axios.post("http://localhost:4000/api/createRetirement/", body)
    .then(res => displayResults(res.data.results))
    .catch(e => errCallback(e));
}

retirementBtn.addEventListener("click", submitHandler)
retirementQuoteBtn.addEventListener('click', getRetirementQuote)

