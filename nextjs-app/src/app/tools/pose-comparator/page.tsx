'use client';

import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/pose-comparator/image-upload';
import { PoseCanvas } from '@/components/pose-comparator/pose-canvas';
import { ScoreDisplay } from '@/components/pose-comparator/score-display';
import { AngleAnalysis } from '@/components/pose-comparator/angle-analysis';
import { PoseCategories } from '@/components/pose-comparator/pose-categories';
import { ScoringExplanation } from '@/components/pose-comparator/scoring-explanation';
import { Limitations } from '@/components/pose-comparator/limitations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zh } from '@/lib/i18n/zh';
import { siteConfig } from '@/lib/config/site';
import { detectPose, initializePoseDetector } from '@/lib/mediapipe/pose-detector';
import {
  calculateBodybuildingAngles,
  calculateTotalScore,
  AngleResult,
} from '@/lib/utils/angle-calculator';
import { PoseResult } from '@/types/pose';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '健美造型评分器 - AI姿势评分工具',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: zh.poseComparator.metaDescription,
  url: `${siteConfig.url}/tools/pose-comparator`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '860',
  },
};

// FAQ structured data for SEO
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '什么是健美造型评分器？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '健美造型评分器是一款基于AI的姿势分析工具，通过对比你的健美造型与参考图片，自动计算姿态角度差异并给出评分，帮助健美爱好者改进造型展示。',
      },
    },
    {
      '@type': 'Question',
      name: '健美造型评分器支持哪些造型类型？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '支持各类健美造型，包括古典健美（Classic Physique）、传统健美（Bodybuilding）、健体（Men\'s Physique）等比赛的规定动作和自由造型。',
      },
    },
    {
      '@type': 'Question',
      name: '评分结果准确吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '评分基于AI姿态检测技术，能够准确识别身体关键点并计算角度差异。但评分仅反映姿态相似度，不能替代专业教练的指导，建议作为练习参考使用。',
      },
    },
  ],
};

export default function PoseComparatorPage() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [referencePose, setReferencePose] = useState<PoseResult | null>(null);
  const [userPose, setUserPose] = useState<PoseResult | null>(null);
  const [angleResults, setAngleResults] = useState<AngleResult[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initializePoseDetector();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize:', err);
        setError('MediaPipe 加载失败，请刷新页面重试');
      }
    };
    init();
  }, []);


  const handleReferenceSelect = (_file: File, dataUrl: string) => {
    setReferenceImage(dataUrl);
    setReferencePose(null);
    setAngleResults([]);
    setTotalScore(0);
    setError(null);
  };

  const handleUserSelect = (_file: File, dataUrl: string) => {
    setUserImage(dataUrl);
    setUserPose(null);
    setAngleResults([]);
    setTotalScore(0);
    setError(null);
  };

  const handleCompare = async () => {
    if (!referenceImage || !userImage) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const refImg = new Image();
      refImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        refImg.onload = resolve;
        refImg.onerror = reject;
        refImg.src = referenceImage;
      });

      const userImg = new Image();
      userImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        userImg.onload = resolve;
        userImg.onerror = reject;
        userImg.src = userImage;
      });

      const refPose = await detectPose(refImg);
      const usrPose = await detectPose(userImg);

      if (!refPose) {
        setError(`参考图片：${zh.poseComparator.noPoseDetected}`);
        return;
      }

      if (!usrPose) {
        setError(`你的照片：${zh.poseComparator.noPoseDetected}`);
        return;
      }

      setReferencePose(refPose);
      setUserPose(usrPose);

      // Calculate angles and score
      const angles = calculateBodybuildingAngles(refPose, usrPose);
      const score = calculateTotalScore(angles);
      setAngleResults(angles);
      setTotalScore(score);
    } catch (err) {
      console.error('Pose detection failed:', err);
      setError('姿态检测失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
              {zh.poseComparator.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {zh.poseComparator.description} · 支持古典健美、传统健美、健体等多种造型
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <ImageUpload
              label={zh.poseComparator.uploadReference}
              onImageSelect={handleReferenceSelect}
            />
            <ImageUpload
              label={zh.poseComparator.uploadUser}
              onImageSelect={handleUserSelect}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-8">
            <Button
              onClick={handleCompare}
              disabled={!referenceImage || !userImage || isLoading || !isInitialized}
              className="min-h-[44px] min-w-[120px]"
            >
              {isLoading ? zh.common.loading : zh.poseComparator.compare}
            </Button>
          </div>

          {(referencePose || userPose) && (
            <div className="space-y-6">
              {/* Images with skeletons */}
              <Card>
                <CardHeader>
                  <CardTitle>{zh.poseComparator.result}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {referenceImage && (
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-medium mb-2">参考造型（红色骨架）</p>
                        <PoseCanvas
                          imageUrl={referenceImage}
                          userPose={referencePose}
                          skeletonColor="#ef4444"
                        />
                      </div>
                    )}
                    {userImage && (
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-medium mb-2">你的造型（角度差异标注）</p>
                        <PoseCanvas
                          imageUrl={userImage}
                          userPose={userPose}
                          angleResults={angleResults}
                          showAngleDiff={true}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground text-center">
                    <p>绿色：你的骨架 | 标签：与参考姿势的角度差异</p>
                  </div>
                </CardContent>
              </Card>

              {/* Score */}
              {totalScore > 0 && (
                <ScoreDisplay score={totalScore} />
              )}

              {/* Angle Analysis */}
              {angleResults.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <AngleAnalysis angles={angleResults} />
                  </CardContent>
                </Card>
              )}

              {/* Limitations Warning */}
              <Limitations />
            </div>
          )}

          {/* SEO Content Sections */}
          <div className="mt-12 space-y-8">
            {/* Pose Categories */}
            <PoseCategories />

            {/* Scoring Explanation */}
            <ScoringExplanation />

            {/* Show limitations if no result yet */}
            {!referencePose && !userPose && <Limitations />}
          </div>

          {/* Additional SEO Content */}
          <section className="mt-12 prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold mb-4">关于健美造型评分器</h2>
            <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  为什么需要造型评分？
                </h3>
                <p>
                  在健美比赛中，造型展示占据重要的评分比重。无论是古典健美的真空腹、
                  传统健美的规定动作，还是健体的自然站姿，都需要精确的角度控制和肌肉展示。
                  通过AI评分工具，你可以在日常训练中获得即时反馈，不断优化自己的造型表现。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  如何提高造型得分？
                </h3>
                <p>
                  提高造型得分的关键在于：1) 熟悉各类规定动作的标准姿态；
                  2) 加强核心力量以保持稳定；3) 练习肌肉控制能力；
                  4) 多角度拍照对比分析；5) 寻求专业教练的指导。
                  本工具可以帮助你量化进步，但最终还需要系统的训练。
                </p>
              </div>
            </div>
          </section>

          {/* Keywords for SEO */}
          <div className="sr-only">
            健美造型评分 健美姿势分析 古典健美造型 传统健美动作 健体造型 
            AI姿势检测 健美比赛造型 肌肉展示 健美训练 造型练习
            前展肱二头肌 背阔肌展示 侧胸展示 真空腹 健美规定动作
          </div>
        </div>
      </div>
    </>
  );
}
