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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl">
              Let's Build Something Extraordinary
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-enterprise section-light">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-md border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={100} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-md border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={255} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                  <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-md border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={100} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-md border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent" maxLength={200} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full px-4 py-3 rounded-md border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-consulting-accent resize-none" maxLength={1000} />
              </div>
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                {submitting ? "Sending..." : "Send Message"} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-consulting-accent mt-0.5 shrink-0" />
                  <div className="text-sm text-muted-foreground">Hyderabad, Telangana,<br />India</div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-consulting-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">info@soxit.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-consulting-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">+91 XXX XXX XXXX</span>
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
    </Layout>
  );
};

export default ContactPage;
