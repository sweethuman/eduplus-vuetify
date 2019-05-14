export default p => p.then(v => ({ result: v, succeeded: true }), e => ({ result: e, succeeded: false }));
