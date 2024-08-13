import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { TasksComponent } from "./tasks.component";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";

@NgModule({
  declarations: [TasksComponent, TaskComponent, NewTaskComponent],
  imports: [SharedModule, CommonModule, FormsModule],
  exports: [TasksComponent],
})
export class TasksModule {}
