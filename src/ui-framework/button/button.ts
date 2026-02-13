import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {FaIconComponent, IconDefinition} from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'px-button',
  imports: [FaIconComponent],
  template: `
    <button [class]="buttonClasses" (click)="onClick($event)">
      @if (icon) { <fa-icon [icon]="icon"></fa-icon> }
      @if(label) { <p>{{label}}</p> }
      @else { <ng-content></ng-content> }
    </button>
  `
})
export class Button
{
  @Input() public icon?: IconDefinition;
  @Input({transform: (value: 'left' | 'right') => value === 'left'})
  public iconAlign: boolean = true;
  @Input() public level: 'none' | 'trace' | 'info' | 'warn' | 'danger' = 'none';
  @Input() public size: 'small' | 'medium' | 'large' | 'huge' = 'medium';
  @Input() public label?: string;
  @Input({transform: booleanAttribute}) public raised: boolean = false;
  @Input({transform: booleanAttribute}) public outline: boolean = false;
  @Input({transform: booleanAttribute}) public noPropagate: boolean = true;
  @Output() public clicked: EventEmitter<PointerEvent> = new EventEmitter();

  protected onClick($event: PointerEvent)
  {
    this.clicked.emit($event);
    if(this.noPropagate) $event.stopImmediatePropagation();
  }

  protected get buttonClasses(): string
  {
    const baseClasses = 'rounded-lg font-semibold flex transition-all duration-200 active:scale-95 cursor-pointer items-center justify-center';
    const flexDirection = this.iconAlign ? 'flex-row' : 'flex-row-reverse';

    const sizeClasses = {
      small: this.icon && !this.label ? 'p-2 text-sm' : 'px-3 py-2 text-sm gap-1.5',
      medium: this.icon && !this.label ? 'p-3 text-base' : 'px-4 py-3 text-base gap-2',
      large: this.icon && !this.label ? 'p-4 text-lg' : 'px-6 py-4 text-lg gap-2',
      huge: this.icon && !this.label ? 'p-5 text-xl' : 'px-8 py-5 text-xl gap-3'
    };

    const shadow = this.raised ? 'shadow-lg hover:shadow-xl active:shadow-md dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70' : '';
    const levelClasses = this.outline ?
      {
        trace: 'border-2 border-sky-400 text-sky-400 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-950',
        info: 'border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950',
        warn: 'border-2 border-amber-400 text-amber-400 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-950',
        danger: 'border-2 border-rose-400 text-rose-400 hover:bg-rose-50 dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-950',
        none: 'border-2 border-slate-800 text-slate-800 hover:bg-slate-50 dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-800'
      }
      :
      {
        trace: 'bg-sky-400 hover:bg-sky-500 dark:text-sky-50 dark:bg-sky-800 dark:hover:bg-sky-700',
        info: 'bg-emerald-400 hover:bg-emerald-500 dark:text-emerald-50 dark:bg-emerald-800 dark:hover:bg-emerald-700',
        warn: 'bg-amber-400 hover:bg-amber-500 dark:text-amber-50 dark:bg-amber-800 dark:hover:bg-amber-700',
        danger: 'bg-rose-400 hover:bg-rose-500 dark:text-rose-50 dark:bg-rose-800 dark:hover:bg-rose-700',
        none: 'bg-slate-800 hover:bg-slate-700 text-slate-50 dark:text-slate-900 dark:bg-slate-400 dark:hover:bg-slate-300'
      };
    return `${baseClasses} ${flexDirection} ${sizeClasses[this.size]} ${shadow} ${levelClasses[this.level]}`;
  }
}
