import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AssetDetail } from 'src/app/data-access/models/asset.model';

@Component({
  selector: 'app-asset-detail-viewer',
  templateUrl: './asset-detail-viewer.component.html',
  styleUrls: ['./asset-detail-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetDetailViewerComponent implements OnInit {

  @Input() asset: AssetDetail;
  
  constructor() { }

  ngOnInit(): void {
  }

}
