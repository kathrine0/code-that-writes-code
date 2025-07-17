import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-document-list',
  imports: [],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentList {}
