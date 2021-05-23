import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status, TipoAlimento } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';

interface ModalData {
  tipo: TipoAlimento
}

@Component({
  selector: 'app-eliminar-tipo-alimento',
  templateUrl: './eliminar-tipo-alimento.component.html',
  styleUrls: ['./eliminar-tipo-alimento.component.scss']
})
export class EliminarTipoAlimentoComponent implements OnInit {
  @Output() tipoEliminado = new EventEmitter()


  Status = Status
  currentStatus = Status.loaded



  tipo = new TipoAlimento()

  constructor(
    private dialog: MatDialogRef<EliminarTipoAlimentoComponent>,
    private tipoAlimentosService: TiposAlimentosService,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {

    Object.assign(this.tipo, this.modalData.tipo)



  }

  deleteTipo() {
    this.currentStatus = Status.loading

    this.tipoAlimentosService.deleteTipoAlimento(this.tipo.idTipoAlimento).subscribe(e => {
      this.tipoEliminado.emit()
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
