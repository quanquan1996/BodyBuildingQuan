# Hydration Error 修复指南

## 问题描述

用户报告在访问体脂夹计算器页面时出现 React Hydration Error：

```
Hydration failed because the server rendered text didn't match the client.
```

错误显示服务端渲染的是"胸部"（中文），而客户端期望的是"Chest"（英文），导致内容不匹配。

## 根本原因

所有工具页面都使用了 `'use client'` 指令，但在客户端组件中调用 `getDictionary(locale)`：

```tsx
'use client';

export default function ToolPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);  // ❌ 问题所在
  // ...
}
```

这会导致：
1. Next.js 在服务端预渲染客户端组件时，可能使用默认 locale
2. 客户端 hydration 时从 URL 读取 locale
3. 如果两者不一致，翻译内容就会不匹配
4. React 检测到 DOM 不一致，抛出 Hydration Error

## 解决方案

将页面改为服务端组件，在服务端获取翻译，然后传递给客户端组件。

### 修复模式

**修改前（❌ 错误）：**
```tsx
// page.tsx
'use client';

export default function ToolPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);
  
  const [result, setResult] = useState(null);
  
  return (
    <div>
      <ToolForm onCalculate={setResult} locale={locale} dict={dict} />
      {result && <ToolResult result={result} locale={locale} dict={dict} />}
    </div>
  );
}
```

**修改后（✅ 正确）：**
```tsx
// page.tsx (服务端组件)
import { ToolClient } from '@/components/tool/tool-client';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return <ToolClient locale={locale} dict={dict} />;
}
```

```tsx
// tool-client.tsx (客户端组件)
'use client';

import { useState } from 'react';
import { type Locale, type Dictionary } from '@/lib/i18n';

interface ToolClientProps {
  locale: Locale;
  dict: Dictionary;
}

export function ToolClient({ locale, dict }: ToolClientProps) {
  const [result, setResult] = useState(null);
  
  return (
    <div>
      <ToolForm onCalculate={setResult} locale={locale} dict={dict} />
      {result && <ToolResult result={result} locale={locale} dict={dict} />}
    </div>
  );
}
```

## 已修复的页面

- ✅ `/tools/skinfold-calculator` - 已创建 `skinfold-calculator-client.tsx`
- ✅ `/tools/ffmi-calculator` - 已创建 `ffmi-calculator-client.tsx`
- ✅ `/tools/bmr-calculator` - 已创建 `bmr-calculator-client.tsx`

## 待修复的页面

以下页面仍然存在同样的问题，需要按照上述模式修复：

1. ❌ `/tools/heart-rate-calculator`
4. ❌ `/tools/grecian-calculator`
5. ❌ `/tools/pose-comparator`
6. ❌ `/tools/carb-cycling-calculator`
7. ❌ `/tools/fat-loss-diet-calculator`
8. ❌ `/tools/high-carb-diet-calculator`
9. ❌ `/tools/metabolic-damage-test`

## 修复步骤

对于每个工具页面：

1. **创建客户端组件文件**
   ```bash
   # 例如：ffmi-calculator
   touch src/components/ffmi-calculator/ffmi-calculator-client.tsx
   ```

2. **将页面逻辑移到客户端组件**
   - 复制 `page.tsx` 中的所有状态管理和事件处理逻辑
   - 添加 `'use client'` 指令
   - 接收 `locale` 和 `dict` 作为 props
   - 移除 `useParams()` 和 `getDictionary()` 调用

3. **简化页面组件**
   - 移除 `'use client'` 指令
   - 改为 async 函数
   - 从 params 获取 locale
   - 调用 `getDictionary(locale)`
   - 渲染客户端组件并传递 props

4. **处理 JSON-LD**
   - JSON-LD 可以保留在页面组件中（服务端渲染）
   - 或者移到客户端组件中（客户端渲染）

## 验证修复

修复后，检查以下内容：

1. **构建成功**
   ```bash
   npm run build
   ```

2. **无 Hydration 错误**
   - 访问中文版：`/zh/tools/xxx`
   - 访问英文版：`/en/tools/xxx`
   - 检查浏览器控制台无 Hydration 错误

3. **功能正常**
   - 表单输入正常
   - 计算结果正确
   - 语言切换正常

## 为什么构建成功但运行时报错？

Next.js 的构建过程主要检查：
- TypeScript 类型错误
- 语法错误
- 静态生成是否成功

但 Hydration 错误是运行时错误，只有在浏览器中实际渲染时才会出现。这就是为什么构建通过了，但用户访问时仍然会看到错误。

## 最佳实践

1. **服务端组件优先**
   - 默认使用服务端组件
   - 只在需要交互时使用客户端组件

2. **数据获取在服务端**
   - 翻译数据在服务端获取
   - 通过 props 传递给客户端组件

3. **避免在客户端组件中使用 useParams**
   - useParams 在 hydration 时可能不稳定
   - 改为从 props 接收参数

## 参考资料

- [Next.js Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
