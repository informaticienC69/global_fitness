import dotenv from 'dotenv';
import { verifyMailer, sendOwnerNotification } from './mailer.js';

dotenv.config();

console.log('Testing mailer connection...');
console.log('User:', process.env.MAIL_USER);
console.log('Pass:', process.env.MAIL_PASS ? '********' : 'NOT SET');

async function test() {
  try {
    await verifyMailer();
    console.log('Sending test email...');
    await sendOwnerNotification({
      id: 'TEST-123',
      customer: { name: 'Test User', email: 'test@example.com', phone: '12345678' },
      items: [{ name: 'Test Item', qty: 1, price: 100 }],
      total: 100
    });
    console.log('Test email sent successfully!');
  } catch (err) {
    console.error('Test email failed:', err);
  }
}

test();
