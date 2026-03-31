const sleep = (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	}).catch(() => { });
};

module.exports = { sleep };