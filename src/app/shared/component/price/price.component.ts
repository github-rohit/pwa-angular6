import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  plans = [];

  constructor() { }

  ngOnInit() {
    this.plans = [
      {
        'checked': true,
        'programId': 86223,
        'salesPitch': 'BEST VALUE – SAVE 50%',
        'currency': '$',
        'countryId': 1000,
        'label': '3-Month',
        'price': '3.07',
        'period': 'wk*',
        'specialOffer': 'Save 50% today!',
        'promoContent': {
          'value': '<p>\r\n\t<strong>Offer Terms:</strong>&nbsp;Save 50% when you purchase select subscription plans by 4/7/18&nbsp;(11:59pm EST). Plans auto-renew at the end of the applicable plan period,&nbsp;at the standard monthly rate, and you will be charged monthly thereafter until you cancel. Offer available to new and rejoining members only.&nbsp;\r\n</p>',
          'format': 'filtered_html',
          'safe_value': '<p>\n\t<strong>Offer Terms:</strong> Save 50% when you purchase select subscription plans by 4/7/18 (11:59pm EST). Plans auto-renew at the end of the applicable plan period, at the standard monthly rate, and you will be charged monthly thereafter until you cancel. Offer available to new and rejoining members only. \n</p>\n'
        },
        'disclaimer': {
          'value': '<p>\r\n\t<strong>NO ANNUAL CONTRACT. EASY TO CANCEL.</strong>\r\n</p><p>\r\n\t&nbsp;\r\n</p><p>\r\n\t<strong>PLEASE NOTE:</strong>&nbsp;Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY.&nbsp;\r\n</p><p>\r\n\t&nbsp;\r\n</p><p>\r\n\t*Prepayment of total plan cost required. Avg. weekly cost is based on avg. length month, assumes completion of full term,&nbsp;includes Starter Fee,&nbsp;and will be $4.61 after the initial plan period.\r\n</p>',
          'format': 'filtered_html',
          'safe_value': '<p>\n\t<strong>NO ANNUAL CONTRACT. EASY TO CANCEL.</strong>\n</p>\n<p>\n\t \n</p>\n<p>\n\t<strong>PLEASE NOTE:</strong> Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY. \n</p>\n<p>\n\t \n</p>\n<p>\n\t*Prepayment of total plan cost required. Avg. weekly cost is based on avg. length month, assumes completion of full term, includes Starter Fee, and will be $4.61 after the initial plan period.\n</p>\n'
        },
        'planDetails': [
          {
            'priceDescription': '3 Months',
            'price': '59.85'
          },
          {
            'priceDescription': 'Starter Fee',
            'price': '20.00'
          },
          {
            'priceDescription': '50% Discount',
            'price': '-39.93'
          }
        ],
        'isAddOn': false,
        'runDecisionManager': false,
        'planTotal': {
          'priceDescription': 'Your Total Today',
          'price': '39.92'
        },
        'cspDuration': 3,
        'isSwitchable': true,
        'memberCycleCount': 1,
        'program_receipt_email_name': 'SignupOnlineFemale',
        'program_receipt_email_name_dd': 'SignupOnlineFemale',
        'program_duration_count': '12.99',
        'is_shipping_required': null,
        'paymentRequiredFlag': true,
        'franOwner': {
          'id': 37,
          'name': 'Weight Watchers North America, Inc',
          'phoneNumber': '',
          'franchiseUrl': '',
          'pricingUrl': '',
          'contactName': '',
          'pageID': ''
        },
        'cspName': '3 Months',
        'newProgram': {
          'id': 76257,
          'billingTerm': {
            'days': 0,
            'weeks': 0,
            'months': 1
          },
          'netSubtotalAmount': 19.95,
          'price': 19.95,
          'rbCyclesCount': {
            'days': 0,
            'weeks': 0,
            'months': 0
          },
          'newProgram': {
            'id': 76257,
            'billingTerm': {
              'days': 0,
              'weeks': 0,
              'months': 1
            },
            'price': 19.95
          }
        },
        'program_recur_bill': {
          'value': '<p>\r\n\t<strong>PLEASE NOTE:&nbsp;</strong>Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY.\r\n</p>',
          'format': 'filtered_html',
          'safe_value': '<p>\n\t<strong>PLEASE NOTE: </strong>Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY.\n</p>\n'
        },
        'planCommitmentTerm': 0,
        'preSelected': true
      },
      {
        'programId': 86224,
        'salesPitch': null,
        'currency': '$',
        'countryId': 1000,
        'label': '1-Month',
        'price': '4.61',
        'period': 'wk*',
        'specialOffer': 'Save 50% today!',
        'promoContent': {
          'value': '<p>\r\n\t<strong>Offer Terms:&nbsp;</strong>Save 50% when you purchase select subscription plans by 4/7/18&nbsp;(11:59pm EST). Plans auto-renew at the end of the applicable plan period,&nbsp;at the standard monthly rate, and you will be charged monthly thereafter until you cancel. Offer available to new and rejoining members only.&nbsp;\r\n</p>',
          'format': 'filtered_html',
          'safe_value': '<p>\n\t<strong>Offer Terms: </strong>Save 50% when you purchase select subscription plans by 4/7/18 (11:59pm EST). Plans auto-renew at the end of the applicable plan period, at the standard monthly rate, and you will be charged monthly thereafter until you cancel. Offer available to new and rejoining members only. \n</p>\n'
        },
        'disclaimer': {
          'value': '<p>\r\n\t<strong>NO ANNUAL CONTRACT. EASY TO CANCEL.</strong>\r\n</p><p>\r\n\t&nbsp;\r\n</p><p>\r\n\t<strong>PLEASE NOTE:</strong>&nbsp;Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY.&nbsp;\r\n</p><p>\r\n\t&nbsp;\r\n</p><p>\r\n\t*Prepayment of total plan cost required. Avg. weekly cost is based on avg. length month, assumes completion of full term,&nbsp;includes Starter Fee,&nbsp;and will be $4.61 after the initial plan period.\r\n</p>',
          'format': 'filtered_html',
          'safe_value': '<p>\n\t<strong>NO ANNUAL CONTRACT. EASY TO CANCEL.</strong>\n</p>\n<p>\n\t \n</p>\n<p>\n\t<strong>PLEASE NOTE:</strong> Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY. \n</p>\n<p>\n\t \n</p>\n<p>\n\t*Prepayment of total plan cost required. Avg. weekly cost is based on avg. length month, assumes completion of full term, includes Starter Fee, and will be $4.61 after the initial plan period.\n</p>\n'
        },
        'planDetails': [
          {
            'priceDescription': 'Standard Monthly Plan',
            'price': '19.95'
          },
          {
            'priceDescription': 'Starter Fee',
            'price': '20.00'
          },
          {
            'priceDescription': '50% Discount',
            'price': '-19.98'
          }
        ],
        'isAddOn': false,
        'runDecisionManager': false,
        'planTotal': {
          'priceDescription': 'Your Total Today',
          'price': '19.97'
        },
        'cspDuration': 1,
        'isSwitchable': true,
        'memberCycleCount': 1,
        'program_receipt_email_name': 'SignupOnlineFemale',
        'program_receipt_email_name_dd': 'SignupOnlineFemale',
        'program_duration_count': '4.33',
        'is_shipping_required': null,
        'paymentRequiredFlag': true,
        'franOwner': {
          'id': 37,
          'name': 'Weight Watchers North America, Inc',
          'phoneNumber': '',
          'franchiseUrl': '',
          'pricingUrl': '',
          'contactName': '',
          'pageID': ''
        },
        'cspName': 'Standard Monthly Plan',
        'newProgram': {
          'id': 76257,
          'billingTerm': {
            'days': 0,
            'weeks': 0,
            'months': 1
          },
          'netSubtotalAmount': 19.95,
          'price': 19.95,
          'rbCyclesCount': {
            'days': 0,
            'weeks': 0,
            'months': 0
          },
          'newProgram': {
            'id': 76257,
            'billingTerm': {
              'days': 0,
              'weeks': 0,
              'months': 1
            },
            'price': 19.95
          }
        },
        'program_recur_bill': {
          'value': '<p>\r\n\t<strong>PLEASE NOTE:&nbsp;</strong>Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY.\r\n</p>',
          'format': 'filtered_html',
          'safe_value': '<p>\n\t<strong>PLEASE NOTE: </strong>Plans automatically renew at the end of the applicable plan period, and you will be charged at the standard monthly fee (currently $19.95) until you cancel. Tax additional in NY.\n</p>\n'
        },
        'planCommitmentTerm': 0,
        'preSelected': false
      }
    ];
  }

}
