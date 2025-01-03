import { Injectable } from '@angular/core';
import { APIService } from './types';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Task } from '../pages/tasks/types';

interface IndexedDB extends DBSchema {
	tasks: {
		key: string;
		value: Task;
	};
}

@Injectable({ providedIn: 'root' })
export class IndexedDBService<ItemType> implements APIService<ItemType> {
	private db!: Promise<IDBPDatabase<IndexedDB>>;

	constructor() {
		this.initDB();
	}

	async createItem(item: ItemType): Promise<ItemType> {
		return (await this.db).add('tasks', item as Task).then((id) => ({ id, ...item }));
	}

	async getAllItems(): Promise<ItemType[]> {
		return (await this.db).getAll('tasks') as Promise<ItemType[]>;
	}

	async removeItem(id: string): Promise<void> {
		await (await this.db).delete('tasks', id);
	}

	private async initDB() {
		this.db = openDB<IndexedDB>('work-manager', 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains('tasks')) {
					db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
				}
			},
		});
	}
}
