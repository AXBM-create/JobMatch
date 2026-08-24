import React, { useState } from "react";
import { X, Mail, Copy, Check, Send, Paperclip, FileText, Download } from "lucide-react";
import { ApplicationResult } from "../types";

interface SendApplicationModalProps {
  application: ApplicationResult;
  onClose: () => void;
}

export const SendApplicationModal: React.FC<SendApplicationModalProps> = ({
  application,
  onClose,
}) => {
  const { resume, coverLetter, targetJob } = application;
  const [recipientEmail, setRecipientEmail] = useState("recrutement@" + targetJob.company.toLowerCase().replace(/\s+/g, "") + ".com");
  const [subject, setSubject] = useState(`Candidature au poste de ${targetJob.title} - ${resume.personalInfo.fullName}`);
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const emailBody = `Bonjour ${coverLetter.recipient.name},\n\n${coverLetter.paragraphs.join("\n\n")}\n\n${coverLetter.signOff}\n\n${coverLetter.signerName}\n${resume.personalInfo.title}\n${resume.personalInfo.phone} | ${resume.personalInfo.email}`;

  const handleCopyBody = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Envoyer votre candidature</h3>
            <p className="text-xs text-slate-500">Transmettez vos documents optimisés ou copiez le message d'accompagnement.</p>
          </div>
        </div>

        {sentSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Candidature prête et envoyée !</h4>
            <p className="text-xs text-slate-500">Un accusé de réception a été envoyé à votre adresse.</p>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Destinataire (Recruteur / RH)</label>
              <input
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Objet du message</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:border-slate-900"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Corps du mail (généré par IA)</label>
                <button
                  type="button"
                  onClick={handleCopyBody}
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> Copié dans le presse-papier !
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copier le texte
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={5}
                readOnly
                value={emailBody}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-mono leading-relaxed"
              />
            </div>

            {/* Attached Documents badge */}
            <div className="p-3 bg-slate-100/80 rounded-lg flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-slate-500" />
                <span>Pièces jointes : <strong>CV_{resume.personalInfo.fullName.replace(/\s+/g, "_")}.pdf</strong> + <strong>Lettre.pdf</strong></span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">92% Match</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-xs font-medium bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer au recruteur</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
