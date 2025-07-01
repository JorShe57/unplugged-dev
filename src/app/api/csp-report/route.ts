import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const report = await request.json()
    
    // Log the violation details
    console.log('🚨 CSP Violation Report:', {
      violatedDirective: report['csp-report']['violated-directive'],
      blockedURI: report['csp-report']['blocked-uri'],
      sourceFile: report['csp-report']['source-file'],
      lineNumber: report['csp-report']['line-number'],
      columnNumber: report['csp-report']['column-number'],
      originalPolicy: report['csp-report']['original-policy'],
      scriptSample: report['csp-report']['script-sample'] // This will show you the actual eval() code
    })
    
    return NextResponse.json({ status: 'received' })
  } catch (error) {
    console.error('Error processing CSP report:', error)
    return NextResponse.json({ error: 'Invalid report' }, { status: 400 })
  }
}