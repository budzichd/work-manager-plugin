import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../types';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-new-task',
	standalone: true,
	imports: [
		MatButton,
		MatIcon,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		FormsModule,
	],
	templateUrl: './new-task.component.html',
	styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
	taskForm = new FormGroup({
		title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		description: new FormControl('', { nonNullable: true }),
	});

	@ViewChild(FormGroupDirective) formGroup!: FormGroupDirective;

	@Output() taskCreated = new EventEmitter<Task>();

	submitTask() {
		if (this.taskForm.valid) {
			this.taskCreated.emit(this.taskForm.getRawValue());
		}
		this.formGroup.resetForm();
		this.taskForm.reset();
	}
}
