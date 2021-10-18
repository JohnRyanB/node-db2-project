// STRETCH
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("cars")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("cars").insert([
				{
					vin: "11111111111111111",
					make: "Subaru",
					model: "Legacy",
					mileage: 55000,
					title: "John",
					transmission: "2.5 V6",
				},
				{
					vin: "00000000000000000",
					make: "Kia",
					model: "Soul",
					mileage: 55000,
					title: "Angel",
					transmission: "1.8L",
				},
			]);
		});
};
