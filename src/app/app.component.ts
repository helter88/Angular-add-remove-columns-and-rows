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
    ]),
    optionsArray: this.fb.array([
      this.fb.control('A'),
      this.fb.control('B')
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

  get optionsArray(): FormArray {
    return this.form.get("optionsArray") as FormArray;
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

  removeColumn(i: number): void {
    this.displayedHead.removeAt(i);
    this.myFormArray.controls.forEach((control: AbstractControl<any>, index: number, array: AbstractControl<any>[]) => {
      const formArray = control as FormArray;
      formArray.removeAt(i);
    });
  }

  // removeLastColumn(): void {
  //   const lastColumnIndex = this.displayedHead.length - 1;
  //   this.displayedHead.removeAt(lastColumnIndex);
  //   this.myFormArray.controls.forEach((control: AbstractControl<any>, index: number, array: AbstractControl<any>[]) => {
  //     const formArray = control as FormArray;
  //     formArray.removeAt(lastColumnIndex);
  //   });
  // }

  addRow(): void {
    this.myFormArray.push(this.fb.array(this.nullGenerator()));
    this.optionsArray.push(this.fb.control(null));
  }

  removeRow(i: number): void {
    this.myFormArray.removeAt(i);
    this.optionsArray.removeAt(i);
  }

  // removeLastRow(): void {
  //   const lastRowIndex = this.myFormArray.length - 1;
  //   this.myFormArray.removeAt(lastRowIndex);
  //   this.optionsArray.removeAt(lastRowIndex);
  // }

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
