class Env {
  static SMTP_HOST: string = process.env.SMTP_HOST!;
  static SMTP_PORT: string = process.env.SMTP_PORT!;
  static SMTP_USER: string = process.env.SMTP_USER!;
  static SMTP_PASSWORD: string = process.env.SMTP_PASSWORD!;
  static SMTP_SECURE: string = process.env.SMTP_SECURE!;
  static SMTP_FROM: string = process.env.SMTP_FROM!;
  static SMTP_KEY: string = process.env.SMTP_KEY!;
  static APP_URL: string = process.env.APP_URL!;
}

export default Env;
