import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AccessibilityService } from './services/accessibility-plugin/accessibility-plugin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aprender-para-vida-angular';

  constructor(
    private accessibility: AccessibilityService
  ) {}

  ngOnInit(): void {
    this.accessibility.createAccessibilityButton();
  }
}
