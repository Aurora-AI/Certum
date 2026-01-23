"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Animação Modal
  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(modalRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out",
        });
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
        });

        gsap.to(modalRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
        });
      }
    },
    { dependencies: [isOpen] },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Integrar com serviço de email (Sendgrid, Mailgun, Resend, etc)

    // Simular envio
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Escuro */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] cursor-pointer opacity-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md md:max-w-lg opacity-0 scale-80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#050505] border border-white/20 rounded-sm p-8 md:p-12 shadow-2xl relative">
          {/* Fechar Botão */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-2xl font-light"
          >
            ×
          </button>

          {/* Conteúdo */}
          {!submitted ? (
            <>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-2">
                Agendar Reunião
              </h2>
              <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-8">
                Consultoria Estratégica
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-mono tracking-widest uppercase text-slate-400 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu Nome Completo"
                    className="w-full bg-slate-900/30 border border-white/10 px-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-mono tracking-widest uppercase text-slate-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className="w-full bg-slate-900/30 border border-white/10 px-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-mono tracking-widest uppercase text-slate-400 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+55 41 99999-9999"
                    className="w-full bg-slate-900/30 border border-white/10 px-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-mono tracking-widest uppercase text-slate-400 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte-nos sobre seu projeto..."
                    rows={4}
                    className="w-full bg-slate-900/30 border border-white/10 px-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-white text-black font-mono text-sm uppercase tracking-widest font-bold py-4 hover:bg-cyan-400 transition-colors duration-300"
                >
                  Enviar Solicitação
                </button>
              </form>

              <p className="text-xs text-slate-500 text-center mt-6">
                Responderemos em até 24 horas úteis.
              </p>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-serif font-light mb-2 text-white">
                Mensagem Enviada
              </h3>
              <p className="text-slate-400">
                Obrigado! Nossa equipe entrará em contato em breve.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
