import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PoseCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏆</span>
          健美造型分类介绍
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 古典健美 */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <span className="text-amber-500">🏛️</span>
            古典健美 (Classic Physique)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            古典健美强调黄金时代的审美标准，追求匀称、流畅的肌肉线条和优雅的造型展示。
            相比传统健美，古典健美对体重有限制，更注重整体美感而非极端的肌肉量。
          </p>
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium mb-1">经典造型要求：</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• 真空腹（Vacuum Pose）展示腰腹控制能力</li>
              <li>• 侧胸展示（Side Chest）强调胸肌厚度和手臂线条</li>
              <li>• 背阔肌展示（Lat Spread）展现V型身材比例</li>
              <li>• 整体流畅的肌肉过渡和对称性</li>
            </ul>
          </div>
        </section>

        {/* 传统健美 */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <span className="text-red-500">💪</span>
            传统健美 (Bodybuilding)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            传统健美追求极致的肌肉量、分离度和血管显现度。选手需要展示最大化的肌肉发展，
            同时保持良好的对称性和比例。这是最具挑战性的健美类别。
          </p>
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium mb-1">规定造型动作：</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• 前展肱二头肌（Front Double Biceps）</li>
              <li>• 前展背阔肌（Front Lat Spread）</li>
              <li>• 侧胸展示（Side Chest）</li>
              <li>• 后展肱二头肌（Back Double Biceps）</li>
              <li>• 后展背阔肌（Back Lat Spread）</li>
              <li>• 侧展肱三头肌（Side Triceps）</li>
              <li>• 腹部和大腿展示（Abs and Thighs）</li>
              <li>• 最具肌肉感造型（Most Muscular）</li>
            </ul>
          </div>
        </section>

        {/* 健体 */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <span className="text-blue-500">🏄</span>
            健体 (Men&apos;s Physique)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            健体比赛更注重整体外观和舞台表现力，选手穿着沙滩短裤，不展示腿部肌肉。
            评判标准包括肩宽腰细的V型身材、适度的肌肉量和良好的皮肤状态。
          </p>
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium mb-1">造型特点：</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• 正面站姿展示整体比例</li>
              <li>• 侧面站姿展示腹肌和手臂</li>
              <li>• 背面站姿展示背部宽度</li>
              <li>• 强调自然、放松的姿态</li>
            </ul>
          </div>
        </section>

        {/* 比基尼健身 */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <span className="text-pink-500">👙</span>
            比基尼健身 (Bikini Fitness)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            比基尼健身是女子健美中最受欢迎的类别，强调健康、匀称的身材和优雅的舞台表现。
            评判标准包括整体身材比例、肌肉线条（非极端肌肉量）、皮肤状态和舞台魅力。
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
