module.exports = {
	success,
	fail,
	repair,
	get
};

const decreaseEnhancement = { 17: 16, 18: 17 };

function success(item) {
	if (item.enhancement < 20) return { ...item, enhancement: (item.enhancement += 1) };
	else return item;
}

function fail(item) {
	if (item.enhancement < 15) return { ...item, durability: (item.durability -= 5) };

	if (item.enhancement >= 15 && item.enhancement < 17) return { ...item, durability: (item.durability -= 10) };

	if (item.enhancement >= 17) return { ...item, enhancement: decreaseEnhancement[item.enhancement] };
}

function repair(item) {
	return { ...item, durability: 100 };
}

function get(item) {
	let name = item.name;
	let enhancement = item.enhancement;

	if (enhancement === 0) return item;
	if (enhancement > 0) return { ...item, name: `[+${enhancement}] ${name}` };
}
