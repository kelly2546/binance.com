import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileResponsivenessAuditor, MobilePerformanceMonitor, type MobileTestResult } from '@/utils/mobileTestUtils';

export default function MobileAuditTool() {
  const [auditResults, setAuditResults] = useState<MobileTestResult[]>([]);
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runAudit = async () => {
    setIsRunning(true);
    
    try {
      // Run responsiveness audit
      const auditor = new MobileResponsivenessAuditor();
      const results = auditor.runAllTests();
      setAuditResults(results);
      
      // Get performance metrics
      const vitals = await MobilePerformanceMonitor.getVitals();
      setPerformanceData(vitals);
      
      // Log to console for debugging
      auditor.logResults();
      
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getScoreColor = (passed: boolean) => {
    return passed ? 'bg-green-500' : 'bg-red-500';
  };

  const getPerformanceColor = (score: string) => {
    switch (score) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-white">Mobile Audit Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={runAudit} 
            disabled={isRunning}
            className="w-full text-xs"
            size="sm"
          >
            {isRunning ? 'Running Audit...' : 'Run Mobile Audit'}
          </Button>
          
          {auditResults.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-gray-300">Responsiveness Tests:</div>
              {auditResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300 truncate">{result.testName}</span>
                  <Badge 
                    className={`text-xs ${getScoreColor(result.passed)} text-white`}
                  >
                    {result.passed ? 'Pass' : 'Fail'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
          
          {performanceData && (
            <div className="space-y-2">
              <div className="text-xs text-gray-300">Performance Metrics:</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">LCP</span>
                <Badge className={`text-xs ${getPerformanceColor(performanceData.lcpScore)} text-white`}>
                  {performanceData.lcp}ms
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">CLS</span>
                <Badge className={`text-xs ${getPerformanceColor(performanceData.clsScore)} text-white`}>
                  {performanceData.cls}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}