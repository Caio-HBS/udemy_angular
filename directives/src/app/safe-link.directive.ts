import { Directive } from "@angular/core";

@Directive({
  selector: "a[appSafeLink]",
  standalone: true,
  host: { "(click)": "onConfirmLeavePage($event)" },
})
export class SafeLinkDirective {
  constructor() {
    console.log("SAFELINK DIRECTIVE");
  }

  onConfirmLeavePage(event: MouseEvent) {
    const confirm = window.confirm("Are you sure you want to leave the app?");

    if (confirm) {
      return;
    }
    event.preventDefault();
  }
}
