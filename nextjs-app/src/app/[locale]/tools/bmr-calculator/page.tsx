import { BMRCalculatorClient } from '@/components/bmr-calculator/bmr-calculator-client';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function BMRCalculatorPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return <BMRCalculatorClient locale={locale} dict={dict} />;
}
