import { Routes } from '@angular/router';
import { TaskService } from './pages/tasks/task.service';
import { IndexedDBService } from './api-services/indexed-db.service';
import { APIService } from './api-services/types';

export const routes: Routes = [
	{ path: '', redirectTo: 'tasks', pathMatch: 'full' },
	{
		path: 'tasks',
		loadComponent: () => import('./pages/tasks/tasks.component').then((mod) => mod.TasksComponent),
		providers: [
			TaskService,
			IndexedDBService,
			{ provide: APIService, useExisting: IndexedDBService },
		],
	},
];
