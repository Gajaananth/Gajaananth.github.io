import { useEffect, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import GlassPanel from "../ui/GlassPanel";
import MagneticButton from "../ui/MagneticButton";
import RevealOnScroll from "../ui/RevealOnScroll";
import heroWorkstation from "../assets/hero/hero-workstation.webp";

// Falls back to the previously working credentials if no .env is provided,
// so the form keeps working out of the box. To rotate keys, set these in
// a local .env file (see .env.example) instead of editing this file.
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "4iHZXwc5CwaA4rhy7";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_c8o0zus";
const EMAILJS_TEMPLATE_NOTIFY = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY ?? "template_7ax787b";
const EMAILJS_TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY ?? "template_1t69z8h";

type Status = "idle" | "sending" | "sent" | "partial" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  // Initialize once with the object form of the API (the string-only form
  // is deprecated and can silently misbehave with newer SDK versions).
  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_NOTIFY || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS is not configured: missing service, template, or public key.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Send the notification email to me and the auto-reply to the visitor
    // independently. If the auto-reply template fails (wrong template id,
    // rate limit, etc.) we still count the submission as delivered as long
    // as the primary notification went through.
    const results = await Promise.allSettled([
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, form, { publicKey: EMAILJS_PUBLIC_KEY }),
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_AUTOREPLY, form, { publicKey: EMAILJS_PUBLIC_KEY }),
    ]);

    const [notifyResult, autoreplyResult] = results;

    if (notifyResult.status === "fulfilled") {
      form.reset();
      setStatus(autoreplyResult.status === "fulfilled" ? "sent" : "partial");
      if (autoreplyResult.status === "rejected") {
        console.error("EmailJS auto-reply failed:", autoreplyResult.reason);
      }
    } else {
      console.error("EmailJS notification failed:", notifyResult.reason);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <RevealOnScroll>
          <GlassPanel className="contact-panel" tilt={false}>
            <div className="contact-info">
              <span className="heading-tag">Contact</span>
              <h2>Let's build something meaningful.</h2>
              <p>Have a product in mind, or need an AI-assisted build? I'm available for remote work worldwide.</p>
              <div className="contact-detail">
                <span>Email</span>
                <a href="mailto:gajaananthn@gmail.com">gajaananthn@gmail.com</a>
              </div>
              <div className="contact-detail">
                <span>Phone</span>
                <a href="tel:+94789295665">+94 789 295 665</a>
              </div>
              <img
                src={heroWorkstation}
                alt="Gajaananth's RGB-lit desk setup with dual monitors, PC tower and mechanical keyboard"
                className="contact-visual"
                loading="lazy"
              />
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="hidden" name="subject" value="Portfolio Inquiry" />
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" placeholder="Your name" required />
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="Your email" required />
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about your idea..." required />
              <MagneticButton type="submit" variant="primary">
                {status === "sending" ? "Sending..." : status === "sent" || status === "partial" ? "Sent!" : "Send message"}
              </MagneticButton>
              {status === "sent" && <p role="status" style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Message sent, check your inbox.</p>}
              {status === "partial" && <p role="status" style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Message sent. I'll get back to you shortly.</p>}
              {status === "error" && <p role="alert" style={{ color: "var(--accent-magenta)", fontSize: "0.85rem" }}>Something went wrong. Please email me directly at gajaananthn@gmail.com.</p>}
            </form>
          </GlassPanel>
        </RevealOnScroll>
      </div>
    </section>
  );
}
