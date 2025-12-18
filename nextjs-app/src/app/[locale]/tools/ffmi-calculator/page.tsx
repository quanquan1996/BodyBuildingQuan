import { FFMICalculatorClient } from '@/components/ffmi-calculator/ffmi-calculator-client';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function FFMICalculatorPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return <FFMICalculatorClient locale={locale} dict={dict} />;
}
