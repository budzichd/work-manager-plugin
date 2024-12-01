import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Task } from './types';
import { NewTaskComponent } from './new-task/new-task.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
	NzFormControlComponent,
	NzFormItemComponent,
	NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NewTaskCollapsableComponent } from './new-task-collapsable/new-task.component';

@Component({
	selector: 'app-tasks',
	standalone: true,
	imports: [
		NavbarComponent,
		NewTaskCollapsableComponent,
		NzFormItemComponent,
		NzFormLabelComponent,
		NzDividerModule,
		NewTaskComponent,
		NewTaskComponent,
		NzCheckboxModule,
		NzButtonComponent,
		NzIconModule,
		NzFormControlComponent,
		NzInputModule,
	],
	providers: [NzModalService],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
})
export class TasksComponent {
	tasks = signal<Task[]>([]);

	constructor(private modalService: NzModalService) {}

	createTask(task: Task) {
		this.tasks.update((tasks) => [...tasks, task]);
	}

	completeTask(selectedTask: Task) {
		this.tasks.update((tasks) => tasks.filter((task) => task.title !== selectedTask.title));
	}

	showCreateTaskForm() {
		const dialog = this.modalService.create({
			nzTitle: 'Add new task',
			nzContent: NewTaskComponent,
			nzNoAnimation: true,
		});

		dialog.afterClose.subscribe((data) => {
			console.log(data);
			this.createTask(data);
		});
	}
}
