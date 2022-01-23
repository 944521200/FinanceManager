import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [LayoutComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(LayoutComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'financeManager'`, () => {
        const fixture = TestBed.createComponent(LayoutComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('financeManager');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(LayoutComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.content span')?.textContent).toContain('financeManager app is running!');
    });
});
