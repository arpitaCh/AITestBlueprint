class CustomReporter {
    onBegin(config, suite) {
        console.log(`🚀 Starting execution of ${suite.allTests().length} tests...`);
    }

    onTestBegin(test) {
        console.log(`🔍 [Test Started]: ${test.title}`);
    }

    onTestEnd(test, result) {
        const status = result.status === 'passed' ? '✅ PASSED' : '❌ FAILED';
        console.log(`${status}: ${test.title} (${result.duration}ms)`);
        if (result.error) {
            console.log(`   Error: ${result.error.message}`);
        }
    }

    onEnd(result) {
        console.log('-----------------------------------');
        console.log(`🏁 Execution Finished: ${result.status.toUpperCase()}`);
        console.log('-----------------------------------');
    }
}

module.exports = CustomReporter;
