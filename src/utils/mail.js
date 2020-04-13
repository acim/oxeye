"use strict";

import mailgun from "mailgun-js";

export class Mailgun {
  constructor() {
    this.mailgun = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      host: "api.eu.mailgun.net",
    });
  }

  send({ from, to, subject, text }) {
    this.mailgun.messages().send({ from, to, subject, text });
  }
}
