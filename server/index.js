const express = require("express");
const app = express();
const cors = require("cors");
const {} = require("./controller.js");

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const {
	createRetirement,
	getRetirementQuote,
	deleteRetirementData,
} = require("./controller");

app.get("/api/quote", getRetirementQuote);
app.post("/api/createRetirement", createRetirement);
app.delete("/api/delete/:index", deleteRetirementData);
app.listen(4000, () => console.log("Server running on 4000"));
