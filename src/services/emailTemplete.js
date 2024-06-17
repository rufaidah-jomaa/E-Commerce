
export const emailTemplate = (userName,token,subjectC)=>{
      let content= ``
      if (subjectC=='register'){
        content=` <h1>!${userName},مرحباً</h1>
                  <p>نحن سعداء بانضمامك إلينا. نشكرك على التسجيل معنا.</p>
                  <p>إذا كان لديك أي أسئلة، فلا تتردد في التواصل مع المسؤول 
                  </p>
                  <a href='https://e-commerce-elq4.onrender.com/auth/confirmEmail/${token}' style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;">
                 تأكيد الايميل</a> 
              </div>`
      }
      if(subjectC=='Invoice'){
        content=`<h1>!${userName},مرحباً</h1>
       <p> We are happy that you purchased our product. We hope you like it, here is your invoice  </p>`
      }
    return  ` <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .header {
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px;
                  text-align: center;
                  font-size: 24px;
              }
              .content {
                  margin: 20px 0;
                  text-align: center;
              }
              .content h1 {
                  color: #333333;
              }
              .content p {
                  color: #666666;
                  font-size: 16px;
                  line-height: 1.6;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  color: #999999;
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="container" direction: "rtl">
              <div class="header">
            Welcome to our services
              </div>
              <div class="content">
                 ${content}
              <div class="footer">
                  &copy; ${new Date().getFullYear()} Our Service. All rights reserved.
              </div>
          </div>
      </body>
      </html>`
  }
  //${req.protocol}://${req.headers.host}