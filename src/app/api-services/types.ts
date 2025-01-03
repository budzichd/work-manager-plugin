export abstract class APIService<ItemType> {
	createItem: (item: ItemType) => Promise<ItemType>;

	getAllItems: () => Promise<ItemType[]>;

	removeItem: (id: string) => Promise<void>;
}
