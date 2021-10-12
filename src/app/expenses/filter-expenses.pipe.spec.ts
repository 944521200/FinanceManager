import { FilterExpensesPipe } from './filter-expenses.pipe';

describe('FilterExpensesPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterExpensesPipe();
    expect(pipe).toBeTruthy();
  });
});
