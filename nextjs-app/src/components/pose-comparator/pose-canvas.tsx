'use client';

import { useEffect, useRef } from 'react';
import { PoseResult, POSE_CONNECTIONS } from '@/types/pose';
import { AngleResult } from '@/lib/utils/angle-calculator';

interface PoseCanvasProps {
  imageUrl: string;
  userPose?: PoseResult | null;
  referencePose?: PoseResult | null;
  angleResults?: AngleResult[];
  showAngleDiff?: boolean;
  skeletonColor?: string;
  width?: number;
  height?: number;
}

export function PoseCanvas({
  imageUrl,
  userPose,
  referencePose,
  angleResults,
  showAngleDiff = false,
  skeletonColor = '#22c55e',
  width = 400,
  height = 400,
}: PoseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let drawWidth = width;
      let drawHeight = height;
      
      if (aspectRatio > 1) {
        drawHeight = width / aspectRatio;
      } else {
        drawWidth = height * aspectRatio;
      }

      canvas.width = drawWidth;
      canvas.height = drawHeight;

      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

      // Draw user pose
      if (userPose) {
        drawSkeleton(ctx, userPose, drawWidth, drawHeight, skeletonColor, false);
      }

      // Draw reference pose (cyan dashed) - only if not showing angle diff
      if (referencePose && !showAngleDiff) {
        drawSkeleton(ctx, referencePose, drawWidth, drawHeight, '#06b6d4', true);
      }


      // Draw angle difference labels
      if (showAngleDiff && userPose && angleResults && angleResults.length > 0) {
        drawAngleDiffLabels(ctx, userPose, angleResults, drawWidth, drawHeight);
      }
    };
    img.src = imageUrl;
  }, [imageUrl, userPose, referencePose, angleResults, showAngleDiff, skeletonColor, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-full h-auto rounded-lg border"
    />
  );
}

function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  pose: PoseResult,
  width: number,
  height: number,
  color: string,
  dashed: boolean
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  if (dashed) {
    ctx.setLineDash([5, 5]);
  } else {
    ctx.setLineDash([]);
  }

  for (const [start, end] of POSE_CONNECTIONS) {
    const startLm = pose.landmarks[start];
    const endLm = pose.landmarks[end];
    
    if (startLm.visibility > 0.5 && endLm.visibility > 0.5) {
      ctx.beginPath();
      ctx.moveTo(startLm.x * width, startLm.y * height);
      ctx.lineTo(endLm.x * width, endLm.y * height);
      ctx.stroke();
    }
  }

  ctx.fillStyle = color;
  ctx.setLineDash([]);
  for (const lm of pose.landmarks) {
    if (lm.visibility > 0.5) {
      ctx.beginPath();
      ctx.arc(lm.x * width, lm.y * height, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}


function drawAngleDiffLabels(
  ctx: CanvasRenderingContext2D,
  pose: PoseResult,
  angleResults: AngleResult[],
  width: number,
  height: number
) {
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (const angle of angleResults) {
    const lm = pose.landmarks[angle.jointIndex];
    if (!lm || lm.visibility < 0.5) continue;

    const x = lm.x * width;
    const y = lm.y * height;
    const diff = angle.difference;
    const absDiff = Math.abs(diff);

    // Determine color based on difference
    let bgColor = '#22c55e'; // green
    let textColor = '#fff';
    if (absDiff > 20) {
      bgColor = '#ef4444'; // red
    } else if (absDiff > 10) {
      bgColor = '#f97316'; // orange
    } else if (absDiff > 5) {
      bgColor = '#eab308'; // yellow
      textColor = '#000';
    }

    const text = `${diff > 0 ? '+' : ''}${diff.toFixed(0)}°`;
    const padding = 4;
    const textWidth = ctx.measureText(text).width;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = 18;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x - boxWidth / 2, y - boxHeight / 2 - 15, boxWidth, boxHeight, 4);
    ctx.fill();

    // Draw text
    ctx.fillStyle = textColor;
    ctx.fillText(text, x, y - 15);

    // Draw line to joint
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x, y - 6);
    ctx.lineTo(x, y - 4);
    ctx.stroke();
  }
}
