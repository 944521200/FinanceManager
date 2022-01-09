import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
            .observe('(max-width: 1279px)')
            .pipe(untilDestroyed(this))
            .subscribe((event) => {
                this.isMobile = event.matches;
            });
        this.updateDarkTheme();
    }

    @HostBinding('class') className = '';

    @ViewChild('sidenav') sidenav!: MatSidenav;

    darkTheme = true;

    themeChanged(event: MatSlideToggleChange) {
        this.darkTheme = event.checked;
        this.updateDarkTheme();
    }

    private updateDarkTheme() {
        const darkClassName = 'dark-theme';
        this.className = this.darkTheme ? darkClassName : '';
    }

    closeSidenavIfMobile() {
        if (this.isMobile) this.sidenav.close();
    }
    isMobile = false;
    openned = true;
    title = 'financeManager';
    collapsed = true;
}
