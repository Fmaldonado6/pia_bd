import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Factura, FacturaResource } from 'src/app/models/models';


@Component({
  selector: 'factura-info',
  templateUrl: './factura-info.component.html',
  styleUrls: ['./factura-info.component.scss']
})
export class FacturaInfoComponent implements OnInit {

  @Input() factura = new FacturaResource()

  form = new FormGroup({})

  @Output() formSubmit = new EventEmitter<Factura>()
  @Output() iconClicked = new EventEmitter()


  ngOnInit(): void {
    this.form = new FormGroup({

      nombre: new FormControl(this.factura.nombre, [Validators.required]),
      apPaterno: new FormControl(this.factura.apPaterno, [Validators.required]),
      apMaterno: new FormControl(this.factura.apMaterno, [Validators.required]),
      telefono: new FormControl(this.factura.telefono, [Validators.required]),
      RFC: new FormControl(this.factura.RFC, [Validators.required]),
      concepto: new FormControl(this.factura.concepto, [Validators.required]),

    })
  }

  onIconClicked() {
    this.iconClicked.emit()
  }

  onSubmit(values: any) {
    this.formSubmit.emit(values)
  }

}
