import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message sent successfully!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", company: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact SOXIT | Schedule a Consultation</title>
        <meta name="description" content="Get in touch with SOXIT Consulting Services. Schedule a strategic consultation for enterprise technology, training, or media services." />
      </Helmet>

      <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-4 block">Contact</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
              Let's Build Something Extraordinary
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-enterprise section-light">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={100} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={255} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                  <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={100} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={200} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent resize-none" maxLength={1000} />
              </div>
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-consulting-accent text-white font-semibold text-sm hover:bg-consulting-accent-hover transition-colors disabled:opacity-50 shadow-sm">
                {submitting ? "Sending..." : "Send Message"} <Send size={16} />
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-consulting-accent mt-0.5 shrink-0" />
                  <div className="text-sm text-muted-foreground">No: 23-3B/234 & 252,<br />Vasavi Pharma Market Complex,<br />Gollapudi, Vijayawada,<br />Andhra Pradesh 521225</div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-consulting-accent shrink-0" />
                  <a href="mailto:consult@soxit.in" className="text-sm text-muted-foreground hover:text-consulting-accent transition-colors">consult@soxit.in</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-consulting-accent shrink-0" />
                  <a href="tel:+919603544647" className="text-sm text-muted-foreground hover:text-consulting-accent transition-colors">+91 96035 44647</a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Office Hours</h3>
              <p className="text-sm text-muted-foreground">Monday – Friday: 9:00 AM – 6:00 PM IST<br />Saturday – Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-enterprise section-light pt-0">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Location</h2>
          <div className="rounded-lg overflow-hidden border border-border shadow-sm aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.2!2d80.6194!3d16.5062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb4a0bba0b1f%3A0x7a9b8d8efadc5e6a!2sVasavi%20Pharma%20Market%20Complex%2C%20Gollapudi%2C%20Vijayawada%2C%20Andhra%20Pradesh%20521225!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SOXIT Office Location - Gollapudi, Vijayawada"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
