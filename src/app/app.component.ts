import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = this.fb.group({
    name: 'Artur',
    displayedHead: this.fb.array([
      this.fb.control(1),
      this.fb.control(2)
    ]),
    myFormArray: this.fb.array([
      this.fb.array([11,22]),
      this.fb.array([111,222]),

    ])
  })

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe((val)=> console.log(val));
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

  addColumn(): void {
    this.displayedHead.push(this.fb.control(null));
    this.myFormArray.controls.forEach((control: AbstractControl<any>, index: number, array: AbstractControl<any>[]) => {
      const formArray = control as FormArray;
      formArray.push(this.fb.control(null));
      }
    )
  }

  addRow(): void {
    this.myFormArray.push(this.fb.array(this.nullGenerator()));
    this.myFormArray.updateValueAndValidity();
  }

  onSave() {
    console.log(this.form.value)
  }

  nullGenerator() {
    const arrayWithNulls =[]
    const numberOfColumns = this.displayedHead.length
    for(let i = 0; i<numberOfColumns; i++){
      arrayWithNulls.push(null)
    }
    return arrayWithNulls
  }
}
