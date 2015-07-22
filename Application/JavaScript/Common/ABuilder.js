const 
	ABuilderConfiguration = require('../Data/ABuilder.json'),
	ABuilder = {};

ABuilder.getConfigration = function (callback) {
	callback(ABuilderConfiguration);
};

export default ABuilder;