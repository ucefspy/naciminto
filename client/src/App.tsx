import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import MarketingPage from "./pages/MarketingPage";
import MentionsLegales from "./pages/MentionsLegales";
import AdsLandingPage from "./pages/AdsLandingPage";
import AdsCallOnlyPage from "./pages/AdsCallOnlyPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assurance-auto">{() => <MarketingPage slug="auto" />}</Route>
      <Route path="/mutuelle-sante">{() => <MarketingPage slug="sante" />}</Route>
      <Route path="/prevoyance">{() => <MarketingPage slug="prevoyance" />}</Route>
      <Route path="/assurance-vtc">{() => <MarketingPage slug="vtc" />}</Route>
      <Route path="/assurance-rc-pro">{() => <MarketingPage slug="rcpro" />}</Route>
      <Route path="/assurance-habitation">{() => <MarketingPage slug="habitation" />}</Route>
      <Route path="/garantie-emprunteur">{() => <MarketingPage slug="emprunteur" />}</Route>
      <Route path="/entretien-chauffage">{() => <MarketingPage slug="chauffage" />}</Route>
      <Route path="/assurance-auto-malusse">{() => <MarketingPage slug="malusse" />}</Route>
      <Route path="/assurance-auto-resilie">{() => <MarketingPage slug="resilie" />}</Route>
      <Route path="/assurance-auto-jeune-conducteur">{() => <MarketingPage slug="jeuneConducteur" />}</Route>
      <Route path="/mutuelle-senior">{() => <MarketingPage slug="senior" />}</Route>
      <Route path="/prevoyance-independant">{() => <MarketingPage slug="independant" />}</Route>
      <Route path="/a-propos">{() => <MarketingPage slug="about" />}</Route>
      <Route path="/contact">{() => <MarketingPage slug="contact" />}</Route>
      {/* ── GOOGLE ADS LANDING PAGES ── */}
      <Route path="/devis-assurance-express" component={AdsLandingPage} />
      <Route path="/appel-assurance-immediat" component={AdsCallOnlyPage} />
      {/* Redirections SEO/Ads pour éviter les erreurs 404 liées aux anciennes campagnes */}
      <Route path="/landing-google-ads" component={AdsLandingPage} />
      <Route path="/landing-call-only" component={AdsCallOnlyPage} />
      
      <Route path="/mentions-legales" component={MentionsLegales} />
      {/* Cluster SEO pages — profondeur inspirée lelynx.fr */}
      <Route path="/assurance-auto/bonus-malus">{() => <MarketingPage slug="bonusMalus" />}</Route>
      <Route path="/assurance-auto/resiliation">{() => <MarketingPage slug="resiliationAuto" />}</Route>
      <Route path="/assurance-auto/formules">{() => <MarketingPage slug="formulesAuto" />}</Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
