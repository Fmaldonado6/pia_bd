import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Marca, Status } from 'src/app/models/models';
import { MarcasService } from 'src/app/services/marcas/marcas.service';

interface FormValues {
  nombre: string
}

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.scss']
})
export class CrearMarcaComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  @Output() marcaCreada = new EventEmitter()

  form = new FormGroup({})

  constructor(
    private dialog: MatDialogRef<CrearMarcaComponent>,
    private marcasService: MarcasService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ])
    })

  }

  submit(values: FormValues) {
    this.currentStatus = Status.loading

    const marca = new Marca()
    marca.nombreMarca = values.nombre
    this.marcasService.addMarca(marca).subscribe(e => {
      this.marcaCreada.emit()
      this.currentStatus = Status.success
      setTimeout(() => {
        this.close()
      }, 1500);
    })
  }

  close() {
    this.dialog.close()
  }

}
