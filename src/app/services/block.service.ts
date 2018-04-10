import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Block } from '../models/Block';

@Injectable()
export class BlockService {
  blocks: Observable<any[]>;

  constructor(
    db: AngularFirestore
  ) {
    this.blocks = db.collection('blocks').valueChanges();
   }

   getBlocks(){
     return this.blocks;
   }

   updateblocks(block){
     this.blocks = block;
   }

}
