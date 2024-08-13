import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";
import { TasksModule } from "./tasks/tasks.module";
import { UserComponent } from "./user/user.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent],
  imports: [BrowserModule, SharedModule, TasksModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
