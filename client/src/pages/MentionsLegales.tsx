import { useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { brandName } from "@/content/siteContent";

export default function MentionsLegales() {
  useEffect(() => {
    document.title = `Mentions Légales | ${brandName}`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <SiteLayout>
      <div className="bg-slate-50 py-16">
        <div className="container max-w-4xl">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mentions Légales
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Dernière mise à jour : 09/04/2026 (Sources : InseeRNEShal)
            </p>

            <div className="mt-10 space-y-8 text-sm leading-7 text-slate-600">
              <section>
                <h2 className="mb-4 font-display text-xl font-semibold text-slate-900">
                  1. Informations sur l'éditeur
                </h2>
                <ul className="space-y-3 rounded-2xl bg-slate-50 p-6">
                  <li>
                    <strong className="text-slate-900">Forme juridique :</strong> Société par actions simplifiée (SAS)
                  </li>
                  <li>
                    <strong className="text-slate-900">Adresse du siège social :</strong> 8 RUE GIOACCHINO ROSSINI, 95310 SAINT-OUEN-L'AUMONE
                  </li>
                  <li>
                    <strong className="text-slate-900">Dirigeant(s) :</strong> Michel NASCIMENTO
                  </li>
                  <li>
                    <strong className="text-slate-900">Date de création :</strong> 11 mars 2019
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-display text-xl font-semibold text-slate-900">
                  2. Immatriculations et Autorisations
                </h2>
                <ul className="space-y-3 rounded-2xl bg-slate-50 p-6">
                  <li>
                    <strong className="text-slate-900">SIREN :</strong> 848 956 256
                  </li>
                  <li>
                    <strong className="text-slate-900">SIRET :</strong> 848 956 256 00020
                  </li>
                  <li>
                    <strong className="text-slate-900">Numéro de TVA intracommunautaire :</strong> FR17848956256
                  </li>
                  <li>
                    <strong className="text-slate-900">Activité (NAF / APE) :</strong> Activités des agents et courtiers d'assurances - 6622Z
                  </li>
                  <li>
                    <strong className="text-slate-900">Immatriculation ORIAS :</strong> 19002619
                    <br />
                    <em>(Registre unique des intermédiaires en assurance, banque et finance, consultable sur orias.fr)</em>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-display text-xl font-semibold text-slate-900">
                  3. Hébergement du site
                </h2>
                <p>
                  Ce site est hébergé conformément aux réglementations applicables sur le territoire français. Pour
                  toute question liée à l'hébergement, veuillez formuler votre demande via la rubrique Contact.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-display text-xl font-semibold text-slate-900">
                  4. Confidentialité et Traitement des données
                </h2>
                <p>
                  Toutes les informations recueillies via nos formulaires ont pour finalité le traitement et la 
                  comparaison des offres d'assurances par {brandName}. Elles ne sont jamais revendues à 
                  des sociétés tierces non partenaires du cabinet. Conformément à la réglementation RGPD, vous 
                  disposez d'un droit d'accès, de rectification et d'effacement de vos données sur simple 
                  demande au cabinet.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
