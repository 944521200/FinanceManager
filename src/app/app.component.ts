import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setNightMode } from './settings/store/settings.actions';
import { selectNightMode } from './settings/store/settings.selectors';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(breakpointObserver: BreakpointObserver, private store: Store) {
        breakpointObserver
            .observe('(max-width: 1279px)')
            .pipe(untilDestroyed(this))
            .subscribe((event) => {
                this.isMobile = event.matches;
            });

        this.darkTheme = this.store.select(selectNightMode).pipe(untilDestroyed(this));
        this.store
            .select(selectNightMode)
            .pipe(untilDestroyed(this))
            .subscribe((darkmode) => this.updateDarkTheme(darkmode));
    }

    @HostBinding('class') className = '';

    @ViewChild('sidenav') sidenav!: MatSidenav;

    darkTheme!: Observable<boolean>;

    themeChanged(event: MatSlideToggleChange) {
        this.store.dispatch(setNightMode({ darkMode: event.checked }));
    }

    private updateDarkTheme(newDarkTheme: boolean) {
        const darkClassName = 'dark-theme';
        this.className = newDarkTheme ? darkClassName : '';
    }

    closeSidenavIfMobile() {
        if (this.isMobile) this.sidenav.close();
    }
    isMobile = false;
    openned = true;
    title = 'financeManager';
    collapsed = true;
}
