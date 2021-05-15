import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PartnerService } from '../services/partner.service';
import { first } from 'rxjs/operators';
import { Partner } from '../classes/partner';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css']
})
export class PartnerDashboardComponent implements OnInit {

  partner_id : string;
  partner: Partner[];
  totalLength: any;
  page: number = 1;

  constructor(private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.partner_id  = this.partnerService.getToken();
    this.postId(this.partner_id);
  }

  public postId(partner_id: any){
    this.partnerService.postDataToDB(partner_id)
        .pipe(first())
        .subscribe((data: Partner[]) =>{
          this.partner= data;
        })
  }

}
