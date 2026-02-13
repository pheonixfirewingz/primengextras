import { Component } from '@angular/core';
import {ToggleButton} from '../../../ui-framework/toggle-button/toggle-button';
@Component({ selector: 'test-toggle-buttons', imports: [ToggleButton], templateUrl: './toggle-buttons.html' })
export class ToggleButtons {
  protected onToggle($event: PointerEvent) {
    console.log($event);
  }
}
