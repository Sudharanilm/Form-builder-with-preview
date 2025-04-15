import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule
  ]
})
export class FormBuilderComponent {
  fieldList: any[] = [];
  form: FormGroup;
  fieldType: string = 'text';
  previewMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  addField() {
    const fieldName = `field${this.fieldList.length + 1}`;
    const newField = {
      name: fieldName,
      type: this.fieldType,
      label: '',
      placeholder: '',
      required: false,
      options: this.fieldType === 'dropdown' || this.fieldType === 'radio' ? ['Option 1', 'Option 2'] : []
    };
    this.fieldList.push(newField);
    this.form.addControl(fieldName, this.fb.control('', newField.required ? Validators.required : null));
  }

  updateFieldConfig(index: number) {
    const field = this.fieldList[index];
    const control = this.form.get(field.name);
    if (field.required) {
      control?.setValidators([Validators.required]);
    } else {
      control?.clearValidators();
    }
    control?.updateValueAndValidity();
  }

  removeField(index: number) {
    const field = this.fieldList[index];
    this.form.removeControl(field.name);
    this.fieldList.splice(index, 1);
  }

  togglePreview() {
    this.previewMode = !this.previewMode;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Form Submitted:', this.form.value);
      alert('✅ Form submitted successfully!');
    } else {
      alert('⚠️ Please complete all required fields.');
      this.form.markAllAsTouched();
    }
  }
}
