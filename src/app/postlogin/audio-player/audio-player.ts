import { Component, effect, input, InputSignal, OnDestroy, signal } from '@angular/core';
import { AudioService } from '../../service/audio.service';

@Component({
  selector: 'app-audio-player',
  imports: [],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss',
})
export class AudioPlayer implements OnDestroy {
  //'load' | 'play' | 'pause' | 'stop' | 'seek'
  action: InputSignal<string> = input('load');
  url = input('');
  playBtnIcon = signal('bi-play-fill');
  selectedOption: string = 'normal';
  private description;
  constructor(private audio: AudioService) {
    effect(() => {
      const url = this.url();
      this.stop();
      if (url) {
        this.audio.url(url);
      }
    });
    effect(() => {
      const action = this.action();
      switch (action) {
        case 'play':
          this.play();
          break;
        case 'pause':
          this.pause();
          break;
        case 'stop':
          this.stop();
          break;
        default:
          break;
      }
    });
    this.description = this.audio.audioStream().subscribe((event)=>{
      if(event.type == 'ended' ){
        this.isPlaying = !this.isPlaying;
        this.playBtnIcon.set('bi-play-fill');
      }
    })
  }
  ngOnDestroy(): void {
    this.description.unsubscribe();
  }
  //bi-play-fill
  //bi-pause-fill
  //bi-stop-fill
  private isPlaying = false;
  playBtnClicked(event: Event) {
    this.isPlaying = !this.isPlaying;
    this.isPlaying ? this.play() : this.pause();
    event.preventDefault();
  }
  private play() {
    this.audio.play();
    this.playBtnIcon.set('bi-pause-fill');
  }
  private pause() {
    this.audio.pause();
    this.playBtnIcon.set('bi-play-fill');
  }
  private stop() {
    this.isPlaying = false;
    this.audio.stop();
    this.playBtnIcon.set('bi-play-fill');
  }

  changeRepeat(event: any) {
    console.log('change repeat ', event.target.value);
    this.selectedOption = event.target.value;
  }
  print(event: Event) {
    const timeStamp = this.audio.getCurrentTime();
    if (this.timeStamps.length == 0) {
      this.timeStamps.push({ start: 0, end: timeStamp });
    } else {
      const pre = this.timeStamps[this.timeStamps.length - 1];
      this.timeStamps.push({ start: pre.end, end: timeStamp });
    }
    event.preventDefault();
  }

  remove(item: { start: number; end: number }, event: Event) {
    const index = this.timeStamps.indexOf(item);
    this.timeStamps.splice(index, 1);
    event.preventDefault()
  }
  timeStamps: { start: number; end: number }[] = [];
}
