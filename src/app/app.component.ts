import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setCollapsedSivdenav, setNightMode } from './settings/store/settings.actions';
import { selectCollapsedSidenav, selectNightMode } from './settings/store/settings.selectors';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    constructor(
        private breakpointObserver: BreakpointObserver,
        private store: Store,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    ) {}

    ngOnInit(): void {
        this.breakpointObserver
            .observe('(max-width: 1279px)')
            .pipe(untilDestroyed(this))
            .subscribe((event) => {
                this.isMobile = event.matches;
            });

        this.darkTheme = this.store.select(selectNightMode).pipe(untilDestroyed(this));
        this.collapsedSivenav = this.store.select(selectCollapsedSidenav).pipe(untilDestroyed(this));

        this.store
            .select(selectNightMode)
            .pipe(untilDestroyed(this))
            .subscribe((darkmode) => this.updateDarkTheme(darkmode));

        this.matIconRegistry.addSvgIcon('FM_Logo', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon.svg'));
    }

    @HostBinding('class') className = '';

    @ViewChild('sidenav') sidenav!: MatSidenav;

    darkTheme!: Observable<boolean>;

    collapsedSivenav!: Observable<boolean>;

    themeChanged(event: MatSlideToggleChange) {
        this.store.dispatch(setNightMode({ darkMode: event.checked }));
    }

    sidenavToggle() {
        this.store
            .select(selectCollapsedSidenav)
            .pipe(take(1))
            .subscribe((collapsed) => {
                this.store.dispatch(setCollapsedSivdenav({ sidenavCollapse: !collapsed }));
            });
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
