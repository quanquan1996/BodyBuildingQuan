'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ImageUpload } from '@/components/pose-comparator/image-upload';
import { PoseCanvas } from '@/components/pose-comparator/pose-canvas';
import { ScoreDisplay } from '@/components/pose-comparator/score-display';
import { AngleAnalysis } from '@/components/pose-comparator/angle-analysis';
import { PoseCategories } from '@/components/pose-comparator/pose-categories';
import { ScoringExplanation } from '@/components/pose-comparator/scoring-explanation';
import { Limitations } from '@/components/pose-comparator/limitations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/config/site';
import { detectPose, initializePoseDetector, type PoseResult } from '@/lib/mediapipe/pose-detector';
import {
  calculateBodybuildingAngles,
  calculateTotalScore,
  type AngleResult,
} from '@/lib/utils/angle-calculator';

export default function PoseComparatorPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);

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
        setError('MediaPipe initialization failed');
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
        setError(`${dict.poseComparator.uploadReference}: ${dict.poseComparator.noPoseDetected}`);
        return;
      }

      if (!usrPose) {
        setError(`${dict.poseComparator.uploadUser}: ${dict.poseComparator.noPoseDetected}`);
        return;
      }

      setReferencePose(refPose);
      setUserPose(usrPose);

      // Calculate angles and score
      const angles = calculateBodybuildingAngles(
        refPose, 
        usrPose,
        dict.poseComparator.angleNames,
        dict.poseComparator.angleDescriptions
      );
      const score = calculateTotalScore(angles);
      setAngleResults(angles);
      setTotalScore(score);
    } catch (err) {
      console.error('Pose detection failed:', err);
      setError('Pose detection failed');
    } finally {
      setIsLoading(false);
    }
  };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.poseComparator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.poseComparator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/pose-comparator`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: locale === 'zh' ? 'CNY' : 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
              {dict.poseComparator.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.poseComparator.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <ImageUpload
              label={dict.poseComparator.uploadReference}
              onImageSelect={handleReferenceSelect}
              dict={dict}
            />
            <ImageUpload
              label={dict.poseComparator.uploadUser}
              onImageSelect={handleUserSelect}
              dict={dict}
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
              {isLoading ? dict.common.loading : dict.poseComparator.compare}
            </Button>
          </div>

          {(referencePose || userPose) && (
            <div className="space-y-6">
              {/* Images with skeletons */}
              <Card>
                <CardHeader>
                  <CardTitle>{dict.poseComparator.result}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {referenceImage && (
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-medium mb-2">
                          {dict.poseComparator.uploadReference} ({locale === 'zh' ? '红色骨架' : 'Red Skeleton'})
                        </p>
                        <PoseCanvas
                          imageUrl={referenceImage}
                          userPose={referencePose}
                          skeletonColor="#ef4444"
                        />
                      </div>
                    )}
                    {userImage && (
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-medium mb-2">
                          {dict.poseComparator.uploadUser} ({locale === 'zh' ? '角度差异标注' : 'Angle Differences'})
                        </p>
                        <PoseCanvas
                          imageUrl={userImage}
                          userPose={userPose}
                          angleResults={angleResults}
                          showAngleDiff={true}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Score */}
              {totalScore > 0 && (
                <ScoreDisplay score={totalScore} dict={dict} />
              )}

              {/* Angle Analysis */}
              {angleResults.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <AngleAnalysis angles={angleResults} dict={dict} />
                  </CardContent>
                </Card>
              )}

              {/* Limitations Warning */}
              <Limitations dict={dict} />
            </div>
          )}

          {/* SEO Content Sections */}
          <div className="mt-12 space-y-8">
            {/* Pose Categories */}
            <PoseCategories dict={dict} />

            {/* Scoring Explanation */}
            <ScoringExplanation dict={dict} />

            {/* Show limitations if no result yet */}
            {!referencePose && !userPose && <Limitations dict={dict} />}
          </div>
        </div>
      </div>
    </>
  );
}
