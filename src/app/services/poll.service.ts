import { Poll } from './../classes/poll';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PollService {
  private ttCollection: AngularFirestoreCollection<Poll>;
  private cbCollection: AngularFirestoreCollection<Poll>;
  private mhCollection: AngularFirestoreCollection<Poll>;
  constructor(private afs: AngularFirestore) {

  }

  getTT() {
      return this.afs.collection('than_trong').valueChanges();
  }

  getCB() {
    return this.afs.collection('can_bang').valueChanges();
  }
  getMH() {
    return this.afs.collection('mao_hiem').valueChanges();
  }

  getTT_HN() {
    return this.afs.collection('than_trong_HN').valueChanges();
}

  getCB_HN() {
  return this.afs.collection('can_bang_HN').valueChanges();
}
  getMH_HN() {
  return this.afs.collection('mao_hiem_HN').valueChanges();
}
}
