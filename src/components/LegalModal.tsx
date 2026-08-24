import React, { useState } from "react";
import { X, Shield, FileText, Scale, Lock, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";

export type LegalTab = "cgv" | "privacy" | "mentions";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = "cgv",
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Logo size="sm" showBadge={false} variant="light" />
            <div className="h-4 w-[1px] bg-slate-700" />
            <h2 className="font-semibold text-sm sm:text-base text-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              Centre Légal & Conformité RGPD
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("cgv")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === "cgv"
                ? "bg-white text-slate-900 border-emerald-600 shadow-2xs"
                : "text-slate-500 hover:text-slate-800 border-transparent"
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            Conditions Générales (CGV / CGU)
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === "privacy"
                ? "bg-white text-slate-900 border-emerald-600 shadow-2xs"
                : "text-slate-500 hover:text-slate-800 border-transparent"
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-600" />
            Confidentialité & RGPD
          </button>
          <button
            onClick={() => setActiveTab("mentions")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === "mentions"
                ? "bg-white text-slate-900 border-emerald-600 shadow-2xs"
                : "text-slate-500 hover:text-slate-800 border-transparent"
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-600" />
            Mentions Légales
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
          {activeTab === "cgv" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  Conditions Générales de Vente et d'Utilisation (CGV / CGU)
                </h3>
                <p className="text-slate-500 text-xs">Dernière mise à jour : 24 Août 2026</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900">
                  <strong>Garantie Sérénité :</strong> Tous les abonnements payants bénéficient d'un droit de rétractation de 14 jours et sont sans engagement de durée, résiliables en 1 clic depuis votre espace.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">1. Objet du Service</h4>
                <p>
                  JobMatch fournit une plateforme SaaS de génération et de personnalisation de documents de recrutement (curriculum vitae, lettres de motivation, diagnostics de correspondance ATS).
                </p>

                <h4 className="font-bold text-slate-900">2. Formules d'Abonnement et Tarifs</h4>
                <p>
                  - <strong>Starter (0€)</strong> : 1 dossier de candidature complet offert pour tester la solution.<br />
                  - <strong>Pro (19€ TTC / mois)</strong> : Générations et régénérations illimitées, téléchargements PDF HD, scoring ATS complet.<br />
                  - <strong>Executive (39€ TTC / mois)</strong> : Pack multi-profils, modules avancés et support prioritaire 7j/7.
                </p>

                <h4 className="font-bold text-slate-900">3. Paiement Sécurisé & Facturation</h4>
                <p>
                  Les transactions sont traitées et chiffrées via la passerelle de paiement internationale <strong>Stripe Inc.</strong>. Aucune coordonnée bancaire n'est stockée sur nos serveurs.
                </p>

                <h4 className="font-bold text-slate-900">4. Résiliation & Remboursement</h4>
                <p>
                  L'utilisateur peut interrompre son renouvellement automatique à tout moment via son portail client Stripe. Conformément au Code de la consommation, vous disposez d'un délai légal de 14 jours pour demander un remboursement intégral.
                </p>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  Politique de Confidentialité & Conformité RGPD (UE 2016/679)
                </h3>
                <p className="text-slate-500 text-xs">Protection et traitement responsable de vos données professionnelles</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">🔒 Chiffrement End-to-End</h5>
                  <p className="text-xs text-slate-500">Toutes les données de CV et informations personnelles sont chiffrées en transit (SSL/TLS 256-bit) et au repos sur Google Cloud.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">🚫 Aucune Revente</h5>
                  <p className="text-xs text-slate-500">Vos CVs et coordonnées ne sont jamais vendus, loués ou partagés à des tiers ni utilisés pour de la publicité ciblée.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">1. Données Collectées</h4>
                <p>
                  Nous collectons uniquement les informations strictement nécessaires à la génération de vos candidatures : nom, email, parcours professionnel, compétences et détails des offres ciblées.
                </p>

                <h4 className="font-bold text-slate-900">2. Vos Droits (Droit d'accès, rectification et effacement)</h4>
                <p>
                  Conformément au RGPD, vous disposez à tout moment d'un droit d'accès, de modification et de suppression complète de l'ensemble de vos candidatures et de votre compte en un simple clic.
                </p>

                <h4 className="font-bold text-slate-900">3. Contact Délégué à la Protection des Données (DPO)</h4>
                <p>
                  Pour toute demande relative à vos données personnelles : <strong>dpo@jobmatch.pro</strong>.
                </p>
              </div>
            </div>
          )}

          {activeTab === "mentions" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  Mentions Légales
                </h3>
                <p className="text-slate-500 text-xs">Informations relatives à l'éditeur et à l'hébergement</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">1. Éditeur de la Plateforme</h4>
                <p>
                  <strong>Société éditrice :</strong> JobMatch SAS<br />
                  <strong>Siège social :</strong> 10 Rue de la Paix, 75002 Paris, France<br />
                  <strong>RCS :</strong> Paris B 912 345 678<br />
                  <strong>Email :</strong> contact@jobmatch.pro
                </p>

                <h4 className="font-bold text-slate-900">2. Hébergement Sécurisé</h4>
                <p>
                  <strong>Hébergeur :</strong> Google Cloud Platform (Région Europe / Belgique)<br />
                  Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande.
                </p>

                <h4 className="font-bold text-slate-900">3. Propriété Intellectuelle</h4>
                <p>
                  La marque JobMatch, les algorithmes de matching et l'ensemble des éléments graphiques sont protégés au titre des droits de propriété intellectuelle.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
