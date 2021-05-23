import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status, TipoAlimento } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';

interface FormValues {
  nombre: string
}

interface ModalData {
  tipo: TipoAlimento
}


@Component({
  selector: 'app-editar-tipo-alimento',
  templateUrl: './editar-tipo-alimento.component.html',
  styleUrls: ['./editar-tipo-alimento.component.scss']
})
export class EditarTipoAlimentoComponent implements OnInit {
  @Output() tipoEditado = new EventEmitter()


  Status = Status
  currentStatus = Status.loaded


  form = new FormGroup({})

  tipo = new TipoAlimento()

  constructor(
    private dialog: MatDialogRef<EditarTipoAlimentoComponent>,
    private tipoAlimentosService: TiposAlimentosService,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {

    Object.assign(this.tipo, this.modalData.tipo)

    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ])
    })

  }

  submit(values: FormValues) {
    this.currentStatus = Status.loading

    this.tipo.nombre = values.nombre
    this.tipoAlimentosService.updateTipoAlimento(this.tipo).subscribe(e => {
      this.tipoEditado.emit()
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
