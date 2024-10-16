import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { TasksComponent, resolveUserTasks } from "./tasks/tasks.component";
import {
  canLeaveEditPage,
  NewTaskComponent,
} from "./tasks/new-task/new-task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import {
  resolveTitle,
  resolveUsername,
  UserTasksComponent,
} from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);

  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl("/unauthorized"));
};

export const routes: Routes = [
  {
    path: "",
    component: NoTaskComponent,
    title: "No Task Selected",
  },
  {
    path: "users/:userId",
    component: UserTasksComponent,
    data: {
      message: "Hello!",
    },
    resolve: {
      username: resolveUsername,
    },
    canMatch: [dummyCanMatch],
    children: [
      {
        path: "",
        redirectTo: "tasks",
        pathMatch: "full",
      },
      {
        path: "tasks",
        component: TasksComponent,
        runGuardsAndResolvers: "always",
        resolve: {
          userTasks: resolveUserTasks,
        },
        title: resolveTitle,
      },
      {
        path: "tasks/new",
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
