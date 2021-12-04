import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExpensesComponent } from './search-expenses.component';

describe('SearchExpensesComponent', () => {
    let component: SearchExpensesComponent;
    let fixture: ComponentFixture<SearchExpensesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchExpensesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchExpensesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
