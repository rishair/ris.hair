import { Resend } from 'resend';

const resend = new Resend('re_bSQ6UGNt_Di3bXy349wU6jV3kCd7oWx2H');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'rishi.ishairzay@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
