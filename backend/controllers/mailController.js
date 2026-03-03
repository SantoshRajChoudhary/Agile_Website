import { createTransporter } from "../config/mailConfig.js";

/* =========================
   SANITIZE HELPER
========================= */
const sanitize = (str = "") => String(str).replace(/<[^>]*>/g, "");

/* =========================
   CONTACT FORM MAIL
========================= */
export const sendContactMail = async (req, res) => {
  try {
    const transporter = createTransporter();

    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      subject = "Website Contact Message",
      message = "",
    } = req.body || {};

    await transporter.sendMail({
      from: `"Attractify Technologies" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: sanitize(email),
      subject: `New Contact Message - ${sanitize(subject)}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${sanitize(firstName)} ${sanitize(lastName)}</p>
        <p><b>Email:</b> ${sanitize(email)}</p>
        <p><b>Phone:</b> ${sanitize(phone)}</p>
        <p>${sanitize(message)}</p>
      `,
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.log("CONTACT MAIL ERROR:", error);
    res.status(500).json({ success: false });
  }
};


/* =========================
   CAREER FORM MAIL
========================= */
export const sendCareerMail = async (req, res) => {
  try {
    const transporter = createTransporter();

    const {
      name = "",
      email = "",
      phone = "",
      position = "",
      message = "",
    } = req.body || {};

    const attachments = [];

    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
      });
    }

    // 🚀 SEND RESPONSE FIRST (VERY IMPORTANT)
    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });

    // 🚀 SEND EMAILS IN BACKGROUND
    (async () => {
      try {
        /* ======================
           ADMIN MAIL
        ====================== */
        await transporter.sendMail({
          from: `"Attractify Careers" <${process.env.ADMIN_EMAIL}>`,
          to: process.env.ADMIN_EMAIL,
          replyTo: sanitize(email),
          subject: `New Career Application - ${sanitize(position)}`,
          html: `
            <h2>New Career Application</h2>
            <hr/>
            <p><b>Name:</b> ${sanitize(name)}</p>
            <p><b>Email:</b> ${sanitize(email)}</p>
            <p><b>Phone:</b> ${sanitize(phone)}</p>
            <p><b>Position:</b> ${sanitize(position)}</p>
            <p><b>Message:</b></p>
            <p>${sanitize(message)}</p>
          `,
          attachments,
        });

        /* ======================
           AUTO REPLY TO CANDIDATE
        ====================== */
        if (email) {
          await transporter.sendMail({
            from: `"Attractify Technologies" <${process.env.ADMIN_EMAIL}>`,
            to: sanitize(email),
            subject: "Application Received - Attractify Technologies",
            html: `
              <div style="font-family: Arial, sans-serif;">
                <h2>Thank you for applying, ${sanitize(name)}!</h2>
                <p>
                  We have successfully received your application for the position
                  <b>${sanitize(position)}</b>.
                </p>
                <p>
                  Our team will review your profile and get back to you soon.
                </p>
                <br/>
                <p>
                  Regards,<br/>
                  <b>Attractify Technologies Team</b>
                </p>
              </div>
            `,
          });
        }

      } catch (err) {
        console.log("Background mail error:", err);
      }
    })();

  } catch (error) {
    console.log("CAREER MAIL ERROR:", error);
    res.status(500).json({ success: false });
  }
};