import { Component } from "@angular/core";

@Component({
  selector: "app-server-status",
  standalone: true,
  imports: [],
  templateUrl: "./server-status.component.html",
  styleUrl: "./server-status.component.css",
})
export class ServerStatusComponent {
  currentStatus: "online" | "offline" | "unknown" = "offline";

  constructor() {
    setInterval(() => {
      const rdn = Math.random();

      if (rdn < 0.5) {
        this.currentStatus = "online";
      } else if (rdn < 0.9) {
        this.currentStatus = "offline";
      } else {
        this.currentStatus = "unknown";
      }
    }, 5000);
  }
}
