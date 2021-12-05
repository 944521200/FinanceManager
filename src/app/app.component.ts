import { Component /**, OnInit */ } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as ExpensesActions from './expenses/store/expenses.actions';
// import * as TagsActions from './tags/store/tags.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent /** implements OnInit */ {
    // constructor(private store: Store) {}
    // ngOnInit(): void {
    //     // this.store.dispatch(ExpensesActions.resetState());
    //     // this.store.dispatch(TagsActions.resetState());
    // }

    title = 'financeManager';
    collapsed = true;
}
