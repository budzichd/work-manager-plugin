import { Injectable, inject, signal } from '@angular/core';
import { Task } from './types';
import { APIService } from '../../api-services/types';

@Injectable()
export class TaskService {
	private db = inject(APIService<Task>);
	tasks = signal<Task[] | null>(null);

	constructor() {
		this.loadTasks();
	}

	loadTasks() {
		this.db.getAllItems().then((tasks) => this.tasks.set(tasks));
	}

	createTask(item: Task) {
		return this.db
			.createItem(item)
			.then((task) => this.tasks.update((currentTasks) => [...(currentTasks ?? []), task]));
	}

	completeTask(id: string) {
		this.db
			.removeItem(id)
			.then(() =>
				this.tasks.update((currentTasks) =>
					currentTasks ? currentTasks.filter((task) => task.id !== id) : null
				)
			);
	}
}
