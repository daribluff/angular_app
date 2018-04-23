import { Component, OnInit, Directive } from '@angular/core';
import { BlockService } from '../../services/block.service';
import { Block } from '../../models/Block';

import { OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css'],
})

export class BlocksComponent implements OnInit{

  blocks:Block;

  @Output() blockEvent = new EventEmitter();

  constructor(
    public blockService:BlockService
  ) {
    this.blockService.getBlocks().subscribe(blocks => {

        let blockobjArr = [];

      blocks.map(block => {

        let blockobj = block['payload'].doc.data();
        let blockobjArray = [];

          Object.keys(blockobj).map(function(key){
              blockobjArray[key] = blockobj[key];
          });

          blockobjArray['id'] = block['payload'].doc['id'];
          blockobjArray['block'] = block['payload'].doc.data();

          blockobjArr.push(blockobjArray);

      });

      this.blocks = blockobjArr;

    })
   }

  ngOnInit() {
    // this.blockService.currentBlock.subscribe(block => this.blocks = block);
  }

  ajouterdivdedans(className, niveau, idBlock) {

    let niveausplit = niveau.toString().split('_');

    length = parseInt(niveausplit.length);

    let newNiveau = '';

    for (let i = 0; i <= length; i++){
      if(i == 0){
        newNiveau = niveausplit[0];
      }else if(i != length){
        newNiveau = newNiveau + '_' + niveausplit[i];
      }else{
        newNiveau = newNiveau + '_' + 1;
      }
    }

    var newBlock = {
      type: 'div',
      className: 'second-block',
      idBlock: 'sous-' + idBlock,
      htmlContent: 'sous-' + className,
      niveau: newNiveau.toString(),
      idParent: className,
      css: JSON.stringify(''),
      proprietes: ''
    };

    this.blocks.push(newBlock);

    this.addBlock(newBlock);

    this.blockEvent.emit(this.blocks);

  }

  ajouterdivendessous(className, niveau, idBlock) {

    let niveausplit = niveau.toString().split('_');

    length = parseInt(niveausplit.length);

    let newNiveau = '';

    for (let i = 0; i < length; i++) {
      if (i == 0) {
        newNiveau = niveausplit[0];
      } else if (i != length-1) {
        newNiveau = newNiveau + '_' + niveausplit[i];
      } else {
          newNiveau = newNiveau + '_' + (parseInt(niveausplit[i]) + 1);
      }
    }

    // let j = 1;

    // if (newNiveau == '') {
    //   while ($('#' + j).length > 0) {
    //     j = j + 1;
    //   }
    // } else {
    //   while ($('#' + newNiveau + '_' + j).length > 0) {
    //     j = j + 1;
    //   }
    // }

    // newNiveau == '' ? newNiveau = j : newNiveau = newNiveau + '_' + j;

    var newBlock = {
      type: 'div',
      className: 'second-block',
      idBlock: 'sous-' + idBlock,
      htmlContent: 'sous-' + className,
      niveau: newNiveau.toString(),
      idParent: className,
      css: JSON.stringify(''),
      proprietes: ''
    };

    this.addBlock(newBlock);

    this.blocks.push(newBlock);

  }

  addBlock(newBlock) {

    this.blockService.updateblocks(newBlock);

  }

  changeContent(id, block){

    // this.blockService.changeBlock(this.blocks);

      // block.each(function(e) {
      //
      //    console.log(e);
      //     // return { name: e };
      // });

      this.blockService.updateContent(id, block);

  }

  defineClass(niveau){

    let niveausplit = [];

    let classNiveau = '';

    niveau.toString().replace('_', '') == niveau ? niveausplit = [niveau] : niveausplit = niveau.toString().split('_');

    switch(niveausplit.length){
      case 1: 
        classNiveau = 'first-block'
        break;
      case 2:
        classNiveau = 'second-block'
        break;
      case 3:
        classNiveau = 'third-block'
        break;
      case 4:
        classNiveau = 'for-block'
        break;
      case 5:
        classNiveau = 'five-block'
        break;
    }

    return classNiveau;

  }

  bindCss(css) {

    var cssTab = [];

    let css2 = css.replace('"', '');

    cssTab = css2.split(',');

    $('.css-area').val(cssTab);

  }

}
