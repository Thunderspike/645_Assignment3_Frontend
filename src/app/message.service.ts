import { Injectable } from '@angular/core';
import { MessageService as MS } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(private messageService: MS) {}

  add(message: any) {
    this.messageService.add({ ...message });
  }

  clear() {
    this.messageService.clear();
  }
}
