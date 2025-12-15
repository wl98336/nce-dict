import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioObj = new Audio();
  private stream : Observable<any>;
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  constructor(){
    this.stream = new Observable(observer => {
      const handler = (event: Event) => {
        observer.next(event);
      };
      this.addEvents(this.audioObj, this.audioEvents, handler);
      //unsubscribe
      return () => {
        // Stop Playing
        this.stop();
        console.log("streamObservable return Stop Playing");
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
      };
    })
  }

  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event:any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event:any) => {
      obj.removeEventListener(event, handler);
    });
  }

  audioStream() {
    return this.stream;
  }

  url(url:string){
    this.audioObj.src = url;
    this.audioObj.load();
  }
  
  play() {
    console.log("Audio Service play", this.audioObj.readyState);
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.audioObj.pause();
    this.seekTo(0);
  }
  seekTo(seconds:number) {
    this.audioObj.currentTime = seconds;
  }
  repeat(start: number, end: number){
    this.audioObj.currentTime = start;
  }

  getCurrentTime(): number{
    return this.audioObj.currentTime;
  }
}
