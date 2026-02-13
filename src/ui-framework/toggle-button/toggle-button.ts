import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  standalone: true,
  selector: 'px-toggle-button',
  template: `
    <label class="inline-flex items-center cursor-pointer">
      <input type="checkbox" [checked]="checked" class="sr-only peer" (click)="onClick($event)">
      <div [class]="buttonClasses"></div>
    </label>
  `
})
export class ToggleButton
{
  @Input() public level: 'none' | 'trace' | 'info' | 'warn' | 'danger' = 'none';
  @Input() public size: 'small' | 'medium' | 'large' | 'huge' = 'medium';
  @Input({transform: booleanAttribute}) public noPropagate: boolean = true;
  @Input({transform: booleanAttribute}) public checked: boolean = false;
  @Output() public clicked: EventEmitter<PointerEvent> = new EventEmitter();

  protected onClick($event: PointerEvent)
  {
    this.clicked.emit($event);
    if(this.noPropagate) $event.stopImmediatePropagation();
  }

  protected get buttonClasses(): string
  {
    const baseClasses = 'relative bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[\'\'] after:absolute after:bg-white after:rounded-full after:transition-all';

    const sizeClasses = {
      small: 'w-7 h-4 after:h-3 after:w-3 after:top-0.5 after:start-0.5',
      medium: 'w-9 h-5 after:h-4 after:w-4 after:top-0.5 after:start-0.5',
      large: 'w-11 h-6 after:h-5 after:w-5 after:top-0.5 after:start-0.5',
      huge: 'w-14 h-7 after:h-6 after:w-6 after:top-0.5 after:start-0.5'
    };

    const levelClasses = {
      trace: 'peer-checked:bg-sky-400 dark:peer-checked:bg-sky-800',
      info: 'peer-checked:bg-emerald-400 dark:peer-checked:bg-emerald-800',
      warn: 'peer-checked:bg-amber-400 dark:peer-checked:bg-amber-800',
      danger: 'peer-checked:bg-rose-400 dark:peer-checked:bg-rose-800',
      none: 'peer-checked:bg-slate-800 dark:peer-checked:bg-slate-400'
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${levelClasses[this.level]}`;
  }
}
