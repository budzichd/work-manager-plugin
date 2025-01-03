import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAutosizeDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
	selector: 'app-new-task',
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
		NzModalModule,
	],
	templateUrl: './new-task.component.html',
	styleUrl: './new-task.component.scss',
})
export class NewTaskComponent implements AfterViewInit {
	@ViewChild('titleInput') titleInput: ElementRef;

	taskForm = new FormGroup({
		title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		description: new FormControl('', { nonNullable: true }),
		dueToDate: new FormControl(null),
	});

	constructor(private modal: NzModalRef) {}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.titleInput.nativeElement.focus();
		}, 0);
	}

	createTask() {
		if (this.taskForm.valid) {
			this.modal.destroy(this.taskForm.getRawValue());
		}
	}

	closeDialog() {
		this.modal.destroy();
	}
}
