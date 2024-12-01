import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAutosizeDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Task } from '../types';

@Component({
	selector: 'app-new-task-collapsable',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		NzButtonComponent,
		NzIconModule,
		NzAutosizeDirective,
		NzFormModule,
		NzDatePickerComponent,
		NzInputModule,
	],
	templateUrl: './new-task.component.html',
	styleUrl: './new-task.component.scss',
})
export class NewTaskCollapsableComponent {
	@ViewChild(FormGroupDirective) formGroup!: FormGroupDirective;
	@ViewChild('titleInput') titleInput: ElementRef;
	@Output() taskCreated = new EventEmitter<Task>();

	taskForm = new FormGroup({
		title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		description: new FormControl('', { nonNullable: true }),
		dueToDate: new FormControl(null),
	});

	createTask() {
		// this.titleInput.nativeElement.focus()
		if (this.taskForm.controls.title.value) {
			this.taskCreated.emit(this.taskForm.getRawValue());
			this.taskForm.reset();
		}
	}

	resetForm() {
		this.taskForm.reset();
	}
}
