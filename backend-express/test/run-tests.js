try {
  require('./task-service.test');
  console.log('\nAll tests completed successfully.');
} catch (err) {
  console.error('\nTest run failed:', err);
  process.exit(1);
}
