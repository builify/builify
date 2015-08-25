import * as localizationReducer from './LocalizationReducer';
import * as builderReducer from './BuilderReducer';
import * as templateReducer from './TemplateReducer'; 

const allReducers = Object.assign({},
						localizationReducer, 
						builderReducer, 
						templateReducer);

export default allReducers;