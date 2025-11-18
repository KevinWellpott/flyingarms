// app/api/contact/route.ts - FÜR CUSTOM DOMAIN
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message } = await request.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
        { status: 400 }
      );
    }

    // SMTP für Custom Domain
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // z.B. 'mail.flyingarms.de' oder 'smtp.strato.de'
      port: 587, // oder 465 für SSL
      secure: false, // true für Port 465, false für andere
      auth: {
        user: process.env.SMTP_USER, // info@flyingarms.de
        pass: process.env.SMTP_PASSWORD, // Password für info@flyingarms.de
      },
    });

    await transporter.sendMail({
      from: 'info@flyingarms.de',
      to: 'info@flyingarms.de', // An sich selbst
      subject: `🚁 Neue Anfrage: ${service} von ${name}`,
      html: `
        <h2>Neue Flying Arms Anfrage</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
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