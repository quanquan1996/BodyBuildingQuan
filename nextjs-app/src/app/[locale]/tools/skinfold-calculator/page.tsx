import { SkinfoldCalculatorClient } from '@/components/skinfold-calculator/skinfold-calculator-client';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function SkinfoldCalculatorPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return <SkinfoldCalculatorClient locale={locale} dict={dict} />;
}
