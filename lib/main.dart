import 'package:flutter/material.dart';
import 'pages/home_page.dart';

void main() {
  runApp(const PoseComparisonApp());
}

class PoseComparisonApp extends StatelessWidget {
  const PoseComparisonApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '姿态对比',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.light,
        ),
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
        ),
      ),
      home: const HomePage(),
    );
  }
}
