import { Component } from '@angular/core';
import {Button} from '../../../ui-framework/button/button';
import {faGrimace, faHome, faPlus, faUser} from '@fortawesome/free-solid-svg-icons';
import {faObsidian} from '@fortawesome/free-brands-svg-icons';
@Component({ selector: 'test-buttons', imports: [Button], templateUrl: './buttons.html' })
export class Buttons {
  protected readonly faUser = faUser;
  protected readonly faPlus = faPlus;
  protected readonly faHome = faHome;
  protected readonly faGrimace = faGrimace;
  protected readonly faObsidian = faObsidian;
}
