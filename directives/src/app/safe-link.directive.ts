import { Directive, ElementRef, inject, Input } from "@angular/core";

@Directive({
  selector: "a[appSafeLink]",
  standalone: true,
  host: { "(click)": "onConfirmLeavePage($event)" },
})
export class SafeLinkDirective {
  @Input({ required: true, alias: "appSafeLink" }) queryParam!: string;

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onConfirmLeavePage(event: MouseEvent) {
    const confirm = window.confirm("Are you sure you want to leave the app?");

    if (confirm) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + `?from=${this.queryParam}`;
      return;
    }
    event.preventDefault();
  }
}
