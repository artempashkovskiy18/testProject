import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  protected readonly NO_VALUE = "noValue";
  protected readonly SHORT_VALUE = "shortValue";
  protected readonly MEDIUM = "medium";
  protected readonly WEAK = "weak";
  protected readonly STRONG = "strong";


  strength = this.NO_VALUE;
  lettersRegEx = new RegExp("[a-zA-Z]");
  numbersRegEx = new RegExp("[0-9]");
  symbolsRegEx = new RegExp("[!-/:-@\[-`{-~]");


  onChange(value: string) {
    if (value.length === 0) {
      this.strength = this.NO_VALUE;
    } else if (value.length < 8) {
      this.strength = this.SHORT_VALUE;
    } else {

      if (this.isWeak(value)) {
        this.strength = this.WEAK;
      } else if (this.isMedium(value)) {
        this.strength = this.MEDIUM;
      } else if (this.isStrong(value)) {
        this.strength = this.STRONG;
      }
    }
  }

  isStrong(password: string) {
    return password.match(this.lettersRegEx) && password.match(this.numbersRegEx) && password.match(this.symbolsRegEx);
  }

  isWeak(password: string) {
    return (password.match(this.lettersRegEx) && !password.match(this.numbersRegEx) && !password.match(this.symbolsRegEx)) ||
      (!password.match(this.lettersRegEx) && password.match(this.numbersRegEx) && !password.match(this.symbolsRegEx)) ||
      (!password.match(this.lettersRegEx) && !password.match(this.numbersRegEx) && password.match(this.symbolsRegEx));
  }

  isMedium(password: string) {
    return (password.match(this.lettersRegEx) && password.match(this.numbersRegEx) && !password.match(this.symbolsRegEx)) ||
      (password.match(this.lettersRegEx) && !password.match(this.numbersRegEx) && password.match(this.symbolsRegEx)) ||
      (!password.match(this.lettersRegEx) && password.match(this.numbersRegEx) && password.match(this.symbolsRegEx));
  }
}
