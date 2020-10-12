const enhancer = require('./enhancer.js');

describe("Update an item's output based on specific conditions", () => {
	describe('Restore durability of an item', () => {
		test('Update durability to 100', () => {
			const item = { name: 'name', durability: 90, enhancement: 20 };
			expect(enhancer.repair(item)).toHaveProperty('durability', 100);
		});
	});

	describe('A successful enhancement increments by one unless its value is 20', () => {
		test('Successful enhancement increments by 1 if less than 20', () => {
			const item = { name: 'name', durability: 90, enhancement: 19 };
			const itemWithUpdatedEnhancement = { name: 'name', durability: 90, enhancement: 20 };
			expect(enhancer.success(item)).toEqual(itemWithUpdatedEnhancement);
		});
		test('Successful enhancement is not changed if equal to 20 ', () => {
			const item = { name: 'name', durability: 90, enhancement: 20 };
			expect(enhancer.success(item)).toEqual(item);
		});
	});

	describe('A failed enhacement decreases the durability of the item', () => {
		test("An item's enhancement is less than 15", () => {
			const item = { name: 'name', durability: 90, enhancement: 14 };
			const updatedItem = { name: 'name', durability: 85, enhancement: 14 };
			expect(enhancer.fail(item)).toEqual(updatedItem);
		});

		test("An item's enhancement equals 15", () => {
			const item = { name: 'name', durability: 90, enhancement: 15 };
			const updatedItem = { name: 'name', durability: 80, enhancement: 15 };
			expect(enhancer.fail(item)).toEqual(updatedItem);
		});

		test("An item's enhancement is greater than 15 but less than 17", () => {
			const item = { name: 'name', durability: 90, enhancement: 16 };
			const updatedItem = { name: 'name', durability: 80, enhancement: 16 };
			expect(enhancer.fail(item)).toEqual(updatedItem);
		});

		test("An item's enhancement is 17", () => {
			const item = { name: 'name', durability: 90, enhancement: 17 };
			const updatedItem = { name: 'name', durability: 90, enhancement: 16 };
			expect(enhancer.fail(item)).toEqual(updatedItem);
		});

		test("An item's enhancement is 18", () => {
			const item = { name: 'name', durability: 90, enhancement: 18 };
			const updatedItem = { name: 'name', durability: 90, enhancement: 17 };
			expect(enhancer.fail(item)).toEqual(updatedItem);
		});
	});

	describe("Update an item's name based on the enhacement level", () => {
		test('Enhancement level is 0', () => {
			const item = { name: 'name', durability: 90, enhancement: 0 };
			expect(enhancer.get(item)).toEqual(item);
		});

		test('Enhancment level is greater than 0', () => {
			const item = { name: 'Iron Sword', durability: 90, enhancement: 7 };
			const updatedItem = { name: '[+7] Iron Sword', durability: 90, enhancement: 7 };
			expect(enhancer.get(item)).toEqual(updatedItem);
		});
	});
});
