import {Component, OnInit, signal} from '@angular/core';
import {Buttons} from './tests/buttons/buttons';
import {Button} from '../ui-framework/button/button';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {ToggleButtons} from './tests/toggle-buttons/toggle-buttons';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Buttons,
    Button,
    ToggleButtons
  ]
})
export class App implements OnInit
{
  isDark = signal(false);

  toggleDark()
  {
    this.isDark.update(v => !v);
    localStorage.setItem('darkMode', JSON.stringify(!this.isDark()));
  }

  ngOnInit()
  {
    const saved = localStorage.getItem('darkMode');
    if (saved) this.isDark.set(JSON.parse(saved));
  }

  protected readonly faMoon = faMoon;
  protected readonly faSun = faSun;
}
