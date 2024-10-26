import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Task } from './types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTaskComponent } from './new-task/new-task.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
	selector: 'app-tasks',
	standalone: true,
	imports: [NavbarComponent, NewTaskComponent, NewTaskComponent, MatCheckbox],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
})
export class TasksComponent {
	tasks = signal<Task[]>([]);

	taskForm = new FormGroup({
		title: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
	});

	createTask(task: Task) {
		this.tasks.update((tasks) => [...tasks, task]);
	}

	completeTask(selectedTask: Task) {
		this.tasks.update((tasks) => tasks.filter((task) => task.title !== selectedTask.title));
	}
}
