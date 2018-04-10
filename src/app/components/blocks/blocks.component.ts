import { Component, OnInit } from '@angular/core';
import { BlockService } from '../../services/block.service';
import { Block } from '../../models/Block';

import { OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css'],
})

export class BlocksComponent implements OnInit{
  blocks:Block[];
  constructor(
    public blockService:BlockService
  ) { }
  

  ngOnInit() {
    this.blockService.getBlocks().subscribe(blocks => {
      this.blocks = blocks;
    })
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
        newNiveau = newNiveau + '_' + 1);
      }
    }

    // let j = 1;

    // if(newNiveau == ''){
    //   while ($('#'+j).length > 0) {
    //     j = j + 1;
    //   }
    // }else{
    //   while ($('#' + newNiveau + '_' + j).length > 0) {
    //     j = j + 1;
    //   }
    // }
    
    // newNiveau == '' ? newNiveau = j : newNiveau = newNiveau + '_' + j;

    this.blocks.push({
        type: 'div',
        className: 'second-block',
        idBlock: 'sous-' + idBlock,
        htmlContent: 'sous-' + className,
        niveau: newNiveau.toString(),
        idParent: className
      })

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

    this.blocks.push({
      type: 'div',
      className: 'second-block',
      idBlock: 'sous-' + idBlock,
      htmlContent: 'sous-' + className,
      niveau: newNiveau.toString(),
      idParent: className
    })

  }

  changeContent() {

      // block.htmlContent = 'a';

      // console.log(block.htmlContent);

      // this.blockService.getBlocks().subscribe(blocks => {
      //   blocks = this.blocks;
      // })

      // console.log(this.blocks);

      // console.log('Old hero is: ', changes.hero.previousValue.name);
      // this.oldHero = changes.hero.previousValue.name;

    this.blockService.updateblocks(this.blocks);

  }

  defineClass(niveau){

    let niveausplit = [];

    niveau.toString().replace('_', '') == niveau ? niveausplit = [niveau] : niveausplit = niveau.toString().split('_');

    switch(niveausplit.length){
      case 1: 
        let classNiveau = 'first-block'
          break;
      case 2:
        let classNiveau = 'second-block'
        break;
      case 3:
        let classNiveau = 'third-block'
        break;
      case 4:
        let classNiveau = 'for-block'
        break;
      case 5:
        let classNiveau = 'five-block'
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
