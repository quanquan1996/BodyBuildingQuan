import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface FFMIReferenceProps {
  dict: Dictionary;
}

export function FFMIReference({ dict }: FFMIReferenceProps) {
  const t = dict.ffmiCalculator.reference;

  const ratingColors: Record<string, string> = {
    '低': 'text-yellow-600',
    'Low': 'text-yellow-600',
    '正常': 'text-blue-600',
    'Normal': 'text-blue-600',
    '好': 'text-green-600',
    'Good': 'text-green-600',
    '优秀': 'text-purple-600',
    'Excellent': 'text-purple-600',
    '精英': 'text-red-600',
    'Elite': 'text-red-600',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📋</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">{t.headers.range}</th>
                <th className="text-left py-2 font-medium">{t.headers.maleRating}</th>
                <th className="text-left py-2 font-medium">{t.headers.femaleRating}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {t.rows.map((row, index) => (
                <tr key={index}>
                  <td className="py-2">{row.range}</td>
                  <td className={`py-2 ${ratingColors[row.rating] || ''}`}>{row.rating}</td>
                  <td className="py-2 text-muted-foreground">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
