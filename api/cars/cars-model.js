const db = require("../../data/db-config");

const getAll = () => {
	// DO YOUR MAGIC
	return db("cars");
};

const getById = (id) => {
	// DO YOUR MAGIC

	return db("cars").where("id", id).first();
};

const create = (newCar) => {
	// DO YOUR MAGIC
	console.log(newCar);
	return db("cars")
		.insert(newCar)
		.then(() => {
			return db("cars").where("vin", newCar.vin).first();
		});
};
module.exports = {
	getAll,
	getById,
	create,
};
