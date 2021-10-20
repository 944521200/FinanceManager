import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  constructor(private tagService:TagService) { }
  tagForm!: FormGroup;


  ngOnInit(): void {
    this.tagForm =  new FormGroup(
      {
        'name':new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
        'description':new FormControl(null,[Validators.maxLength(250)]),
        'bgColor':new FormControl(1,[Validators.required]),
        'txtColor': new FormControl(null,[Validators.required])
      })
      setTimeout(() => {//Set default colors
        this.tagForm.patchValue({txtColor:"#e6e6e6", bgColor:"#545454"})
      }, 0);
  }
    
  positiveNumber(control:AbstractControl):ValidationErrors | null
  {
    if(isNaN(+control.value) || +control.value<1)
    {
      //control.setValue(1);
     // this.expenseForm.patchValue({control.:1});
     // return null;
      return { notValidNumber:"not a valid number"}
    }
    return null;
  }

  addTag(){
     console.log(this.tagForm.value)
     const form = this.tagForm.value;
     this.tagService.addTag(form['name'],form['description'],form['bgColor'],form['txtColor'])
     this.clearForm();
    
    }

  clearForm()
  {
    this.tagForm.reset({txtColor:"#e6e6e6", bgColor:"#545454"})
  }

}
