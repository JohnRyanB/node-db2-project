// DO YOUR MAGIC
const express = require("express");
const Cars = require("./cars-model");
const mw = require("./cars-middleware");
const router = express.Router();

router.get("/", (req, res) => {
	Cars.getAll()
		.then((cars) => {
			console.log(cars);
			res.status(200).json(cars);
		})
		.catch((err) => res.status(500).json({ message: err.message }));
});

router.get("/:id", mw.checkCarId, (req, res) => {
	const { id } = req.params;
	Cars.getById(id)
		.then((car) => {
			res.status(200).json(car);
		})
		.catch((err) => res.status(500).json({ message: err.message }));
});

router.post(
	"/",
	mw.checkCarPayload,
	mw.checkVinNumberValid,
	mw.checkVinNumberUnique,
	(req, res) => {
		const newCar = req.body;
		console.log(req.body);
		Cars.create(newCar)
			.then((car) => {
				res.status(201).json(car);
			})
			.catch((err) => res.status(500).json({ message: err.message }));
	}
);

module.exports = router;
