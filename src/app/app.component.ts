import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver
            .observe('(max-width: 750px)')
            .pipe(untilDestroyed(this))
            .subscribe((event) => {
                this.isMobile = event.matches;
            });
    }
    isMobile = false;
    openned = true;
    title = 'financeManager';
    collapsed = true;
}
