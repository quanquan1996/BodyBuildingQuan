import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FFMIReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📋</span>
          FFMI 参考标准
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">FFMI 范围</th>
                <th className="text-left py-2 font-medium">男性评价</th>
                <th className="text-left py-2 font-medium">女性评价</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">&lt; 15</td>
                <td className="py-2 text-yellow-600">低</td>
                <td className="py-2 text-muted-foreground">肌肉量严重不足</td>
              </tr>
              <tr>
                <td className="py-2">16 - 17</td>
                <td className="py-2 text-yellow-600">低</td>
                <td className="py-2 text-muted-foreground">肌肉量不足</td>
              </tr>
              <tr>
                <td className="py-2">17 - 19</td>
                <td className="py-2 text-blue-600">正常</td>
                <td className="py-2 text-muted-foreground">标准肌肉量</td>
              </tr>
              <tr>
                <td className="py-2">19 - 21</td>
                <td className="py-2 text-green-600">好</td>
                <td className="py-2 text-muted-foreground">高于平均肌肉量</td>
              </tr>
              <tr>
                <td className="py-2">21 - 23</td>
                <td className="py-2 text-purple-600">优秀</td>
                <td className="py-2 text-muted-foreground">肌肉发达</td>
              </tr>
              <tr>
                <td className="py-2">&gt; 23</td>
                <td className="py-2 text-red-600">精英</td>
                <td className="py-2 text-muted-foreground">接近自然极限或可疑</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
