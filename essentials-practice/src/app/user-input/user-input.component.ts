import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { InvestmentService } from "../investment.service";

@Component({
  selector: "app-user-input",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./user-input.component.html",
  styleUrl: "./user-input.component.css",
})
export class UserInputComponent {
  private investmentService = inject(InvestmentService);

  enteredInitialInvestment = "0";
  enteredAnnualInvestment = "0";
  enteredExpReturn = "5";
  enteredDuration = "10";

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment,
      annualInvestment: +this.enteredAnnualInvestment,
      expectedReturn: +this.enteredExpReturn,
      duration: +this.enteredDuration,
    });

    this.enteredInitialInvestment = "0";
    this.enteredAnnualInvestment = "0";
    this.enteredExpReturn = "5";
    this.enteredDuration = "10";
  }
}
