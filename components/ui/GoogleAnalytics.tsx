import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Consent Mode v2: denied by default until the CookieConsent banner opt-in.
          // Respects a choice already saved in localStorage.
          var consent = (function(){ try { return localStorage.getItem('mp-cookie-consent'); } catch (e) { return null; } })();
          var granted = consent === 'granted' ? 'granted' : 'denied';
          gtag('consent', 'default', {
            analytics_storage: granted,
            ad_storage: granted,
            ad_user_data: granted,
            ad_personalization: granted,
          });
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
