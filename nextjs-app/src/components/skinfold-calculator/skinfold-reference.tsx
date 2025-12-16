'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SkinfoldReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          体脂率参考标准
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 男性标准 */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>👨</span> 男性体脂率标准
          </h4>
          <div className="space-y-1">
            <ReferenceRow label="必需脂肪" range="2-5%" color="bg-yellow-400" />
            <ReferenceRow label="运动员" range="6-13%" color="bg-green-400" />
            <ReferenceRow label="健身水平" range="14-17%" color="bg-blue-400" />
            <ReferenceRow label="平均水平" range="18-24%" color="bg-orange-400" />
            <ReferenceRow label="肥胖" range=">25%" color="bg-red-400" />
          </div>
        </div>

        {/* 女性标准 */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>👩</span> 女性体脂率标准
          </h4>
          <div className="space-y-1">
            <ReferenceRow label="必需脂肪" range="10-13%" color="bg-yellow-400" />
            <ReferenceRow label="运动员" range="14-20%" color="bg-green-400" />
            <ReferenceRow label="健身水平" range="21-24%" color="bg-blue-400" />
            <ReferenceRow label="平均水平" range="25-31%" color="bg-orange-400" />
            <ReferenceRow label="肥胖" range=">32%" color="bg-red-400" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          * 参考标准来自美国运动医学会 (ACSM)
        </p>
      </CardContent>
    </Card>
  );
}

function ReferenceRow({ label, range, color }: { label: string; range: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-3 h-3 rounded ${color}`}></span>
      <span className="flex-1">{label}</span>
      <span className="text-muted-foreground">{range}</span>
    </div>
  );
}
