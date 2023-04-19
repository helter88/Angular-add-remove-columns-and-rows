import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = this.fb.group({
    name: 'Artur',
    displayedHead: this.fb.array([1,2]),
    myFormArray: this.fb.array([
      this.fb.array(['ala','lolo']),
      this.fb.array(['kotek','koko']),

    ])
  })

  constructor(private fb: FormBuilder) {
  }

  get displayedHead(): FormArray {
    return this.form.get("displayedHead") as FormArray;
  }

  get myFormArray(): FormArray {
    return this.form.get("myFormArray") as FormArray;
  }
  
   myFormArray2(i: number): FormArray {
   let nestedArray = this.form.get("myFormArray") as FormArray<FormArray>;
   let b =  nestedArray.controls[i];
    return b;
  }

  displalog(col:any) {
    console.log(col)
  }
  onSave() {
    console.log(this.form.value)
  }
}
