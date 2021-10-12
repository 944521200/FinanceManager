import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private expenseService:ExpenseService) { }

  expenseForm = this.formBuilder.group({
    name: '',
    description: '',
    amount:'',
    pricePerUnit:''
  });
//TODO: ADD LIMITS TO FIELDS, SO NOT TO OVERLOAD DATABASE.

  ngOnInit(): void {
  }

   
  invalidFeebBackName:string =  "There is an error in the name";
  invalidName:boolean=false;
  validName:boolean=false;

  validateName()
  {
    const name:string = this.expenseForm.value["name"];
    if(!name || (name &&name.length<5))
    {
      this.invalidName=true;
      this.validName=false;
      this.invalidFeebBackName="Name too short 5 characters min.";

    }
    else
    {
      this.invalidName=false;
      this.validName=true;
    }
  }
  resetName()
  {
    this.invalidName=false;
    this.validName=false;
  }

  invalidFeebBackDescription:string =  "There is an error in the Description";
  invalidDescription:boolean=false;
  validDescription:boolean=false;

  validateDescription()
  {
    const desc:string = this.expenseForm.value["description"];

    this.invalidDescription=false;
    this.validDescription=true;
  }
  resetDescription()
  {
    this.invalidDescription=false;
    this.validDescription=false;
  }

  invalidFeebBackAmount:string =  "There is an error in the amount";
  invalidAmount:boolean = false;
  validAmount:boolean =false;

  validateAmount()
  {
    const amount:string = this.expenseForm.value["amount"];
    if(isNaN(+amount) || +amount<1)
    {
      const form = this.expenseForm.value;
      form["amount"]="1"
      this.expenseForm.setValue(form);
    }

    this.invalidAmount=false;
    this.validAmount=true;
    
  }

  resetAmount()
  {
    this.invalidAmount=false;
    this.validAmount=false;
  }

  invalidFeebBackPrice:string =  "There is an error in the Price";
  invalidPrice:boolean =false;
  validPrice:boolean =false;

  validatePrice()
  {
    const price:string = this.expenseForm.value["pricePerUnit"];
    if(isNaN(+price) || +price<1)
    {
      this.invalidPrice=true;
      this.validPrice=false;
      this.invalidFeebBackPrice="Price must be a non negative valid number";
    }else
    {
      this.invalidPrice=false;
      this.validPrice=true;
    }


  }

  resetPrice()
  {
    this.invalidPrice=false;
    this.validPrice=false;
  }
  

  addExpense()
  {
    //console.log(this.nameInput+" - "+this.descInput+" - "+this.amountInput)
    console.log(this.expenseForm.value)

    this.validateName()
    this.validateDescription()
    this.validateAmount()
    this.validatePrice()

    if(this.invalidName|| this.invalidDescription || this.invalidAmount || this.invalidPrice) return;
    
    this.expenseService.AddExpense(this.expenseForm.value['name'],this.expenseForm.value['description'],+this.expenseForm.value['amount'],this.expenseForm.value['pricePerUnit'],[])

    /*this.nameInput ="";
    this.descInput="";
    this.amountInput="";*/
    this.expenseForm.reset();
    this.resetName()
    this.resetDescription()
    this.resetAmount()
    this.resetPrice()
  }

  clearForm()
  {
    this.expenseForm.reset();
    this.resetName()
    this.resetDescription()
    this.resetAmount()
    this.resetPrice()
  }

}
