import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  constructor(
    private expenseService: ExpenseService,
    private tagService: TagService
  ) {}

  expenseForm!: FormGroup;
  editingIndex: number = -1;

  allTags!: number[];
  addedTags!: number[];
  toBeAddedTags!: number[];

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, [Validators.maxLength(250)]),
      amount: new FormControl(1, [
        Validators.required,
        this.positiveNumber.bind(this),
      ]),
      price: new FormControl(null, [
        Validators.required,
        this.positiveNumber.bind(this),
      ]),
    });

    this.expenseService.editingExpense.subscribe((editingExpenseIndex) => {
      if (editingExpenseIndex != -1) {
        this.clearForm();
        //edit expense
        this.editingIndex = editingExpenseIndex;
        const editingExpense = this.expenseService.getExpense(
          this.editingIndex
        );

        this.expenseForm.reset({
          name: editingExpense.name,
          description: editingExpense.description,
          amount: editingExpense.amount,
          price: editingExpense.pricePerUnit,
        });
        this.addedTags = editingExpense.tags;
        this.toBeAddedTags = this.allTags.filter((tobeTag) => {
          if (!this.addedTags.includes(tobeTag)) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        //clear editing mode
        this.editingIndex = -1;
        this.clearForm();
      }
    });

    this.tagService.tagsChanged.subscribe((tags) => {
      this.allTags = tags.map(tag=>{return tag.ID});
    });
    this.allTags = this.tagService.getTags().map(tag=>{return tag.ID});
    this.toBeAddedTags = [...this.allTags];
    this.addedTags = [];
  }

  addTag(ID: number) {
    let tag;
    if (
      (tag = this.toBeAddedTags.find((item) => {
        return item == ID;
      }))
    ) {
      this.toBeAddedTags.splice(this.toBeAddedTags.indexOf(tag), 1);
      this.addedTags.push(tag);
    }
  }

  removeTag(ID: number) {
    let tag;
    if (
      (tag = this.addedTags.find((item) => {
        return item == ID;
      }))
    ) {
      this.addedTags.splice(this.addedTags.indexOf(tag), 1);
      this.toBeAddedTags.push(tag);
    }
  }
  getTagWithID(ID:number)
  {
    return this.tagService.getTag(ID);
  }

  positiveNumber(control: AbstractControl): ValidationErrors | null {
    if (isNaN(+control.value) || +control.value < 1) {
      //control.setValue(1);
      // this.expenseForm.patchValue({control.:1});
      // return null;
      return { notValidNumber: 'not a valid number' };
    }
    return null;
  }

  addExpense() {
    console.log(this.expenseForm);
    if (this.editingIndex != -1) {
      this.expenseService.udpateExpense(
        this.editingIndex,
        this.expenseForm.value['name'],
        this.expenseForm.value['description'],
        +this.expenseForm.value['amount'],
        this.expenseForm.value['price'],
        this.addedTags
      );
    } else {
      this.expenseService.addExpense(
        this.expenseForm.value['name'],
        this.expenseForm.value['description'],
        +this.expenseForm.value['amount'],
        this.expenseForm.value['price'],
        this.addedTags
      );
    }
    this.clearForm();
  }

  clearForm() {
    this.expenseForm.reset({ amount: 1 });
    this.editingIndex = -1;
    this.toBeAddedTags = [...this.allTags];
    this.addedTags = [];
  }
}
