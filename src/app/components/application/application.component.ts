import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BlockService } from '../../services/block.service';
import { Block } from '../../models/Block';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  blocks:Block;

  constructor(
    public blockService: BlockService
  ) {
      this.blockService.getBlocks().subscribe(blocks => {

          let blockobjArr = [];

          blocks.map(block => {

              let blockobj = block['payload'].doc.data();
              let blockobjArray = [];

              Object.keys(blockobj).map(function(key){

                  blockobjArray[key] = blockobj[key];

              });

              blockobjArr.push(blockobjArray);

          });


          this.blocks = blockobjArr;

      })
   }

  ngOnInit() {
    // this.blockService.currentBlock.subscribe(block => this.blocks = block);
  }

  getCss(block) {

    let css = block.css;

    let css2 = JSON.parse(css);

    return css2;
    
  }

}