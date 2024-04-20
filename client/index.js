const resultContainer = document.getElementById("result-box");
const retirementBtn = document.getElementById("calculate-btn");
const saveBtn = document.getElementById("save-result-btn");
const resultList = document.getElementById("saved-results-list");
const retirementQuoteBtn = document.getElementById("retirementQuoteButton");
const headerQuote = document.getElementById("quote");
const monthlySavingsInput = document.getElementById("monthly-savings");
const yearsInput = document.getElementById("years-until-retirement");
const annualRate = document.getElementById("annual-rate-of-return");
const resetBtn = document.getElementById("reset-btn");

console.log("hhhhhhh");
let retirementObject;
saveBtn.classList.add("hide");

resetBtn.addEventListener("click", function (e) {
	e.preventDefault();
	console.log("RESET!");
	monthlySavingsInput.value = "";
	yearsInput.value = "";
	annualRate.value = "";
});

function displayResults(results) {
	resultList.innerHTML = "";

	results.forEach((result, index) => {
		const {
			monthlySavings,
			yearsUntilRetirement,
			annualRateOfReturn,
			retirementSavings,
		} = result;

		let message = `$${monthlySavings} per month for ${yearsUntilRetirement} years at ${annualRateOfReturn} % = $${retirementSavings}`;
		let resultItem = document.createElement("li");
		resultItem.textContent = message;
		// Add the new result to the saved results list
		resultList.appendChild(resultItem);
		// Add delete button to the saved results list
		let deleteBtn = document.createElement("button");
		deleteBtn.textContent = "x";
		deleteBtn.addEventListener("click", () => deleteRetirementData(index));
		resultItem.appendChild(deleteBtn);
	});
}

function submitHandler(e) {
	// Get user input values
	e.preventDefault();
	resultContainer.innerHTML = "";
	const monthlySavings = parseFloat(monthlySavingsInput.value);
	const yearsUntilRetirement = parseInt(yearsInput.value);
	const annualRateOfReturn = parseFloat(annualRate.value);

	// Calculate retirement savings
	const retirementSavings = calculateRetirementSavings(
		monthlySavings,
		yearsUntilRetirement,
		annualRateOfReturn
	);
	let formatting_options = {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	};
	let dollarString = new Intl.NumberFormat("en-US", formatting_options);
	let dollarAmount = dollarString.format(retirementSavings);
	let retirementLabel = document.createElement("span");
	retirementLabel.textContent = dollarAmount;
	resultContainer.appendChild(retirementLabel);
	saveBtn.classList.remove("hide");

	retirementObject = {
		monthlySavings,
		yearsUntilRetirement,
		annualRateOfReturn,
		retirementSavings,
	};
}

const errCallback = (err) => {
	if (err.response && err.response.data) {
		console.log(err.response.data);
	} else {
		console.log("An error occurred:", err);
	}
};

const getRetirementQuote = () => {
	axios.get("http://localhost:4000/api/quote/").then((res) => {
		const data = res.data;
		if (headerQuote.textContent !== data) {
			headerQuote.textContent = data;
		} else {
			axios.get("http://localhost:4000/api/quote/").then((res) => {
				const data2 = res.data;
				headerQuote.textContent = data2;
			});
		}
	});
};

function deleteRetirementData(index) {
	console.log("Data deleted successfully", index);
	axios
		.delete(`http://localhost:4000/api/delete/${index}`)
		.then((res) => {
			console.log("Data deleted successfully");
			displayResults(res.data);
		})
		.catch((e) => {
			console.error("Error deleting data:", e);
			errCallback(e);
		});
}

// Event listener for the Save This Result button
saveBtn.addEventListener("click", function () {
	// Get the current result
	const currentResult = document.getElementById("result-box").innerText;
	createRetirement(retirementObject);
	// Create a new list item
	const listItem = document.createElement("li");
	listItem.textContent = currentResult;

	// Add the new result to the saved results list
	document.getElementById("saved-results-list").appendChild(listItem);
});

// Function to calculate retirement savings
function calculateRetirementSavings(
	monthlySavings,
	yearsUntilRetirement,
	annualRateOfReturn
) {
	// Convert annual rate of return to decimal and monthly rate
	const r = annualRateOfReturn / 100 / 12;

	// Convert years to months
	const n = yearsUntilRetirement * 12;

	// Calculate future value (retirement savings)
	const futureValue = monthlySavings * ((Math.pow(1 + r, n) - 1) / r);

	return futureValue;
}

const createRetirement = (body) => {
	axios
		.post("http://localhost:4000/api/createRetirement/", body)
		.then((res) => displayResults(res.data.results))
		.catch((e) => errCallback(e));
};

retirementBtn.addEventListener("click", submitHandler);
retirementQuoteBtn.addEventListener("click", getRetirementQuote);
