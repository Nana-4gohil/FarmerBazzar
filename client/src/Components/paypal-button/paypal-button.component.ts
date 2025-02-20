// import { AfterViewInit, Component, Input } from '@angular/core';
// import { loadScript } from '@paypal/paypal-js';
// @Component({
//   selector: 'app-paypal-button',
//   standalone: true,
//   imports: [],
//   templateUrl: './paypal-button.component.html',
//   styleUrl: './paypal-button.component.css'
// })
// export class PaypalButtonComponent implements AfterViewInit {
  
//   @Input() amount: string = '10.00'; // Amount to be paid
//   @Input() currency: string = 'USD'; // Currency type

//   async ngAfterViewInit() {
//     const paypal = await loadScript({ "client-id": "YOUR_PAYPAL_CLIENT_ID" });

//     if (!paypal) {
//       console.error("PayPal SDK failed to load.");
//       return;
//     }

//     paypal.Buttons({
//       createOrder: (data: any, actions: any) => {
//         return actions.order.create({
//           purchase_units: [{
//             amount: { value: this.amount, currency_code: this.currency }
//           }]
//         });
//       },
//       onApprove: async (data: any, actions: any) => {
//         const order = await actions.order.capture();
//         console.log("Payment Successful:", order);
//         alert("Payment Successful!");
//       },
//       onError: (err: any) => {
//         console.error("PayPal Error:", err);
//       }
//     }).render("#paypal-button-container");
//   }
// }
