// app/api/contact/route.ts - FÜR CUSTOM DOMAIN
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const escapeHtml = (value: string) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message } = await request.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
        { status: 400 }
      );
    }

    const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
      console.error(
        'Kontaktformular: SMTP nicht konfiguriert. Fehlende Env-Variablen:',
        ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'].filter((key) => !process.env[key]).join(', ')
      );
      return NextResponse.json(
        { error: 'Das Kontaktformular ist derzeit nicht verfügbar. Bitte schreiben Sie uns direkt an info@flyingarms.de.' },
        { status: 500 }
      );
    }

    // SMTP für Custom Domain (Port 465 = SSL, 587 = STARTTLS)
    const port = Number(process.env.SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, // z.B. 'mail.flyingarms.de' oder 'smtp.strato.de'
      port,
      secure: port === 465,
      auth: {
        user: SMTP_USER, // info@flyingarms.de
        pass: SMTP_PASSWORD, // Password für info@flyingarms.de
      },
    });

    const recipient = process.env.CONTACT_EMAIL_TO || 'info@flyingarms.de';

    await transporter.sendMail({
      from: `"Flying Arms Website" <${SMTP_USER}>`,
      to: recipient, // An sich selbst
      replyTo: email,
      subject: `🚁 Neue Anfrage: ${service} von ${name}`,
      html: `
        <h2>Neue Flying Arms Anfrage</h2>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Nachricht:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Senden der Nachricht.' },
      { status: 500 }
    );
  }
}
