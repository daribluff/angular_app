import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Block } from '../models/Block';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BlockService {
  
  block: any[];

  private dtb;

  constructor(
    db: AngularFirestore
  ) {
    this.dtb = db;
   }

   getBlocks(): Observable<Block[]>{
    //  console.log(this.dtb.collection('blocks').valueChanges());
     return this.dtb.collection('blocks').snapshotChanges();
   }

   changeBlock(block){
    //  console.log(this.currentBlock);
    //  this.blockSource.next(block);
   }

   updateblocks(block){
      // this.blockSource.next(block);
      this.dtb.collection('blocks').add(block);
    //  return this.blocks = block;
   }


    removeBlock(id){
        this.dtb.collection('blocks').doc(id).delete();
    }

   updateContent(id, upBlock){
       this.dtb.collection('blocks').doc(id).set(upBlock);
   }

}
