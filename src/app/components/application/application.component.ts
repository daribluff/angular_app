import { Component, OnInit, OnChanges } from '@angular/core';
import { BlockService } from '../../services/block.service';
import { Block } from '../../models/Block';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  blocks: Block[];
  constructor(
    public blockService: BlockService
  ) { }

  ngOnInit() {
    this.blockService.getBlocks().subscribe(blocks => {
      this.blocks = blocks;
    })
  }

  getCss(block) {

    this.blocks = this.blockService.getBlocks();

    console.log(this.blocks);

    let css = block.css;

    let css2 = JSON.parse(css);

    return css2;
  }

}