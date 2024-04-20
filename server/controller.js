const results = [];

module.exports = {
	getRetirementQuote: (req, res) => {
		const retirementQuote = [
			"Retirement is more fun than work, and you never have to make excuses. -Unknown",
			'Retirement: That’s when you return from work one day and say, "Hi, Honey, I\'m home" — forever. – Gene Perret',
			"Don’t simply retire from something; have something to retire to. – Harry Emerson Fosdick",
		];

		// choose random compliment
		let randomIndex = Math.floor(Math.random() * retirementQuote.length);
		let randomRetirementQuote = retirementQuote[randomIndex];

		res.status(200).send(randomRetirementQuote);
	},
	createRetirement: (req, res) => {
		let retirement = req.body;
		console.log(req.body);
		if (!retirement || typeof retirement !== "object") {
			return res.status(400).json({ success: false, message: "Error" });
		}
		results.push(retirement);
		res
			.status(200)
			.json({ success: true, message: "success", results: results });
	},

	deleteRetirementData: (req, res) => {
		const { index } = req.params;
		if (index !== -1) {
			results.splice(index, 1);
			res.status(200).json(results);
		} else {
			res.status(400).json({ error: "Index not found" });
		}
	},
};
