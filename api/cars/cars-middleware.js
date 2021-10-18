var vinValidator = require("vin-validator");
const Cars = require("./cars-model");

const checkCarId = (req, res, next) => {
	const { id } = req.params;
	Cars.getById(id)
		.then((res) => {
			if (res.id) {
				next();
			} else {
				res.status(404).json({ message: `car with id ${id} is not found` });
			}
		})
		.catch(() =>
			res.status(404).json({ message: `car with id ${id} is not found` })
		);
	// DO YOUR MAGIC
};

const checkCarPayload = (req, res, next) => {
	const payload = req.body;
	if (!payload.vin) {
		res.status(400).json({ message: `vin is missing` });
	} else {
		if (!payload.make) {
			res.status(400).json({ message: `make is missing` });
		} else {
			if (!payload.model) {
				res.status(400).json({ message: `model is missing` });
			} else {
				if (!payload.mileage) {
					res.status(400).json({ message: `vin is missing` });
				} else {
					next();
				}
				// DO YOUR MAGIC
			}
		}
	}
};

const checkVinNumberValid = (req, res, next) => {
	const validVin = vinValidator.validate(req.body.vin);
	if (validVin) {
		next();
	} else {
		res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
	}
	// DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
	// DO YOUR MAGIC
	const vin = req.body.vin;
	console.log(vin);
	Cars.getAll()
		.where("vin", vin)
		.then((res) => {
			console.log("res stuff", res.vin);
			if (res.vin) {
				res.status(400).json({ message: `vin ${vin} already exists` });
			} else {
				next();
			}
		});
};

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberUnique,
	checkVinNumberValid,
};
