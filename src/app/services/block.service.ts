import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Block } from '../models/Block';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BlockService {
  
  blocks: Observable<any[]>;

  private blockSource = new BehaviorSubject<object>(this.blocks);
  currentBlock = this.blockSource.asObservable();

  constructor(
    db: AngularFirestore
  ) {
    this.blocks = db.collection('blocks').valueChanges();
   }

   getBlocks(){
     return this.blocks;
   }

   updateblocks(block){
     this.blockSource.next(block);
     return this.blocks = block;
   }

}
