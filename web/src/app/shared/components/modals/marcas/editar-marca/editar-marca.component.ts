import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status, Marca } from 'src/app/models/models';
import { MarcasService } from 'src/app/services/marcas/marcas.service';
import { CrearMarcaComponent } from '../crear-marca/crear-marca.component';

interface FormValues {
  nombre: string
}

interface ModalData {
  marca: Marca
}

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.scss']
})
export class EditarMarcaComponent implements OnInit {
  Status = Status
  currentStatus = Status.loaded

  @Output() marcaCreada = new EventEmitter()

  form = new FormGroup({})

  marca = new Marca()

  constructor(
    private dialog: MatDialogRef<CrearMarcaComponent>,
    private marcasService: MarcasService,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {
    Object.assign(this.marca, this.modalData.marca)
    this.form = new FormGroup({
      nombre: new FormControl(this.marca.nombreMarca, [
        Validators.required
      ])
    })

  }

  submit(values: FormValues) {
    this.currentStatus = Status.loading

    this.marca.nombreMarca = values.nombre
    this.marcasService.updateMarca(this.marca).subscribe(e => {
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
