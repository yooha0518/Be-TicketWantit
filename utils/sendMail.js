const nodemailer = require('nodemailer');
const mjml2html = require('mjml');
const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: '518hayoung@gmail.com',
		pass: 'ihbnvmfjftvhzook',
	},
});

const userTo = '518hayoung@gmail.com';

const setMailOption = (to, subject, text) => {
	const { html } = mjml2html(
		`<mjml>
    <mj-head>
      <mj-title>Discount Light</mj-title>
      <mj-preview>Pre-header Text</mj-preview>
      <mj-attributes>
        <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
        <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
      </mj-attributes>
      <mj-style inline="inline">
        .body-section {
        -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
        box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
        }
      </mj-style>
      <mj-style inline="inline">
        .text-link {
        color: #5e6ebf
        }
      </mj-style>
      <mj-style inline="inline">
        .footer-link {
        color: #888888
        }
      </mj-style>
  
    </mj-head>
    <mj-body background-color="#f4f4f4" width="600px">
      <mj-section full-width="full-width" background-color="#f4f4f4" padding-bottom="130px">
      </mj-section>
      <mj-section background-color="#0068ff">
        <mj-column width="100%">
         <mj-text color="#ffffff" font-weight="bold" font-size="80px" align="center" padding="80px 0px 80px">
            Ticket Want It!
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
        <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
          <mj-column width="100%">
            <mj-text color="#212b35" font-weight="bold" font-size="40px" align="center" padding="60px">
              ${text}
            </mj-text>
            <mj-text color="#212b35" font-weight="bold" font-size="20px" align="center" padding="0 10px 10px 10px"> </mj-text>
          </mj-column>
          
          
          
          
        </mj-section>
        <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px" padding-top="0">
          
          <mj-column width="50%">
            
          </mj-column>
        </mj-section>
        <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px" padding-top="0">
          <mj-column width="100%">
            <mj-divider border-color="#DFE3E8" border-width="1px" />
          </mj-column>
        </mj-section>
        <mj-section background-color="#ffffff" padding="0 15px 0 15px">
          <mj-column width="100%">
            
          </mj-column>
        </mj-section>
        <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
          <mj-column width="50%">
            
          </mj-column>
        </mj-section>
        <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
          <mj-column width="100%">
            
          </mj-column>
        </mj-section>
      </mj-wrapper>
  
      <mj-wrapper full-width="full-width">
        <mj-section>
          <mj-column width="100%" padding="0">
            
            
            
            <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
              &copy; Ticket Want It's Accountants Inc., All Rights Reserved.
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section padding-top="0">
          <mj-group>
            <mj-column width="100%" padding-right="0">
              <mj-text color="#445566" font-size="11px" align="center" line-height="16px" font-weight="bold">
                
              </mj-text>
            </mj-column>
          </mj-group>
  
        </mj-section>
      </mj-wrapper>
  
    </mj-body>
  </mjml>
  `
	);

	new Promise((resolve, reject) => {
		const message = {
			from: userTo,
			to,
			subject,
			text,
			text,
			html: html,
		};

		transport.sendMail(message, (err, info) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(info);
		});
	});
};

module.exports = setMailOption;
