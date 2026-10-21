#!/usr/bin/env node
import https from 'node:https';

const targets = [
  ['https://emudhra.we-have-a-problem.com/', 'success'],
  ['https://dv-g3b-emudhra.we-have-a-problem.com/', 'certificate_rejection'],
  ['https://dv-g3b-aaa-emudhra.we-have-a-problem.com/', 'certificate_rejection'],
  ['https://example.com/', 'success'],
];
const certificateErrors = new Set([
  'CERT_REVOKED',
  'CERT_SIGNATURE_FAILURE',
  'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'DEPTH_ZERO_SELF_SIGNED_CERT',
  'CERT_UNTRUSTED',
]);

function errorCodes(error) {
  return [error?.code, ...(error?.cause ? errorCodes(error.cause) : [])].filter(Boolean);
}

async function fetchStatus(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: 'manual' });
  await response.body?.cancel();
  return response.status;
}

function httpsStatus(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { signal: AbortSignal.timeout(15000) }, (response) => {
      response.resume();
      resolve(response.statusCode);
    });
    request.on('error', reject);
  });
}

const results = [];
for (const [api, request] of [['fetch', fetchStatus], ['node:https', httpsStatus]]) {
  for (const [url, expected] of targets) {
    let result;
    try {
      const status = await request(url);
      result = { actual: 'success', status, pass: expected === 'success' && status === 200 };
    } catch (error) {
      const codes = errorCodes(error);
      const actual = codes.some((code) => certificateErrors.has(code))
        ? 'certificate_rejection' : 'INCONCLUSIVE';
      result = { actual, codes, message: error.message, pass: actual === expected };
    }
    results.push({ api, url, expected, ...result });
  }
}
const pass = results.every((result) => result.pass);
console.log(JSON.stringify({ runtime: process.version, pass, results }, null, 2));
process.exitCode = pass ? 0 : 1;
