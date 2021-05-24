import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alimentos, Status } from 'src/app/models/models';
import { AlimentosService } from 'src/app/services/alimentos/alimentos.service';

interface ModalData {
  alimento: Alimentos
}

@Component({
  selector: 'app-eliminar-alimento',
  templateUrl: './eliminar-alimento.component.html',
  styleUrls: ['./eliminar-alimento.component.scss']
})
export class EliminarAlimentoComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  alimento = new Alimentos()


  @Output() alimentoEliminado = new EventEmitter()

  constructor(
    private dialog: MatDialogRef<EliminarAlimentoComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private alimentosService: AlimentosService
  ) { }

  ngOnInit(): void {
    this.alimento = this.modalData.alimento
  }

  deletemMarca() {
    this.currentStatus = Status.loading

    this.alimentosService.deleteAlimento(this.alimento.idAlimento).subscribe(e => {
      this.currentStatus = Status.success
      this.alimentoEliminado.emit()
    })
  }

  close() {
    this.dialog.close()
  }
}
