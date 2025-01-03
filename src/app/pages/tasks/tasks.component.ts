import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Task } from './types';
import { NewTaskComponent } from './new-task/new-task.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TaskService } from './task.service';

@Component({
	selector: 'app-tasks',
	standalone: true,
	imports: [
		NavbarComponent,
		NzDividerModule,
		NzCheckboxModule,
		NzButtonComponent,
		NzIconModule,
		NzInputModule,
	],
	providers: [NzModalService],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
})
export class TasksComponent {
	tasks = signal<Task[]>([]);
	tasksService = inject(TaskService);
	modalService = inject(NzModalService);

	createTask(task: Task) {
		this.tasksService.createTask(task);
	}

	completeTask(selectedTask: Task) {
		this.tasksService.completeTask(selectedTask.id);
	}

	showCreateTaskForm() {
		const dialog = this.modalService.create({
			nzTitle: 'Add new task',
			nzContent: NewTaskComponent,
			nzNoAnimation: true,
			nzAutofocus: null,
		});

		dialog.afterClose.subscribe((data) => {
			if (data) this.createTask(data);
		});
	}
}
