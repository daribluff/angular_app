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
  blocks2:Block;

  @Output() blockEvent = new EventEmitter();

    @Input() blocks;
    @Input() blocks2;

  constructor(
    public blockService:BlockService
  ) {
      this.constructBlock();
   }

   constructBlock(){

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
               blockobjArray['insertHide'] = true;

               blockobjArr.push(blockobjArray);

           });

           var mapped = blockobjArr.map(function(e, i) {
               return { index: i, value: e.niveau };
           });

           mapped.sort(function(a, b) {
               if (a.value > b.value) {
                   return 1;
               }
               if (a.value < b.value) {
                   return -1;
               }
               return 0;
           });

           var blockobjArr = mapped.map(function(e){
               return blockobjArr[e.index];
           });

           let prevniveau = 1;

           let blockobjArr2 = [];

           blockobjArr.map(block => {

               let prevniveau = block.niveau.substr(0, parseInt(block.niveau.length)- 2);

               if(blockobjArr2[prevniveau]){
                   blockobjArr2[prevniveau].push(block);
               }

              let blocktemp = [];

               blocktemp['id'] = block.id;
               blocktemp['block'] = block;
               blocktemp['insertHide'] = true;

                if(!blockobjArr2[block.niveau]){
                    blockobjArr2[block.niveau] = [];
                }

               blockobjArr2[block.niveau].push(blocktemp);

           });

           console.log('a');

           this.blocks = blockobjArr;
           this.blocks2 = blockobjArr2;

       })
   }

  ngOnInit() {
    // this.blockService.currentBlock.subscribe(block => this.blocks = block);
  }

  clickbody(blocks){
      if(event.target.className == 'html-block') {
          blocks.forEach(
              block => {
                  block.insertHide = true;
              }
          )
      }
    }

   addDiv(block){

       block.insertHide = !block.insertHide;

      this.blocks.forEach(
           bloc => {
               if(block != bloc){
                   bloc.insertHide = true;
               }
            }
       )


  }

  removeDiv(id) {
      this.blockService.removeBlock(id);
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
          let j = 1;
          while(document.getElementById(newNiveau + '_' + j) != null && j < 100){
              let k = j+1;
              document.getElementById(newNiveau + '_' + j).setAttribute("id", newNiveau + '_' + k);
              j++;
          }
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

    // this.blocks.push(newBlock);

    this.addBlock(newBlock);

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

    // this.blocks.push(newBlock);

  }

  addBlock(newBlock) {

    this.constructBlock();
    this.blockService.updateblocks(newBlock);

  }

  changeContent(id, block){

      this.blockService.updateContent(id, block);

  }

  defineClass(niveau){

    // let niveausplit = [];
    //
    // let classNiveau = '';
    //
    // niveau.toString().replace('_', '') == niveau ? niveausplit = [niveau] : niveausplit = niveau.toString().split('_');
    //
    // switch(niveausplit.length){
    //   case 1:
    //     classNiveau = 'first-block'
    //     break;
    //   case 2:
    //     classNiveau = 'second-block'
    //     break;
    //   case 3:
    //     classNiveau = 'third-block'
    //     break;
    //   case 4:
    //     classNiveau = 'for-block'
    //     break;
    //   case 5:
    //     classNiveau = 'five-block'
    //     break;
    // }

    return 'second-block';

  }

  bindCss(css) {

    var cssTab = [];

    let css2 = css.replace('"', '');

    cssTab = css2.split(',');

    $('.css-area').val(cssTab);

  }

}
