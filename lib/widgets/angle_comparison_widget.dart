import 'package:flutter/material.dart';
import '../services/angle_calculator.dart';

/// 角度对比显示组件
class AngleComparisonWidget extends StatelessWidget {
  final List<AngleResult> angles;

  const AngleComparisonWidget({
    super.key,
    required this.angles,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.analytics, color: Colors.blue),
              SizedBox(width: 8),
              Text(
                '关键角度对比分析',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text(
            '以下是健美造型中关键身体角度的对比结果',
            style: TextStyle(color: Colors.grey, fontSize: 14),
          ),
          const SizedBox(height: 16),
          ...angles.map((angle) => _buildAngleItem(angle)),
        ],
      ),
    );
  }

  Widget _buildAngleItem(AngleResult angle) {
    final ratingColor = Color(angle.ratingColorValue);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  angle.name,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: ratingColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  angle.rating,
                  style: TextStyle(
                    color: ratingColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              _buildAngleValue('参考', angle.referenceAngle, Colors.red),
              const SizedBox(width: 16),
              _buildAngleValue('你的', angle.userAngle, Colors.green),
              const SizedBox(width: 16),
              _buildDifference(angle.difference),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            angle.description,
            style: TextStyle(
              color: Colors.grey.shade600,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAngleValue(String label, double value, Color color) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width: 4),
        Text(
          '$label: ${value.toStringAsFixed(1)}°',
          style: const TextStyle(fontSize: 13),
        ),
      ],
    );
  }

  Widget _buildDifference(double diff) {
    final isPositive = diff > 0;
    final icon = isPositive ? Icons.arrow_upward : Icons.arrow_downward;
    final color = diff.abs() <= 10 ? Colors.green : Colors.orange;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 14, color: color),
        Text(
          '${isPositive ? '+' : ''}${diff.toStringAsFixed(1)}°',
          style: TextStyle(
            color: color,
            fontWeight: FontWeight.w500,
            fontSize: 13,
          ),
        ),
      ],
    );
  }
}
