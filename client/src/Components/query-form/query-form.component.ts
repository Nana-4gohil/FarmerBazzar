import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { PredictService } from '../../Services/predict.service';

@Component({
  selector: 'app-query-form',
  standalone: true,
  imports: [FormsModule, MarkdownModule,CommonModule],
  templateUrl: './query-form.component.html',
  styleUrl: './query-form.component.css'
})
export class QueryFormComponent {
  userQuery: string = '';
  aiResponse: string = '';
  chatHistory: { query: string; response: string }[] = [];
  isLoading: boolean = false;

  constructor(private predictService:PredictService) {}

  ngOnInit() {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      this.chatHistory = JSON.parse(savedHistory);
    }
  }

  onSubmit() {

    const formattedQuery = `
    Please provide a structured response in the following format:
    - Use **bold headings** for main points and format them in a **numbered list** (1, 2, 3...).
    - Subpoints should be inside main points as bullet points.
    - Ensure **two line breaks** between different main points for clarity.
    - Ensure **proper formatting** for readability.

    User Query: ${this.userQuery}
  `;
    if (this.userQuery.trim()) {
      this.isLoading = true;

      this.predictService.getAiResponse(formattedQuery).subscribe(
        (response) => {
          this.aiResponse = this.formatResponse(response.response);
          this.saveToHistory(this.userQuery, this.aiResponse);
          this.userQuery = '';
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching AI response', error);
          this.isLoading = false;
        }
      );
    }
  }

  formatResponse(response: string): string {
    return response
      .replace(/\*\*(.*?)\*\*/g, '<h2 class="text-xl font-bold my-2">$1</h2>') // Convert bold headers
      .replace(/^- (.*)/gm, '<p class="ml-4">\*$1</p>') // Convert bullet points
      .replace(/\*/g, '') // Removes any remaining '*' characters
      .replace(/\n\n/g, '<br>'); // Space between sections
  }
  
  saveToHistory(query: string, response: string) {
    this.chatHistory.push({ query, response });
    localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
  }

  clearHistory() {
    this.chatHistory = [];
    localStorage.removeItem('chatHistory');
  }
}
