import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nce-left-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-menu.html',
  styleUrl: './left-menu.scss',
})
export class LeftMenu {
  constructor() {}

  headerNavs: { label: string; link?: string; id?: string; modal?: string }[] = [
    { label: '阅读', link: '/dashboard/read' },
    { label: '单词', link: '/dashboard/words' },
    { label: '笔记', link: '/dashboard/notes' },
    { label: '导读', link: '/dashboard/guide' },
    { label: '打字', link: '/dashboard/type' },
    { label: '引用', link: '/dashboard/refer' },
    { label: '词典', link: '/dashboard/dict' },
  ];
}
