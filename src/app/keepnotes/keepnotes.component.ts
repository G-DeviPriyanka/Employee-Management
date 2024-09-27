// keepnotes.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-keepnotes',
  templateUrl: './keepnotes.component.html',
  styleUrls: ['./keepnotes.component.css']
})
export class KeepnotesComponent implements OnInit {

  message = '';
  messages: string[] = [];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chat.sendMessage(this.message);
      this.message = '';
    }
  }

  downloadPDF() {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Chat Messages', 10, 10);

    // Add messages
    doc.setFontSize(12);
    this.messages.forEach((msg, index) => {
      doc.text(`${index + 1}. ${msg}`, 10, 20 + (index * 10));
    });

    // Save the PDF
    doc.save('Notes.pdf');
  }
}
